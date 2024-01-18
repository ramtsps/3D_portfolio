import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Client, Databases, Storage, ID } from "appwrite"; // Import Appwrite SDK
import {
  endpoint,
  project_id,
  database_id,
  abouts_collection_id,
} from "../env";

const ServiceCard = (about) => {
  return (
    <Tilt
      className="Tilt xs:w-[250px] w-full"
      options={{ max: 45, scale: 1, speed: 450 }}
    >
      <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img
            src={about.imageUrl}
            alt="web-development"
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {about.title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services data from Appwrite
    const client = new Client().setEndpoint(endpoint).setProject(project_id);
    const database = new Databases(client);

    database
      .listDocuments(database_id, abouts_collection_id)
      .then((response) => {
        // console.log("response", response);
        const servicesData = response.documents.map((doc) => doc);
        setServices(servicesData);
        // console.log("service", servicesData);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Next.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((about, index) => (
          <ServiceCard key={index} index={index} {...about} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
