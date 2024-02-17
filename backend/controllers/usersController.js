
const Users = require("../models/userModel");

const user_index = (req, res) => {
	Users.find(function (err, cruds) {
		res.json(cruds);
	});
};

const user_update = (req, res) => {
	Users.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.json("Crud updated");
			console.log("CRUD updated")
		})
		.catch(function (err) {
			res.status(422).send("Crud update failed.");
		});
};

const user_delete = (req, res) => {
	Users.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("Crud not found");
		} else {
			Users.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Crud deleted");
				})
				.catch(function (err) {
					res.status(400).send("Crud delete failed.");
				});
		}
	});
};

// Show a particular CRUD Detail by Id
const user_details = (req, res) => {
	Users.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};

module.exports = {
	user_index,
	user_update,
	user_delete,
	user_details,
};