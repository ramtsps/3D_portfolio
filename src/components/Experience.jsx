import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { Client, Databases, Storage, ID } from "appwrite"; // Import Appwrite SDK
import {
  endpoint,
  project_id,
  database_id,
  education_collection_id,
} from "../env";

const ExperienceCard = ({ experience }) => {
  // console.log("experience", experience);
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={`https://cdn-icons-png.flaticon.com/128/13012/13012482.png`}
            alt={experience.coursename}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">
          {experience.coursename}
        </h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyname}
        </p>
        {/* <ReactTooltip
          id={experience.coursename}
          effect="solid"
          arrowColor="#fff"
          className="skills-tooltip"
        > */}
        <img
          src={experience.imageUrl}
          alt={experience.coursename}
          style={{ width: "250px", height: "200px" }}
        />
        {/* </ReactTooltip> */}
      </div>

      {/* <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul> */}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Fetch experiences data from Appwrite
    const client = new Client().setEndpoint(endpoint).setProject(project_id);
    const database = new Databases(client);

    database
      .listDocuments(database_id, education_collection_id)
      .then((response) => {
        const experiencesData = response.documents.map((doc) => doc);
        setExperiences(experiencesData);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      });
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Skills & Certified.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
