'use client';

import Image from 'next/image';
import ServiceCardAnimated from './ServiceCardAnimated';

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    features: string[];
    image: string;
  };
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <ServiceCardAnimated index={index}>
      <div className="relative h-64">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-gray-700">
              <span className="text-primary mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </ServiceCardAnimated>
  );
}