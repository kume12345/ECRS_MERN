import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function OfficerTable() {
    const [cruds, setCruds] = useState([]);
    const { user } = useAuthContext();
    const [isDisabled, setIsDisabled] = useState(false); // Use boolean for disability state

    useEffect(() => {
        setIsDisabled(user.role === "Admin"); // Simplify the logic for setting disability

        async function getCruds() {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/officers");
                setCruds(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }

        getCruds();
    }, [user.role]); // Depend on user.role to re-run effect if the role changes

    return (
        <div className="container">
            <div>
				<br></br>
                <h2>Officer - Table View</h2>
                <hr />
            </div>

            <div className="table-responsive">
                <table className="table striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Crime Type</th>
                            <th>Where</th>
                            <th>When</th>
                            <th>Describe</th>
                            <th>View</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cruds.map((crud) => (
                            <tr key={crud.user_id}>
                                <td>
                                    <Link to={`/cruds/${crud.user_id}`} className="link-line">
                                        {crud.title}
                                    </Link>
                                </td>
                                <td>{crud.crimeType}</td>
                                <td>{crud.where}</td> {/* Correct the order */}
                                <td>{crud.when}</td> {/* Correct the order */}
                                <td>{crud.describe}</td>
                                <td>
                                    <Link to={`/officer/${crud._id}`} className="btn btn-warning">
                                        View
                                    </Link>
                                </td>
                                <td>
                                    {isDisabled ? (
                                        <span className={getClassname(crud.action)}>
                                            {crud.action}
                                        </span>
                                    ) : (
                                        <Link to={`/officer/${crud._id}/edit`} className={getClassname(crud.action)}>
                                            {crud.action}
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function getClassname(status) {
    if (status === "Pending") {
        return "btn btn-primary";
    } else if (status === "Rejected") {
        return "btn btn-danger";
    } else {
        return "btn btn-success";
    }
}

export default OfficerTable;
