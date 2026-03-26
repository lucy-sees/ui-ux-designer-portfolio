import React from 'react';
import './SkillsSection.css'; // Make sure to create a CSS file for styling

const SkillsSection: React.FC = () => {
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
  ];

  return (
    <div className="skills-section">
      <h2>My Skills</h2>
      {skills.map(skill => (
        <div className="skill-bar" key={skill.name}>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-level" style={{ width: `${skill.level}%` }}>
            <span>{skill.level}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;