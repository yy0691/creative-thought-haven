import React from 'react';
import { useParams } from 'react-router-dom';
import { designs } from '../content/designs';
import SEO from '../components/SEO';

interface DesignDetailsProps {}

export default function DesignDetails({}: DesignDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const design = designs.find(d => d.id === id);

  if (!design) {
    return <div>设计作品未找到</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO title={`${design.title} - 设计作品`} description={design.description || ''} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{design.title}</h1>
        {design.description && (
          <p className="text-gray-600 mb-8">{design.description}</p>
        )}
        <div className="grid gap-6">
          {design.images?.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`${design.title} - 图片 ${index + 1}`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}