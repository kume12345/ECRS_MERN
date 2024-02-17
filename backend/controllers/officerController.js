const Crud = require("../models/adminModel")
const Approved = require("../models/approvedModel")
const Resolved = require("../models/resolvedModel")

// Display All CRUD Data
const officers_index = (req, res) => {
	console.log("Function is added")
	Approved.find(function (err, cruds) {
		res.json(cruds);
	});
};


// Show a particular CRUD Detail by Id
const officers_details = (req, res) => {
	Approved.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};


// Update CRUD Detail by Id
const officers_update = async (req, res) => {
	const { title, crimeType, where, when, describe, status, action, imagePath, user_id } = req.body;
	if(action === "Resolved"){
		console.log("In here")
	await Resolved.create({ title, crimeType, where, when, describe, status, action, imagePath, user_id })
	}
	Approved.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.json("Crud updated");
			console.log("CRUD updated")
		})
		.catch(function (err) {
			res.status(422).send("Crud update failed.");
		});
};




module.exports = {
	officers_index,
	officers_details,
	officers_update,
};
