import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Comment,
  Header,
  Button,
  Popup,
  Form,
  Container,
  Segment,
} from 'semantic-ui-react';

function CommentList(props) {
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
    <div className="CommentList" style={{ marginTop: '6em' }}>
      <Container>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {comments &&
            comments.map((comment) => (
              <Segment key={comment.id}>
                <Comment key={comment.id}>
                  <Popup
                    content={comment.author.self_intro}
                    key={comment.author.id}
                    header={comment.author.email}
                    trigger={
                      <Comment.Avatar
                        style={{
                          marginLeft: '10px',
                          marginTop: '5px',
                          width: '45px',
                        }}
                        src={`/api/user/${comment.author.id}/profile/`}
                      />
                    }
                  />
                  <Comment.Content
                    style={{ textAlign: 'left', marginLeft: '8em' }}
                  >
                    <Comment.Author as="a">
                      {comment.author.name}
                    </Comment.Author>
                    <Comment.Text>{comment.content}</Comment.Text>
                    {currentUser === comment.author.id ? (
                      <>
                        <Button
                          color="instagram"
                          size="mini"
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
                        </Button>
                        <Button
                          className="DeleteCommentButton"
                          id="delete-comment-button"
                          color="orange"
                          size="mini"
                          onClick={() => deleteComment(comment.id)}
                        >
                          DELETE
                        </Button>
                      </>
                    ) : null}
                  </Comment.Content>
                </Comment>
              </Segment>
            ))}
          <Form reply>
            <Form.TextArea
              className="NewComment"
              id="new-comment-content-input"
              value={newComment}
              placeholder="Make a new comment!"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              className="ConfirmCommentButton"
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              id="confirm-create-comment-button"
              disabled={newComment === ''}
              onClick={() => {
                createComment(newComment, articleId);
                setNewComment('');
              }}
            />
          </Form>
        </Comment.Group>
      </Container>
    </div>
  );
}

export default withRouter(CommentList);
