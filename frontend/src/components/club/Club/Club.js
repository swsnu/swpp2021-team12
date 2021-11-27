import React, { useEffect, useState } from 'react';
import {
  Form,
  Grid,
  Segment,
  Button,
  List,
  Image,
  Header,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Club(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [membersToKick, setMembersToKick] = useState([]);

  const {
    existingClub,
    onClickConfirmHandler,
    onClickDeleteHandler,
    isEdit,
    history,
    mockMembers,
  } = props;

  useEffect(() => {
    if (existingClub) {
      setTitle(existingClub.title);
      setContent(existingClub.content);
    }
  }, [existingClub]);

  useEffect(() => {
    if (!title || !content) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, content]);

  return (
    <div>
      <Segment style={{ padding: '8em 5em' }} vertical>
        <Grid columns="1" style={{ padding: '1em 20em' }}>
          <Grid.Column>
            <h1>Create Your Club!</h1>
            <br />
            <Form id="club-form">
              <Form.Input
                id="club-title-input"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.TextArea
                id="club-content-input"
                label="Content"
                style={{ minHeight: 200 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {isEdit && (
                <Grid centered>
                  <Header>Members</Header>
                  <List divided verticalAlign="middle">
                    {mockMembers.map((member) => (
                      <List.Item key={member.id}>
                        <List.Content floated="right">
                          {membersToKick.includes(member.id) ? (
                            <Button
                              id="undone-button"
                              onClick={() => {
                                setMembersToKick(
                                  membersToKick.filter((x) => x !== member.id),
                                );
                              }}
                            >
                              Undone
                            </Button>
                          ) : (
                            <Button
                              id="kick-button"
                              onClick={() => {
                                setMembersToKick([...membersToKick, member.id]);
                              }}
                            >
                              Kick
                            </Button>
                          )}
                        </List.Content>
                        <Image avatar src={`/api/user/${member.id}/profile/`} />
                        <List.Content>{member.name}</List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Grid>
              )}
              <Grid centered>
                {isEdit && (
                  <>
                    <Button
                      id="pending-button"
                      onClick={() =>
                        history.push(`/club/${existingClub.id}/pending`)
                      }
                    >
                      Pending Applicant
                    </Button>
                    <Button
                      id="delete-button"
                      onClick={() => onClickDeleteHandler(history)}
                    >
                      Delete
                    </Button>
                  </>
                )}
                <Button
                  primary
                  size="small"
                  id="confirm-button"
                  disabled={isDisable}
                  onClick={() =>
                    onClickConfirmHandler(
                      title,
                      content,
                      membersToKick,
                      history,
                    )
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  id="back-button"
                  onClick={() => {
                    history.push('/club');
                  }}
                >
                  Back
                </Button>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default withRouter(Club);
