import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Client, Databases, Storage, ID } from "appwrite"; // Import Appwrite SDK
import { endpoint, project_id, database_id, works_collection_id } from "../env";

const ProjectCard = ({ project }) => {
  return (
    <motion.div>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={project.imageUrl}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <a href="https://github.com/ramtsps" aria-label="Github Link">
                <img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/65a7b003318b41d56239/files/65a80120ed95afceaded/view?project=65a767ea779d7d9dbb90&mode=admin`}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{project.title}</h3>
          <p className="mt-2 text-secondary text-[14px]">{project.descrip}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <p className={`text-[14px]`}>#{project.tags}</p>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data from Appwrite
    const client = new Client().setEndpoint(endpoint).setProject(project_id);
    const database = new Databases(client);

    database
      .listDocuments(database_id, works_collection_id)
      .then((response) => {
        const projectsData = response.documents.map((doc, index) => ({
          ...doc,
          index,
        }));
        setProjects(projectsData);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my ability to
          solve complex problems, work with different technologies, and manage
          projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project) => (
          <ProjectCard key={`project-${project.index}`} project={project} />
        ))}
      </div>
    </>
  );
};
export default SectionWrapper(Works, "");
