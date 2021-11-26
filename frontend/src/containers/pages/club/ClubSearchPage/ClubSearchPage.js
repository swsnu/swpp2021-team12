import React, { useState, useEffect } from "react";
import axios from 'axios';

import PageTemplate from "../../../common/PageTemplate";
import ClubSearch from "../../../../components/club/ClubSearch";

function ClubSearchPage() {
    const [ clubList, setClubList ] = useState([]);

    useEffect(() => {
        axios.get('/api/club/')
            .then((res) => {
                setClubList(res.data);
            })
            .catch(() => {
                alert("Error while getting club list!!");
            })
    }, [])

    return (
        <PageTemplate>
            <ClubSearch clubList={clubList}/>
        </PageTemplate>
    )
}
export default ClubSearchPage