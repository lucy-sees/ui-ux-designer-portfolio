// ServicesSection.tsx
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection: React.FC = () => {
    React.useEffect(() => {
        const sections = gsap.utils.toArray('.service');

        gsap.from(sections, { 
            opacity: 0,
            y: 50,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.services',
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
            },
        });
    }, []);

    return (
        <div className="services">
            <h2>Our Services</h2>
            <div className="service">Service 1</div>
            <div className="service">Service 2</div>
            <div className="service">Service 3</div>
            <div className="service">Service 4</div>
        </div>
    );
};

export default ServicesSection;