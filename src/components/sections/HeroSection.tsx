import React from 'react';
import { gsap } from 'gsap';

const HeroSection: React.FC = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
        }
    }, []);

    return (
        <section ref={sectionRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
            <h1>Welcome to My Portfolio</h1>
        </section>
    );
};

export default HeroSection;