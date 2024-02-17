import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import CrudAdd from "./components/cruds/CrudAdd";
import CrudTable from "./components/cruds/CrudTable";
import CrudDetails from "./components/cruds/CrudDetails";
import CrudEdit from "./components/cruds/CrudEdit";
import CrudDelete from "./components/cruds/CrudDelete";
import Footer from "./components/common/Footer";
import UserTable from "./components/cruds/userTable";
import UserDetails from "./components/cruds/userDetails";
import UserEdit from "./components/cruds/userEdit";
import UserDelete from "./components/cruds/userDelete";
import ApprovalEdit from "./components/cruds/ApprovalEdit";
import OfficerTable from "./components/cruds/officerTable";
import OfficerDetails from "./components/cruds/officerDetail";
import OfficerEdit from "./components/cruds/officerEdit";
import Login  from "./components/pages/Login";
import Unauthorized from "./components/pages/Unauthorized";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/api/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/cruds" element={<CrudTable />} />
					<Route exact path="/officer" element={<OfficerTable />} />	
					<Route exact path="/officer/:_id" element={<OfficerDetails />} />
					<Route exact path="/users" element={<UserTable />} />
					<Route exact path="/unauthorized" element={<Unauthorized />} />				
					<Route exact path="/cruds/new" element={<CrudAdd />} />
					<Route exact path="/cruds/new" element={<CrudAdd />} />
					<Route exact path="/cruds/:_id" element={<CrudDetails />} />
					<Route exact path="/users/:_id" element={<UserDetails />} />
					<Route exact path="/cruds/:_id/edit" element={<CrudEdit />} />
					<Route exact path="/officer/:_id/edit" element={<OfficerEdit />} />
					<Route exact path="/approval/:_id/edit" element={<ApprovalEdit />} />
					<Route exact path="/users/:_id/edit" element={<UserEdit />} />
					<Route exact path="/cruds/:_id/delete" element={<CrudDelete />} />
					<Route exact path="/users/:_id/delete" element={<UserDelete />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
