import React, { useState } from 'react';
import { Comment, Header } from 'semantic-ui-react';

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
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author as="a">{comment.author.name}</Comment.Author>
              <Comment.Text>{comment.content}</Comment.Text>

              {currentUser === comment.author.id ? (
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
            </Comment.Content>
          </Comment>
        ))}
      <input
        className="NewComment"
        id="new-comment-content-input"
        value={newComment}
        placeholder="Make a new comment!"
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
    </Comment.Group>
  );
}
