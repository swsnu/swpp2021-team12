import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MeetingDetail from '../../../../components/meeting/MeetingDetail/MeetingDetail';
// import CommentList from '../../../../components/comment/CommentList/CommentList';
import PageTemplate from '../../../common/PageTemplate';
// import {
//   createComment,
//   editComment,
//   deleteComment,
//   getMeetingComments,
// } from '../../../../store/actions/comments';

// TODO: Photo, Access, Tag, Location, Time
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
  // const [comments, setComments] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
    // comments_: comments.comments,
  }));
  const { history } = props;
  const { id } = props.match.params;
  let dataReducer = { members: [] };

  useEffect(() => {
    axios
      .get(`/api/meeting/${id}/`)
      .then((res) => {
        dataReducer = { ...dataReducer, meetingData: res.data };
      })
      .then(() => {
        axios
          .get(`/api/user/${dataReducer.meetingData.authorId}/`)
          .then((res) => {
            dataReducer = { ...dataReducer, author: res.data };
          })
          .then(async () => {
            if (dataReducer.members.length === 0) {
              setMeetingDetail(dataReducer);
            }
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
            });
          });
      })
      // .then(() => {
      //   axios.get(`/api/comment/meeting/${id}/`).then((res) => {
      //     setComments(res.data);
      //   });
      //   // console.log('===fetched comments===');
      //   console.log(comments);
      // })
      .catch(() => {
        window.alert('Error occured while fetching meeting info');
      });
  }, [refresh]);

  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          currentUser={parseInt(currentUser, 10)}
          meetingDetail={meetingDetail}
          onClickDeleteButton={() => {
            axios
              .delete(`/api/meeting/${id}/`)
              .then(() => {
                history.push(`/meeting`);
              })
              .catch(() => {
                window.alert('Error occured while deletion');
              });
          }}
          onClickToggleButton={(joinOrQuit) => {
            axios
              .put(`/api/meeting/${id}/toggle/`, { joinOrQuit })
              .then(setRefresh(!refresh))
              .catch(() => {
                window.alert('Error occured while making toggle');
              });
          }}
        />
        {/* <CommentList
          auth={currentUser}
          comments={
            comments
            // tempComments.filter(
            //   (comment) => comment.articleId === parseInt(params.id, 10),
            // )
            // comments_ &&
            // comments_.filter(
            //   (comment) => comment.articleId === parseInt(params.id, 10),
            // )
          }
          articleId={parseInt(id, 10)}
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
