const Crud = require("../models/adminModel");
const Users = require("../models/userModel")
const Approved = require("../models/approvedModel")


// Display All CRUD Data
const crud_index = (req, res) => {
	console.log("Function is added")
	Crud.find(function (err, cruds) {
		res.json(cruds);
	});
};

const user_index = (req, res) => {
	console.log("Function is added")
	Users.find(function (err, cruds) {
		res.json(cruds);
	});
};

// Create New CRUD
const crud_create_post = (req, res) => {
	let crud = new Crud(req.body);
	crud
		.save()
		.then((crud) => {
			res.send(crud);
		})
		.catch(function (err) {
			res.status(422).send("Crud add failed");
		});
};

// Show a particular CRUD Detail by Id
const crud_details = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};

// Update CRUD Detail by Id
const crud_update = async (req, res) => {
	const { title, crimeType, where, when, describe, status, imagePath, user_id } = req.body;
	if(status === "Approved"){
		console.log("In here")
	await Approved.create({ title, crimeType, where, when, describe, status, imagePath, user_id })
	}
	Crud.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.json("Crud updated");
			console.log("CRUD updated")
		})
		.catch(function (err) {
			res.status(422).send("Crud update failed.");
		});
};

// Delete CRUD Detail by Id
const crud_delete = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("Crud not found");
		} else {
			Crud.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Crud deleted");
				})
				.catch(function (err) {
					res.status(400).send("Crud delete failed.");
				});
		}
	});
};

module.exports = {
	crud_index,
	user_index,
	crud_details,
	crud_create_post,
	crud_update,
	crud_delete,
};
