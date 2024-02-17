import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function CrudDetails(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`http://localhost:4000/api/admin/${_id}`);
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
			await axios.delete(`http://localhost:4000/api/admin/${_id}`);
			navigate("/cruds");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{crud.title}</h2>
			<p>
				<b>Title</b>: {crud.title}
			</p>

			<p>
				<b>Crime Type</b>: <a href={`tel:+${crud.phone}`}> {crud.crimeType} </a>
			</p>

			<p>
				<b>Location</b>: {crud.where}
			</p>
			<p>
				<b>Date</b>: {crud.when}
			</p>
			
			<p>
				<b>Description</b>: <p align="justify">{crud.describe}</p>
			</p>
			<p>
				<b>Status</b>: {crud.status}
			</p>
			
			<p>
				<small>
					<b>ID</b>: {crud._id}
				</small>
			</p>
			<div className="btn-group ">
				<Link to={`/cruds/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/cruds" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default CrudDetails;
