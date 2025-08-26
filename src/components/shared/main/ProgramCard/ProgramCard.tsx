import React from 'react';

const ProgramCard = ({ icon, title, subtitle }:{icon:string;title:string;subtitle:string}) => {
  return (
    <div className="flex items-center space-x-3 p-5 bg-gray-900 text-white">
      {/* Icon Box */}
      <div className="bg-gray-300 p-3 rounded-md flex items-center justify-center w-8 h-8">
        <span className="text-gray-900 text-lg">{icon}</span>
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col">
        <div className="font-semibold text-lg">{title}</div>
        <div className="font-normal text-sm text-gray-400">{subtitle}</div>
      </div>
    </div>
  );
}

export default ProgramCard;
