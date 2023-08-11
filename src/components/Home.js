import React from "react";
import { getAllProjectsToApi } from "../api/projectsApi";
import CardForProject from "./CardForProject";
export default function Home() {
  const [allProjects, setAllProjects] = React.useState([]);
  React.useEffect(() => {
    getAllProjectsToApi()
      .then((catchProjects) => setAllProjects(catchProjects))
      .catch((err) => err);
  }, []);
  const generateCardsProjects = allProjects.map((el) => {
    return <CardForProject key={el.id} {...el} />;
  });
  return (
    <div>
      {generateCardsProjects.length === 0 && (
        <h3 className="msgeNotProjects">No projects available</h3>
      )}
      {generateCardsProjects}
    </div>
  );
}
