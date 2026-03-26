import React from 'react';

const SkillBar = ({ skill, level }) => {
    return (
        <div style={{ margin: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>{skill}</span>
                <span>{level}%</span>
            </div>
            <div style={{ background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                    style={{
                        height: '20px',
                        width: `${level}%`,
                        background: '#3b5998',
                        animation: 'progress-animation 1s ease-in-out',
                    }}
                />
            </div>
        </div>
    );
};

export default SkillBar;

// Adding some keyframes for the animation
const style = `
@keyframes progress-animation {
    from { width: 0; }
    to { width: 100%; }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = style;
document.head.appendChild(styleSheet);