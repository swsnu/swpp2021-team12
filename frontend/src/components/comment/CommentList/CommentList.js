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
  Grid,
} from 'semantic-ui-react';
import axios from 'axios';

function CommentList(props) {
  const {
    currentUser,
    comments,
    articleId,
    createComment,
    editComment,
    deleteComment,
    history,
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
                  <Comment.Avatar
                    style={{
                      borderStyle: 'outset',
                      marginLeft: '20px',
                      width: '50px',
                      height: '50px',
                    }}
                    src={`/api/user/${comment.author.id}/profile/`}
                  />
                  <Comment.Content
                    style={{ textAlign: 'left', marginLeft: '8em' }}
                  >
                    <Popup
                      pinned
                      on="click"
                      trigger={
                        <Comment.Author as="a">
                          {comment.author.name}
                        </Comment.Author>
                      }
                    >
                      <Grid centered divided columns={1}>
                        <Grid.Column textAlign="center">
                          <Header as="h4">{comment.author.name}</Header>
                          <p>{comment.author.email}</p>
                          <p>{comment.author.self_intro}</p>
                          <Button
                            primary
                            onClick={() => {
                              axios
                                .get(`/api/room/user/${comment.author.id}/`)
                                .then((res) => {
                                  history.push(`/room/${res.data.id}`);
                                })
                                .catch(() => {
                                  alert('Error! There is no room');
                                });
                            }}
                          >
                            Go to Room
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </Popup>
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
                          Edit
                        </Button>
                        <Button
                          className="DeleteCommentButton"
                          id="delete-comment-button"
                          color="red"
                          size="mini"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
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
