import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MeetingDetail from '../../../../components/meeting/MeetingDetail';
// import CommentList from '../../../../components/comment/CommentList/CommentList';
import PageTemplate from '../../../common/PageTemplate';
import {
  deleteMeeting,
  toggleMeeting,
} from '../../../../store/actions/meetings';
import * as meetingAPI from '../../../../lib/api/meetings';
// import {
//   createComment,
//   editComment,
//   deleteComment,
//   getMeetingComments,
// } from '../../../../store/actions/comments';

// TODO: Comments, Photo, Access, Tag, Location, Time
function MeetingDetailPage(props) {
  // const tempComments = [
  //   {
  //     id: 11,
  //     articleId: 1,
  //     content: 'Hello this is test comment',
  //   },
  //   {
  //     id: 12,
  //     articleId: 1,
  //     content: 'second comment for test',
  //   },
  // ];
  const [meetingDetail, setMeetingDetail] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
    // comments_: comments.comments,
  }));
  const { params } = props.match;
  let dataReducer = { members: [] };

  useEffect(() => {
    axios
      .get(`${meetingAPI.meetings}${params.id}/`)
      .then((res) => {
        dataReducer = { ...dataReducer, meetingData: res.data };
      })
      .then(() => {
        axios
          .get(`/api/user/${dataReducer.meetingData.authorId}/`)
          .then((res) => {
            dataReducer = { ...dataReducer, author: res.data };
          })
          .then(() => {
            dataReducer.meetingData.currentMembers.forEach(async (member) => {
              await axios
                .get(`/api/user/${member}/`)
                .then((res) => {
                  dataReducer = {
                    ...dataReducer,
                    members: [...dataReducer.members, res.data],
                  };
                })
                .then(() => {
                  setMeetingDetail(dataReducer);
                });
              // safe zone
            });
            // unsafe zone
          });
      });
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          currentUser={parseInt(currentUser, 10)}
          meetingDetail={meetingDetail}
          deleteMeeting={() =>
            dispatch(deleteMeeting({ id: parseInt(params.id, 10) }))
          }
          toggleMeeting={(joinOrQuit) =>
            dispatch(
              toggleMeeting({
                joinOrQuit: parseInt(joinOrQuit, 10),
                id: parseInt(params.id, 10),
              }),
            )
          }
        />
        {/* <CommentList
          auth={auth_}
          comments={
            tempComments.filter(
              (comment) => comment.articleId === parseInt(params.id, 10),
            )
            // comments_ &&
            // comments_.filter(
            //   (comment) => comment.articleId === parseInt(params.id, 10),
            // )
          }
          // users={users_}
          articleId={parseInt(params.id, 10)}
          createComment={(content, authorId, articleId) => {
            dispatch(createComment({ content, authorId, articleId }));
          }}
          editComment={(content, authorId, articleId, commentId) => {
            dispatch(editComment({ content, authorId, articleId, commentId }));
          }}
          deleteComment={(commentId) => {
            dispatch(deleteComment({ commentId }));
          }}
        /> */}
      </PageTemplate>
    </div>
  );
}

export default MeetingDetailPage;
