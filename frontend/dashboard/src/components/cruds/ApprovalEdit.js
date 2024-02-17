import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ApprovalEdit() {
  const initialState = {
    title: "",
    crimeType: "",
    when: "",
    where: "",
    describe: "",
    status: "",
    imagePath: "",
    user_id: ""
  };
  const [crud, setCrud] = useState(initialState);
  const [status, setStatus] = useState("");

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCrud() {
      try {
        const response = await get(`http://localhost:4000/api/admin/${_id}`);
        setCrud(response.data);
        setStatus(response.data.status); // Set the initial status
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
        await patch(`http://localhost:4000/api/admin/${crud._id}`, crud);
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
    navigate(`/cruds/`);
  }

  return (
    <div className="container">
        <br></br>
      <h1>Change the status of {crud.title}</h1>
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
            disabled
          />
        </div>
        <div className="form-group">
          <label>Crime Type</label>
          <input
            name="crimeType"
            type="text"
            value={crud.crimeType}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Where</label>
          <input
            name="where"
            type="text"
            value={crud.where}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>When</label>
          <input
            name="when"
            type="text"
            value={crud.when}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>ImagePath</label>
          <input
            name="imagePath"
            type="text"
            value={crud.imagePath}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>User ID</label>
          <input
            name="userid"
            type="text"
            value={crud.user_id}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="describe"
            rows="5"
            value={crud.describe}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        
              <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={crud.status} onChange={handleChange} className="form-control">
                      <option value="" defaultChecked>Change Approvel</option>
                      <option value="Pending">Pending</option>

                      <option value="Approved">Approved</option>

                      <option value="Rejected">Rejected</option>
                  </select>

              </div>
        <br /> {/* Fix syntax issue here */}
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Change Status
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

export default ApprovalEdit;
