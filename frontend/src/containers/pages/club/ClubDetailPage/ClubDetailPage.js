import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ClubDetail from '../../../../components/club/ClubDetail';
import PageTemplate from '../../../common/PageTemplate';

function ClubDetailPage(props) {
  const tempDetail = {
    id: 1,
    title: 'PIU gaymers',
    content: 'Seol JJANG Go',
    author: {
      id: 11,
      name: 'KylusheL',
    },
    members: [
      {
        id: 1,
        name: 'JHP',
      },
      {
        id: 2,
        name: 'SLAVE',
      },
      {
        id: 3,
        name: 'ALPHAGO',
      },
    ],
  };
  const [clubDetail, setClubDetail] = useState(null);
  console.log(clubDetail);
  const { currentUser } = useSelector(({ auth }) => ({
    currentUser: auth.auth,
  }));
  const { history } = props;
  const { id } = props.match.params;

  useEffect(() => {
    axios
      .get(`/api/club/${id}/`)
      .then((res) => {
        setClubDetail(res.data);
      })
      .catch(() => {
        window.alert('Error occured while fetching meeting info');
      });
  }, []);

  return (
    <div className="ClubDetailPage">
      <PageTemplate>
        <ClubDetail
          currentUser={parseInt(currentUser, 10)}
          // clubDetail={clubDetail}
          clubDetail={tempDetail}
          onClickDeleteButton={() => {
            axios
              .delete(`/api/club/${id}/`)
              .then(() => {
                history.push('/club');
              })
              .catch(() => {
                window.alert('Error occured while deletion');
              });
          }}
        />
      </PageTemplate>
    </div>
  );
}

export default ClubDetailPage;
