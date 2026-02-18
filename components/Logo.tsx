import React from 'react';

export const GangchillLogo: React.FC<{ height?: number; className?: string }> = ({ height = 80, className = "" }) => (
  <svg height={height} viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="58" fill="white" stroke="#222" strokeWidth="1"/>
    <path d="M60 60 L60 2 C27.9675 2 2 27.9675 2 60 Z" fill="#E11D48"/>
    <path d="M60 60 L118 60 C118 27.9675 92.0325 2 60 2 Z" fill="#FACC15"/>
    <path d="M60 60 L2 60 C2 92.0325 27.9675 118 60 118 C92.0325 118 118 92.0325 118 60 Z" fill="#1E3A8A"/>
    <path d="M30 65 Q50 40 90 60 Q70 70 60 90 Q55 75 30 65" fill="white" />
    <text x="135" y="55" fill="#222" style={{ font: '900 42px Inter, sans-serif', letterSpacing: '1px' }}>GANGCHILL</text>
    <text x="135" y="100" fill="#222" style={{ font: '700 42px Inter, sans-serif', letterSpacing: '1px' }}>GROUP</text>
  </svg>
);

export const TKingLogo: React.FC<{ height?: number; className?: string }> = ({ height = 80, className = "" }) => (
  <svg height={height} viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 30 C60 20 120 20 150 80 C180 20 240 20 290 30 L270 60 C230 50 170 50 150 90 C130 50 70 50 30 60 Z" fill="#0EA5E9" />
    <path d="M135 15 L165 15 L165 25 L155 25 L155 75 L145 75 L145 25 L135 25 Z" fill="#0369A1" />
    <text x="150" y="120" textAnchor="middle" fill="#1E40AF" style={{ font: '900 38px Inter, sans-serif', letterSpacing: '3px' }}>T•KING</text>
    <text x="150" y="155" textAnchor="middle" fill="#DC2626" style={{ font: 'bold 22px Inter, sans-serif' }}>টাকা আয়ের রাজা</text>
  </svg>
);

interface HeaderBrandingProps {
  title: string;
  address?: string;
  contact?: string;
  className?: string;
}

export const HeaderBranding: React.FC<HeaderBrandingProps> = ({ 
  title, 
  address = "Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi.", 
  contact = "Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com",
  className = ""
}) => {
  return (
    <div className={`flex justify-between items-center border-b-2 border-black pb-4 mb-4 no-print-border bg-white ${className}`}>
      <div className="w-[30%] flex justify-start items-center">
        <GangchillLogo height={50} />
      </div>
      <div className="w-[40%] text-center flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <h1 className="brand-ragtime text-4xl text-blue-900 uppercase leading-none select-none">Al-AMIN</h1>
        </div>
        <h2 className="brand-articpro text-xl text-gray-700 italic -mt-1 select-none">Enterprise</h2>
        <div className="mt-2 px-4 py-0.5 border-2 border-black font-black uppercase tracking-[0.2em] text-[9px] bg-gray-50 shadow-sm print:bg-white">
          {title}
        </div>
        <p className="text-[7px] font-bold text-gray-500 uppercase tracking-tight mt-2 max-w-xs">{address}</p>
        <p className="text-[7px] font-black text-gray-400 mt-0.5">{contact}</p>
      </div>
      <div className="w-[30%] flex justify-end items-center">
        <TKingLogo height={60} />
      </div>
    </div>
  );
};

export const SeizeHeaderBranding: React.FC<{ title: string; address: string; contact: string }> = ({ title, address, contact }) => (
  <div className="flex justify-between items-center border-b border-black pb-2 mb-2 bg-white">
    <div className="w-[20%] flex justify-start"><GangchillLogo height={40} /></div>
    <div className="w-[60%] text-center flex flex-col items-center">
      <div className="bg-gray-100 px-4 py-0.5 border-2 border-black font-black uppercase tracking-[0.1em] text-[12px] mb-1">
        {title}
      </div>
      <div className="flex items-center gap-1.5 leading-none">
        <span className="text-[14px] font-black text-gray-900 italic">M/S.</span>
        <h1 className="brand-ragtime text-[32px] text-blue-900 uppercase">Al-AMIN</h1>
        <h1 className="brand-articpro text-[32px] text-gray-700 italic">Enterprise</h1>
      </div>
      <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tight mt-1">{address}</p>
      <p className="text-[8px] font-black text-gray-400">{contact}</p>
    </div>
    <div className="w-[20%] flex justify-end"><TKingLogo height={50} /></div>
  </div>
);