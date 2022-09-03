import React, { useContext, useEffect } from "react";

import UserProfileContext from "../../../Context/UserProfile/UserProfileContext";
import UserQueryItem from "./UserQueryItem";

import "./UserQueryItem.css";

const UserQueries = (props) => {
    const context = useContext(UserProfileContext);
    const { userQueries, getUserQueries } = context;

    useEffect(() => {
        getUserQueries(props.profile_id);
        console.log("userQueries", userQueries);
    }
    , []);

    return (
        <>
            <div className="row mb-4" style={{ height: "400px", overflow: "auto", }}>
                {/* conditional rendering */}
                {userQueries.length > 0 ? (
                    userQueries.map((query) => (
                        <UserQueryItem key={query.id} query={query} />
                    ))
                ) : (
                    <div classNameName="col-md-12">
                        <h3>No Queries</h3>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserQueries;