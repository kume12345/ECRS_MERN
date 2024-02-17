import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CrudEdit() {
  const initialState = {
    title: "",
    crimeType: "",
    when: "",
    where: "",
    describe: "",
    status: "",
  };
  const [crud, setCrud] = useState(initialState);

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCrud() {
      try {
        const response = await get(`http://localhost:4000/api/admin/${_id}`);
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
        await patch(`http://localhost:4005/api/admin/${crud._id}`, crud);
        navigate(`/cruds/${crud._id}`);
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
    navigate(`/cruds/${crud._id}`);
  }

  return (
    <div className="container">
      <h1>Edit {crud.title}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={crud.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Crime Type</label>
          <input
            name="crimeType"
            type="text"
            required
            value={crud.crimeType}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Where</label>
          <input
            name="where"
            type="text"
            required
            value={crud.where}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>When</label>
          <input
            name="when"
            type="text"
            required
            value={crud.when}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="describe"
            row="5"
            value={crud.describe}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            name="status"
            type="text"
            required
            value={crud.status}
            onChange={handleChange}
            className="form-control"
          disabled/><br></br>
        </div>
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

export default CrudEdit;
