import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MeetingDetail from '../../../../components/meeting/MeetingDetail/MeetingDetail';
import CommentList from '../../../../components/comment/CommentList/CommentList';
import PageTemplate from '../../../common/PageTemplate';

function MeetingDetailPage(props) {
  const [meetingDetail, setMeetingDetail] = useState(null);
  const [meetingPhoto, setMeetingPhoto] = useState(null);
  const [comments, setComments] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: parseInt(auth.auth, 10),
  }));
  const { history } = props;
  const { id } = props.match.params;
  useEffect(() => {
    axios
      .get(`/api/meeting/${id}/`)
      .then((res) => {
        setMeetingDetail(res.data);
      })
      .then(() => {
        axios.get(`/api/comment/meeting/${id}/`).then((res) => {
          setComments(res.data);
        });
        axios.get(`/api/meeting/${id}/photo/`).then(() => {
          setMeetingPhoto(`/api/meeting/${id}/photo/`);
        });
      })
      .catch(() => {
        window.alert('Error occured while fetching meeting info');
      });
  }, [refresh]);

  const commentList = () => (
    <>
      <CommentList
        currentUser={currentUser}
        comments={comments}
        articleId={parseInt(id, 10)}
        createComment={(content, articleId) => {
          axios
            .post(`/api/comment/`, {
              content,
              section: 'meeting',
              articleId,
            })
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
    </>
  );

  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          currentUser={parseInt(currentUser, 10)}
          meetingDetailData={meetingDetail}
          meetingPhoto={meetingPhoto}
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
          commentList={commentList}
        />
      </PageTemplate>
    </div>
  );
}

export default MeetingDetailPage;
