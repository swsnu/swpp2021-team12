import React, { useState, useEffect } from 'react';
import * as axios from 'axios';

import PageTemplate from '../../../common/PageTemplate';
import MeetingList from '../../../../components/meeting/MeetingList/MeetingList';

function MeetingListPage() {
  /* const ExampleList = [
    { id: 3, MeetingName: 'You are full of bullshit' },
    { id: 1, MeetingName: 'And you are full of bullsthit' },
    { id: 2, MeetingName: 'Finally you are full of bullshit' },
  ]; */
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    axios.get('/api/meeting')
      .then((res) => {
        setMeetings(res.data)
      })
  }, []);

  return (
    <div className="MeetingList">
      <PageTemplate>
        <MeetingList meetinglist={meetings} />
      </PageTemplate>
    </div>
  );
}

export default MeetingListPage;
