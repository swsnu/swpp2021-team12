import React from 'react';
import PageTemplate from '../../../common/PageTemplate';
import MeetingList from '../../../../components/meeting/MeetingList/MeetingList';

function MeetingListPage() {
  const ExampleList = [
    { id: 3, MeetingName: 'You are full of bullshit' },
    { id: 1, MeetingName: 'And you are full of bullsthit' },
    { id: 2, MeetingName: 'Finally you are full of bullshit' },
  ];

  return (
    <div className="MeetingList">
      <PageTemplate>
        <MeetingList meetinglist={ExampleList} />
      </PageTemplate>
    </div>
  );
}

export default MeetingListPage;
