import React from 'react';
import { gsap } from 'gsap';

const StatsSection = () => {
    React.useEffect(() => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200;
                const increment = Math.trunc(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    gsap.to(counter, { opacity: 1, duration: 0.5 });
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            gsap.from(counter, { opacity: 0, duration: 0.5 });
        });
    }, []);

    return (
        <section className="stats-section">
            <div className="stat">
                <h2 className="counter" data-target="1500">0</h2>
                <p>Followers</p>
            </div>
            <div className="stat">
                <h2 className="counter" data-target="250">0</h2>
                <p>Projects</p>
            </div>
            <div className="stat">
                <h2 className="counter" data-target="100">0</h2>
                <p>Clients</p>
            </div>
        </section>
    );
};

export default StatsSection;