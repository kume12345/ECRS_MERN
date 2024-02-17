import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [describe, setDescribe] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const status = "Pending";

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object and append form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("crimeType", crimeType);
    formData.append("where", where);
    formData.append("when", when);
    formData.append("describe", describe);
    formData.append("status", status);
    formData.append("image", selectedImage);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setTitle("");
        setCrimeType("");
        setWhere("");
        setWhen("");
        setDescribe("");
        setError(null); // Reset error state
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>Report a New Environmental Crime Incident</h3>

      <label>Crime Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Crime Type: </label>
      <select value={crimeType} onChange={(e)=>setCrimeType(e.target.value)} className={emptyFields.includes("crimeType") ? "error" : ""}>
        <option value="">Choose</option>
        <option value="Wildlife">Wildlife</option>
        <option value="Forest">Forest</option>
      </select>

      <label>Where: </label>
      <input
        type="text"
        onChange={(e) => setWhere(e.target.value)}
        value={where}
        className={emptyFields.includes("where") ? "error" : ""}
      />

      <label>When:</label>
      <input
        type="date"
        onChange={(e) => setWhen(e.target.value)}
        value={when}
        className={emptyFields.includes("when") ? "error" : ""}
      />

      <label>Describe: </label>
      <textarea cols="20"
        onChange={(e) => setDescribe(e.target.value)}
        value={describe}
        className={emptyFields.includes("describe") ? "error" : ""}
      />

      <label>Evidence:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button>Report the crime</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
