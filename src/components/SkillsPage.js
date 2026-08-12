import React from "react";
import {
  backendPractices,
  skillGroups,
  skillsIntro,
} from "../data/skillsData";

export default function SkillsPage() {
  const renderSkillGroups = skillGroups.map((group) => (
    <section className="skillGroup" key={group.id}>
      <div className="skillGroupHeader">
        <h3>{group.title}</h3>
        {group.description && <p>{group.description}</p>}
      </div>
      <div className="skillsGrid">
        {group.skills.map((skill) => (
          <div
            className={`skillItem ${skill.featured ? "skillItemFeatured" : ""}`}
            key={`${group.id}-${skill.name}`}
          >
            <span className="skillIcon" aria-hidden="true">
              {skill.icon ? (
                <img src={skill.icon} alt="" />
              ) : (
                <span>{skill.shortName}</span>
              )}
            </span>
            <span className="skillName">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  ));

  const renderPractices = backendPractices.map((practice) => (
    <span className="practiceChip" key={practice}>
      {practice}
    </span>
  ));

  return (
    <main className="containerSkills">
      <section className="skillsIntro" aria-labelledby="skills-title">
        <p>{skillsIntro.eyebrow}</p>
        <h2 id="skills-title">{skillsIntro.title}</h2>
        <span>{skillsIntro.description}</span>
      </section>

      <div className="skillsGroupsLayout">{renderSkillGroups}</div>

      <section className="skillGroup practicesGroup">
        <div className="skillGroupHeader">
          <h3>Backend Practices</h3>
        </div>
        <div className="practicesList">{renderPractices}</div>
      </section>
    </main>
  );
}
