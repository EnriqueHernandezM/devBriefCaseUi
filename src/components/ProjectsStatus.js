import React from "react";

const statusMessages = {
  empty: "I'm busy building, not just posting projects here",
  end: "That's all here for now. I'm probably building the next one.",
  error: "Projects could not be loaded right now.",
};

export default function ProjectsStatus({ variant }) {
  const message = statusMessages[variant];

  if (!message) {
    return null;
  }

  return (
    <div className={`projectsStatus projectsStatus-${variant}`}>
      <p>{message}</p>
      <div className="projectsStatusDots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
