import React, { useState } from "react";
import { Client, Databases, Storage, ID } from "appwrite";
import {
  endpoint,
  project_id,
  database_id,
  storage_id,
  skills_collection_id,
} from "../env";

const SendSkills = () => {
  const [formData, setFormData] = useState({
    bgcolor: "",
    icon: null,
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Perform any icon-related processing if needed
      setFormData({ ...formData, icon: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const client = new Client().setEndpoint(endpoint).setProject(project_id);
      const storage = new Storage(client);
      const database = new Databases(client);

      // Upload icon to Appwrite storage
      const file = formData.icon;
      const uploadResponse = await storage.createFile(
        storage_id,
        ID.unique(),
        file
      );
      const iconId = uploadResponse["$id"];
      const imagePreviewResponse = await storage.getFilePreview(
        storage_id,
        iconId
      );
      const iconUrl = imagePreviewResponse.href;

      // Add document to Appwrite database with the icon URL

      const data = {
        name: formData.name,
        iconUrl: iconUrl,
        bgcolor: formData.bgcolor,
      };

      await database.createDocument(
        database_id,
        skills_collection_id,
        ID.unique(),
        data
      );

      // Clear form data after submission
      setFormData({
        bgcolor: "",
        icon: null,
        name: "",
      });

      console.log("Skill added successfully!");
    } catch (error) {
      console.error("Error adding skill: ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Add Skill</h2>
      <form style={formStyle}>
        <label style={labelStyle}>
          Background Color:
          <input
            type="text"
            name="bgcolor"
            value={formData.bgcolor}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Icon:
          <input
            type="file"
            name="icon"
            onChange={handleIconChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <button type="button" onClick={handleSubmit} style={submitButtonStyle}>
          Add Skill
        </button>
      </form>
    </div>
  );
};
const containerStyle = {
  textAlign: "center",
  maxWidth: "400px",
  margin: "auto",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#ffccbc", // Peach color
};

const headerStyle = {
  color: "#333",
  marginBottom: "20px",
  fontSize: "24px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const labelStyle = {
  textAlign: "left",
  width: "100%",
  marginBottom: "10px",
  fontSize: "16px",
  color: "#7d3c98", // Plum color
};

const inputStyle = {
  color: "white",
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ddd",
  marginBottom: "20px",
  fontSize: "16px",
};

const submitButtonStyle = {
  backgroundColor: "#e57373", // Light Red
  color: "#fff",
  padding: "15px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  width: "100%",
};

export default SendSkills;
