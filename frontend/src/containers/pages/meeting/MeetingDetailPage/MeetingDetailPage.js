import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MeetingDetail from '../../../../components/meeting/MeetingDetail';
import CommentList from '../../../../components/comment/CommentList/CommentList';
import PageTemplate from '../../../common/PageTemplate';
import {
  deleteMeeting,
  toggleMeeting,
} from '../../../../store/actions/meetings';
import {
  createComment,
  editComment,
  deleteComment,
  getMeetingComments,
} from '../../../../store/actions/comments';

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
  const tempComments = [
    {
      id: 11,
      articleId: 1,
      content: 'Hello this is test comment',
    },
    {
      id: 12,
      articleId: 1,
      content: 'second comment for test',
    },
  ];
  // const { auth_, users_, meetings_, comments_ } = useSelector(({ auth, meetings, comments }) => ({
  const { auth_, meetings_ } = useSelector(({ auth, meetings }) => ({
    auth_: auth.auth,
    meetings_: meetings.meetings,
    // comments_: comments.comments,
  }));
  const { params } = props.match;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingComments());
  }, [dispatch]);
  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          auth={auth_}
          meetingDetail={
            // tempMeetings &&
            // tempMeetings.find(
            //   (meeting) => meeting.id === parseInt(params.id, 10),
            // )
            meetings_ &&
            meetings_.find((meeting) => meeting.id === parseInt(params.id, 10))
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
        <CommentList
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
        />
      </PageTemplate>
    </div>
  );
}

export default MeetingDetailPage;
