import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MeetingDetail from '../../../../components/meeting/MeetingDetail';
import PageTemplate from '../../../common/PageTemplate';
import {
  deleteMeeting,
  joinMeeting,
  quitMeeting,
} from '../../../../store/actions/meetings';

// TODO: Comments, Photo, Access, Tag, Location
function MeetingDetailPage(props) {
  const { auth_, meetings_, users_ } = useSelector(({ auth, meetings }) => ({
    meetings_: meetings.meetings,
    users_: auth.users,
    auth_: auth.auth,
  }));
  const { params } = props.match;
  const dispatch = useDispatch();
  return (
    <div className="MeetingDetailPage">
      <PageTemplate>
        <MeetingDetail
          users={users_}
          auth={auth_}
          meetingDetail={
            meetings_ &&
            meetings_.find((meeting) => meeting.id === parseInt(params.id, 10))
          }
          deleteMeeting={() =>
            dispatch(deleteMeeting({ id: parseInt(params.id, 10) }))
          }
          joinMeeting={() =>
            dispatch(joinMeeting({ auth: auth_, id: parseInt(params.id, 10) }))
          }
          quitMeeting={() =>
            dispatch(quitMeeting({ auth: auth_, id: parseInt(params.id, 10) }))
          }
        />
      </PageTemplate>
    </div>
  );
}

export default MeetingDetailPage;
