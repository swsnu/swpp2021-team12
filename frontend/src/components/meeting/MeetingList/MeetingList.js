import React, { useEffect, useState } from 'react';
import { Button, List, Segment, Icon, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MeetingSearch from './MeetingSearch';

function Meeting({ meeting, history, currentUser }) {
  const accessible =
    meeting.author.id === currentUser ||
    meeting.is_public ||
    meeting.accessible_members.includes(currentUser);
  return (
    <Segment>
      <List divided relaxed>
        <List.Item>
          {accessible ? (
            <Segment.Group horizontal style={{ borderColor: 'green' }}>
              <Segment style={{ width: '70%' }}>
                <Header size="huge">{meeting.title}</Header>
              </Segment>
              <Segment compact>
                <Button
                  primary
                  onClick={() => history.push(`/meeting/${meeting.id}`)}
                >
                  Go to Detail!
                </Button>
              </Segment>
            </Segment.Group>
          ) : (
            <Segment.Group horizontal style={{ borderColor: 'red' }}>
              <Segment>
                <Header size="big">{meeting.title}</Header>
              </Segment>
              <Segment compact>
                <Icon size="big" name="lock" />
              </Segment>
            </Segment.Group>
          )}
        </List.Item>
      </List>
    </Segment>
  );
}

function MeetingList(props) {
  const [currentList, setCurrentList] = useState(null);
  const { history, meetinglist, currentUser } = props;

  const onClickFilterHandler = (keyword) => {
    const input = keyword.toUpperCase();
    let searchList;
    if (input === '') {
      searchList = meetinglist;
    } else {
      searchList = currentList.filter((meeting) => {
        if (meeting.title.toUpperCase().indexOf(input) > -1) {
          return true;
        }
        return false;
      });
    }
    setCurrentList(searchList);
  };

  useEffect(() => {
    if (meetinglist) {
      setCurrentList(meetinglist);
    }
  }, [meetinglist]);

  return (
    <div style={{ marginTop: '2em', marginLeft: '15em', marginRight: '5em' }}>
      <MeetingSearch onClickFilterHandler={onClickFilterHandler} />
      <Segment>
        {currentList &&
          currentList.map((meeting) => (
            <Meeting
              meeting={meeting}
              history={history}
              key={meeting.id}
              currentUser={currentUser}
            />
          ))}
      </Segment>

      <Button
        secondary
        className="BackButton"
        onClick={() => history.push('/main')}
      >
        Back
      </Button>
    </div>
  );
}

export default withRouter(MeetingList);
