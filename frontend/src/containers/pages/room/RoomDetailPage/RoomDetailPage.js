import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import RoomTemplate from '../RoomTemplate';
import RoomDetail from '../../../../components/room/RoomDetail/RoomDetail';

function RoomDetailPage(props) {
    const [room, setRoom] = useState();
    const [comments, setComments] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const {id} = props.match.params;
    const { currentUser } = useSelector(({ auth }) => ({
        currentUser: auth.auth,
    }));

    const createComment = (content, articleId) => {
        axios
            .post(`/api/comment/`, { content, section: 'room', articleId })
            .then(setRefresh(!refresh))
            .catch(() => {
            window.alert('Error occured while creating a new comment');
        });
    }

    const editComment = (content, commentId) => {
        axios
            .put(`/api/comment/${commentId}/`, {
                content,
            })
            .then(setRefresh(!refresh))
            .catch(() => {
                window.alert('Error occured while editing a comment');
            });
    }

    const deleteComment = (commentId) => {
        axios
            .delete(`/api/comment/${commentId}/`)
            .then(setRefresh(!refresh))
            .catch(() => {
                window.alert('Error occured whild deleting a comment');
            });
    }

    useEffect(() => {
        axios.get(`/api/room/${id}/`)
            .then((res) => {
                setRoom(res.data);
                axios.get(`/api/comment/room/${id}/`)
                    .then((res2) => {
                        setComments(res2.data);
                    })
            })
    }, [refresh])

    return (
        <RoomTemplate>
            {room && <RoomDetail 
            room={room} 
            comments={comments} 
            currentUser={parseInt(currentUser, 10)} 
            articleId={parseInt(id, 10)}
            createComment={createComment}
            editComment={editComment}
            deleteComment={deleteComment}
            />}
        </RoomTemplate>
    )
}
export default RoomDetailPage;