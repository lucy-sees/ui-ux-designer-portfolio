import React from 'react';
import { TweenMax, Power2, TimelineLite } from 'gsap';

const ProjectsSection = () => {
  const projects = [
    // Example projects, replace with your data
    { id: 1, title: 'Project One', description: 'Description for project one' },
    { id: 2, title: 'Project Two', description: 'Description for project two' },
    { id: 3, title: 'Project Three', description: 'Description for project three' },
  ];

  const animateProjects = (element) => {
    const tl = new TimelineLite();
    tl.staggerFrom(element, 1, { opacity: 0, y: 50, ease: Power2.easeOut }, 0.2);
  };

  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="grid-container" ref={(el) => animateProjects(el && el.children)}>  
        {projects.map(project => (
          <div key={project.id} className="grid-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;