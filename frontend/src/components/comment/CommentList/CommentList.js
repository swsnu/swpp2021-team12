import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

export default function CommentList(props) {
  const {
    currentUser,
    comments,
    articleId,
    createComment,
    editComment,
    deleteComment,
  } = props;
  const [newComment, setNewComment] = useState('');

  return (
    <div className="CommentList" style={{ marginTop: '5em' }}>
      {comments &&
        comments.map((comment) => (
          <Container
            text
            style={{ marginTop: '10px', width: '850px' }}
            key={comment.id}
          >
            <p className="CommentContent" style={{ centered: true }}>
              {/* {`${users.find((user) => user.id === comment.authorId)?.name} : ${
                comment.content
              }`} */}
              <button>{comment.authorId}</button>
              <h5>{comment.content}</h5>

              {currentUser === comment.authorId ? (
                <>
                  <button
                    className="EditCommentButton"
                    id="edit-comment-button"
                    onClick={() => {
                      const editer = prompt(
                        'Edit your comment!',
                        comment.content,
                      );
                      if (editer) {
                        editComment(editer, comment.id);
                      }
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    className="DeleteCommentButton"
                    id="delete-comment-button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    DELETE
                  </button>
                </>
              ) : null}
            </p>
          </Container>
        ))}
      <input
        className="NewComment"
        id="new-comment-content-input"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="ConfirmCommentButton"
        id="confirm-create-comment-button"
        disabled={newComment === ''}
        onClick={() => {
          createComment(newComment, articleId);
          setNewComment('');
        }}
      >
        Confirm
      </button>
    </div>
  );
}
