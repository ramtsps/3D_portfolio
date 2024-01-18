import React, { useState, useEffect } from "react";
import { SectionWrapper } from "../hoc";
import { BallCanvas } from "./canvas";
import { technologies } from "../constants"; // Import the default technologies data
import { Client, Databases } from "appwrite"; // Import Appwrite SDK
import {
  endpoint,
  project_id,
  database_id,
  skills_collection_id,
} from "../env";

const Tech = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills data from Appwrite
    const client = new Client().setEndpoint(endpoint).setProject(project_id);
    const database = new Databases(client);

    database
      .listDocuments(database_id, skills_collection_id)
      .then((response) => {
        const skillsData = response.documents.map((doc) => doc);
        setSkills(skillsData);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {skills.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          {/* Pass the iconUrl to BallCanvas */}
          <BallCanvas icon={technology.iconUrl} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
