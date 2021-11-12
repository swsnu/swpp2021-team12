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
  // const tempMeetings = [
  //   {
  //     id: 1,
  //     title: 'Chicken Meeting',
  //     content: 'Who wants to eat chicken?',
  //     authorId: 3,
  //     currentMembers: [3, 4, 5],
  //     maxMembers: 5,
  //   },
  // ];
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
  // const { auth_, users_, meetings_, comments_ } = useSelector(({ auth, meetings, comments }) => ({
  const [meetingDetail, setMeetingDetail] = useState(null);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
    // meetings_: meetings.meetings,
    // comments_: comments.comments,
  }));
  const { params } = props.match;
  let dataReducer = { members: [] };

  useEffect(async () => {
    await axios
      .get(`${meetingAPI.meetings}${params.id}/`)
      .then((res) => {
        dataReducer = { ...dataReducer, meetingData: res.data };
      })
      .then(async () => {
        await axios
          .get(`/api/user/${dataReducer.meetingData.authorId}/`)
          .then((res) => {
            dataReducer = { ...dataReducer, author: res.data };
          })
          .then(async () => {
            dataReducer.meetingData.currentMembers.forEach(
              (member) => async () => {
                await axios.get(`/api/user/${member}`).then((res) => {
                  dataReducer = {
                    ...dataReducer,
                    members: [...dataReducer.members, res.data],
                  };
                });
              },
            );
            setMeetingDetail(dataReducer);
          });
      });
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          auth={currentUser}
          meetingDetail={
            meetingDetail
            // tempMeetings &&
            // tempMeetings.find(
            //   (meeting) => meeting.id === parseInt(params.id, 10),
            // )
            // meetings_ &&
            // meetings_.find((meeting) => meeting.id === parseInt(params.id, 10))
          }
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
