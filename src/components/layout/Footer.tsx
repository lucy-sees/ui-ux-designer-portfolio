import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="social-links">
                <a href="https://twitter.com/LucySees" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://linkedin.com/in/lucy-sees" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/lucy-sees" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p>&copy; {new Date().getFullYear()} Lucy Sees. All rights reserved.</p>
        </footer>
    );
};

export default Footer;