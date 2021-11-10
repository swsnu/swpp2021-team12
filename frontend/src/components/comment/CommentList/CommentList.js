import React, { useState } from 'react';

export default function CommentList(props) {
  const {
    auth,
    comments,
    users,
    // meeting_or_room,
    articleId,
    createComment,
    editComment,
    deleteComment,
  } = props;
  const [newComment, setNewComment] = useState('');

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div className="CommentElement" key={comment.id}>
            <p className="CommentContent">
              {`${users.find((user) => user.id === comment.authorId)?.name} : ${
                comment.content
              }`}

              {auth && auth.id === comment.authorId ? (
                <>
                  <button
                    className="EditCommentButton"
                    id="edit-comment-button"
                    onClick={() => {
                      const editer = prompt('', comment.content);
                      if (editer) {
                        editComment(editer, auth.id, articleId, comment.id);
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
          </div>
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
          createComment(newComment, auth.id, articleId);
          setNewComment('');
        }}
      >
        Create Comment
      </button>
    </div>
  );
}
