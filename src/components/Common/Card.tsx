import React from 'react';
import { useNavigate } from 'react-router';

interface CardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode; // Optional: Add an icon (e.g., from Heroicons)
  backgroundColor?: string; // Optional: Custom background color
  gradient?: string; // Optional: Gradient background
  link: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, backgroundColor, gradient, link }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
        gradient || backgroundColor || 'bg-white'
      }`}
      style={{
        background: gradient,
      }}
    >
      <div className="flex items-center justify-between  cursor-pointer" onClick={() => navigate(`${link}`)}>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && (
          <div className="p-3 rounded-full bg-opacity-20 bg-white">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;