import React from 'react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
    return (
        <div className="service-card">
            <div className="icon">
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ServiceCard;
