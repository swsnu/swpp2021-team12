import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MeetingDetail from '../../../../components/meeting/MeetingDetail';
import CommentList from '../../../../components/comment/CommentList/CommentList';
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
  //     articleId: 11,
  //     authorId: 1,
  //     content: 'Hello this is test comment',
  //   },
  //   {
  //     id: 12,
  //     articleId: 11,
  //     authorId: 2,
  //     content: 'second comment for test',
  //   },
  // ];
  const [meetingDetail, setMeetingDetail] = useState(null);
  const [comments, setComments] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));
  const { history } = props;
  const { id } = props.match.params;
  // let dataReducer = { members: [] };

  useEffect(() => {
    axios
      .get(`/api/meeting/${id}/`)
      .then((res) => {
        setMeetingDetail(res.data);
        // dataReducer = { ...dataReducer, meetingData: res.data };
      })
      .then(() => {
        axios.get(`/api/comment/meeting/${id}/`).then((res) => {
          setComments(res.data);
        });
        console.log('===fetched comments===');
        console.log(comments);
      })
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
        <CommentList
          currentUser={parseInt(currentUser, 10)}
          comments={comments}
          articleId={parseInt(id, 10)}
          createComment={(content, articleId) => {
            axios
              .post(`/api/comment/`, { content, section: 'meeting', articleId })
              .then(setRefresh(!refresh))
              .catch(() => {
                window.alert('Error occured while creating a new comment');
              });
          }}
          editComment={(content, commentId) => {
            axios
              .put(`/api/comment/${commentId}/`, {
                content,
              })
              .then(setRefresh(!refresh))
              .catch(() => {
                window.alert('Error occured while editing a comment');
              });
          }}
          deleteComment={(commentId) => {
            axios
              .delete(`/api/comment/${commentId}/`)
              .then(setRefresh(!refresh))
              .catch(() => {
                window.alert('Error occured whild deleting a comment');
              });
          }}
        />
      </PageTemplate>
    </div>
  );
}

export default MeetingDetailPage;
