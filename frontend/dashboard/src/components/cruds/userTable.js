import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudTable() {
	const [cruds, setCruds] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:4000/api/admin/users");
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
				<h2>
					Users - Table View
					<p>
						<Link to="/cruds/new" className="btn btn-primary float-right">
							Create CRUD
						</Link>
					</p>
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<table className="table riped  table-hover table-bordered container">
				<thead>
					<tr>
						<th>Name</th>
						<th>NIC</th>
						<th>Email</th>
						<th>Role</th>
						<th>Username</th>
						<th>Password</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{cruds &&
						cruds.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/users/${crud._id}`} className="link-line">
											{crud.name}
										</Link>
									</td>
									<td>{crud.nic}</td>
									<td>{crud.email}</td>
									<td>{crud.role}</td>
									<td>{crud.username}</td>
                                    <td>{crud.password}</td>
									<td>
										<Link to={`/users/${crud._id}`} className="btn btn-warning">
											View
										</Link>
									</td>
									<td>
										<Link
											to={`/users/${crud._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/users/${crud._id}/delete`}
											className="btn btn-danger"
										>
											Delete
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			</div>
		</div>
	);
}

export default CrudTable;
