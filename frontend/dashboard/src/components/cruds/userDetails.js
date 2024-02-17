import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserDetails(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`http://localhost:4000/api/admin/users/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`http://localhost:4000/api/admin/users/${_id}`);
			navigate("/cruds");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{crud.name}`s Details</h2>
			<p>
				<b>Name</b>: {crud.name}
			</p>

			<p>
				<b>NIC</b>: <a href={`tel:+${crud.phone}`}> {crud.nic} </a>
			</p>

			<p>
				<b>Email</b>: {crud.email}
			</p>
			<p>
				<b>Role</b>: {crud.role}
			</p>
			<p>
				<b>Username</b>: {crud.username}
			</p>
            <p>
				<b>Password</b>: {crud.password}
			</p>
			<div className="btn-group ">
				<Link to={`/users/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/users" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default UserDetails;
