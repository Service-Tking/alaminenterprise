
import React from 'react';

export const GangchillLogo: React.FC<{ height?: number; className?: string }> = ({ height = 80, className = "" }) => (
  <svg height={height} viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Circular Icon Component */}
    <circle cx="60" cy="60" r="58" fill="white" stroke="#222" strokeWidth="1"/>
    <path d="M60 2C27.9675 2 2 27.9675 2 60C2 92.0325 27.9675 118 60 118C92.0325 118 118 92.0325 118 60C118 27.9675 92.0325 2 60 2Z" fill="white"/>
    
    {/* Colored Segments */}
    <path d="M60 60 L60 2 C27.9675 2 2 27.9675 2 60 Z" fill="#E11D48"/> {/* Red Segment */}
    <path d="M60 60 L118 60 C118 27.9675 92.0325 2 60 2 Z" fill="#FACC15"/> {/* Yellow Segment */}
    <path d="M60 60 L2 60 C2 92.0325 27.9675 118 60 118 C92.0325 118 118 92.0325 118 60 Z" fill="#1E3A8A"/> {/* Blue/Dark Segment */}
    
    {/* Bird Silhouette */}
    <path d="M30 65 Q50 40 90 60 Q70 70 60 90 Q55 75 30 65" fill="white" />
    <path d="M45 60 L85 55 L75 65 L45 60" fill="white" stroke="white" strokeWidth="2"/>

    {/* Text Section */}
    <text x="135" y="55" fill="#222" style={{ font: '900 48px Inter, sans-serif', letterSpacing: '2px' }}>GANGCHILL</text>
    <text x="135" y="100" fill="#222" style={{ font: '700 48px Inter, sans-serif', letterSpacing: '2px' }}>GROUP</text>
  </svg>
);

export const TKingLogo: React.FC<{ height?: number; className?: string }> = ({ height = 80, className = "" }) => (
  <svg height={height} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Winged Shape */}
    <path d="M10 20 C60 10 120 10 150 70 C180 10 240 10 290 20 L270 50 C230 40 170 40 150 80 C130 40 70 40 30 50 Z" fill="#0EA5E9" />
    <path d="M40 35 C70 30 110 35 150 70 C190 35 230 30 260 35 L250 45 C210 40 170 45 150 75 C130 45 90 40 50 45 Z" fill="#38BDF8" />
    
    {/* Central T Shape */}
    <path d="M135 10 L165 10 L165 20 L155 20 L155 70 L145 70 L145 20 L135 20 Z" fill="#0369A1" />

    {/* T-KING Main Text */}
    <text x="150" y="110" textAnchor="middle" fill="#1E40AF" style={{ font: '900 42px Inter, sans-serif', letterSpacing: '4px' }}>T•KING</text>
    
    {/* Subtitles */}
    <text x="150" y="128" textAnchor="middle" fill="#475569" style={{ font: 'bold 12px Inter, sans-serif', letterSpacing: '1px' }}>Pick-up & Light Truck</text>
    <text x="150" y="145" textAnchor="middle" fill="#DC2626" style={{ font: 'bold 16px Inter, sans-serif' }}>টাকা আয়ের রাজা</text>
  </svg>
);

interface HeaderBrandingProps {
  title: string;
  address?: string;
  contact?: string;
}

export const HeaderBranding: React.FC<HeaderBrandingProps> = ({ 
  title, 
  address = "Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi.", 
  contact = "Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com" 
}) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-black pb-6 mb-8 no-print-border">
      <div className="w-[30%] flex justify-start">
        <GangchillLogo height={75} />
      </div>
      
      <div className="w-[40%] text-center flex flex-col items-center">
        <h1 className="brand-ragtime text-5xl text-blue-900 uppercase leading-none">Al-AMIN</h1>
        <h2 className="brand-articpro text-2xl text-gray-700 italic -mt-1 lowercase">Enterprise</h2>
        <div className="mt-3 px-6 py-1.5 border-2 border-black font-black uppercase tracking-[0.2em] text-sm bg-gray-50 shadow-sm">
          {title}
        </div>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-3 max-w-xs">{address}</p>
        <p className="text-[9px] font-black text-gray-400 mt-1">{contact}</p>
      </div>

      <div className="w-[30%] flex justify-end">
        <TKingLogo height={75} />
      </div>
    </div>
  );
};
