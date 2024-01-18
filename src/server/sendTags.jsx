import React, { useState } from "react";
import { Client, Databases, Storage, ID } from "appwrite";
import { endpoint, project_id, database_id, tags_collection_id } from "../env";

const TagsPage = () => {
  const [tagName, setTagName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tagName.trim() === "") {
      setError("Tag name cannot be empty");
      return;
    }

    try {
      const client = new Client().setEndpoint(endpoint).setProject(project_id);
      const database = new Databases(client);

      // Replace 'tagsCollectionId' with your actual collection ID for tags

      await database.createDocument(
        database_id,
        tags_collection_id,
        ID.unique(),
        {
          name: tagName,
        }
      );

      // Clear the input field after successful submission
      setTagName("");
      setError(null);
      alert("Tag added successfully!");
    } catch (error) {
      console.error("Error adding tag:", error);
      setError("Error adding tag. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Create Tag</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Tag Name:
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Add Tag
        </button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

const containerStyle = {
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "10px",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#2980b9",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
};

export default TagsPage;
