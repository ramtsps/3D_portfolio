import React from "react";

import Sendwork from "./sendwork";
import Sendabout from "./sendabout";
import SendSkills from "./sendskill";
import TagsPage from "./sendTags";
import CertificateForm from "./certificates";

const Sendinfo = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Sendwork />
      <TagsPage />
      <br />
      <br />
      <br />
      <Sendabout />
      <br />
      <br />
      <br />
      <SendSkills />
      <br />
      <br />
      <CertificateForm />
      <br />
    </div>
  );
};

export default Sendinfo;
