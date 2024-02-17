import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserDelete(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function deleteCrudById() {
				try {
					const response = await axios.get(`http://localhost:4000/api/admin/users/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			deleteCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`http://localhost:4000/api/admin/users/${_id}`);
			navigate("/users");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{crud.name}</h2>

			<p>
				<b>Name</b>: {crud.name}
			</p>

			<p>
				<b>NIC</b>: {crud.nic}
			</p>
			<p>
				<b>Email</b>: {crud.email}
			</p>
			<p>
				<b>Username</b>:<a href={`${crud.link}`}> {crud.username} </a>
			</p>
			<p>
				<b>Password</b>: {crud.password}
			</p>
			<div className="btn-group">
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/users" className="btn btn-secondary">
					Cancel{" "}
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default UserDelete;
