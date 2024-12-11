import React from 'react';

const Carousel: React.FC = () => {
  const carouselItems = [
    { title: 'Fast Performance', description: 'Optimized for speed and efficiency.' },
    { title: 'Modern UI', description: 'Sleek and responsive user interfaces.' },
    { title: 'Customizable', description: 'Easily adaptable to your needs.' },
    { title: 'Secure', description: 'Top-notch security features.' },
    { title: 'Scalable', description: 'Built to handle growth effortlessly.' },
  ];

  return (
    <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 p-4">
      <div className="flex gap-4">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 h-48 snap-start bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
