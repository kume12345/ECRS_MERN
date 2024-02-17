import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudTable() {
	const [cruds, setCruds] = useState([]);

	useEffect(() => {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:4000/api/admin/");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container">
			
			<div>
				<br></br>
				<h2>Crime - Table View</h2>
				<hr />
			</div>
		
			<div className="table-responsive">
				<table className="table riped  table-hover table-bordered container">
					<thead>
						<tr>
							<th>Title</th>
							<th>Crime Type</th>
							<th>Where</th>
							<th>When</th>
							<th>Describe</th>
							<th>Status</th>
							<th>User ID</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
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
								<td>{crud.when}</td>
								<td>{crud.where}</td>
								<td>{crud.describe}</td>
								<td>
									<Link
										to={`/approval/${crud._id}/edit`}
										className={getClassname(crud.status)}
									>
										{crud.status}
									</Link>
								</td>
								<td>{crud.user_id}</td>
								<td>
									<Link to={`/cruds/${crud._id}`} className="btn btn-warning">
										View
									</Link>
								</td>
								<td>
									<Link
										to={`/cruds/${crud._id}/edit`}
										className="btn btn-success"
									>
										Edit
									</Link>
								</td>
								<td>
									<Link
										to={`/cruds/${crud._id}/delete`}
										className="btn btn-danger"
									>
										Delete
									</Link>
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

export default CrudTable;
