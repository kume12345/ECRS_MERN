import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserEdit() {
  const initialState = {
    name: "",
    nic: "",
    email: "",
    role: "",
    username: "",
    password: "",
  };

  const [crud, setCrud] = useState(initialState);

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCrud() {
      try {
        const response = await get(`http://localhost:4000/api/admin/users/${_id}`);
        setCrud(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCrud();
  }, [_id]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateCrud() {
      try {
        await patch(`http://localhost:4000/api/admin/users/${crud._id}`, crud);
        navigate(`/users/${crud._id}`);
      } catch (error) {
        console.log(error);
      }
    }
    updateCrud();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate(`/users/${crud._id}`);
  }

  return (
    <div className="container">
      <h1>Edit {crud.name}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={crud.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>NIC</label>
          <input
            name="nic"
            type="text"
            required
            value={crud.nic}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            required
            value={crud.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
                  <label>Role</label>
                  <select name="role" value={crud.role} onChange={handleChange} className="form-control">
                      <option value="" defaultChecked>Change Authorization</option>
                      <option value="User">User</option>

                      <option value="Admin">Admin</option>

                      <option value="Officer">Officer</option>
                  </select>

              </div>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            type="text"
            required
            value={crud.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={crud.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br></br>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;
