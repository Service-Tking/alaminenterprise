
import React from 'react';
import { GangchillLogo, TKingLogo } from './Logo';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
          {/* Changed 'size' to 'height' to fix TypeScript error */}
          <GangchillLogo height={120} />
        </div>
        <h1 className="text-6xl tracking-tighter">
          <span className="font-ragtime text-blue-900 uppercase">Al-Amin</span>{' '}
          <span className="font-artica text-gray-700 italic">Enterprise</span>
        </h1>
        <p className="text-lg text-gray-500 font-black uppercase tracking-[0.3em]">Precision Management Since 1995</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10"></div>
        
        <p className="text-lg font-medium">
          In the year 1995, <span className="text-blue-900 font-black">Al-Amin Enterprise</span> started import and marketing of heavy-duty recondition commercial vehicles 
          (TATA, Ashok Leyland, etc.) from India on a large scale and continued the business until 2006, 
          when the government imposed a ban on such imports.
        </p>
        
        <p className="border-l-4 border-blue-900 pl-6 italic text-gray-500">
          At present, six (6) independent establishments are operating under the Al-Amin banner with individual identity.
        </p>

        <p>
          Mr. Mizanur Rahman Khan (Chairman) and Mr. Bazlur Rahman Khan (Managing Director) operate several sister concerns including:
          <span className="font-black text-gray-900 uppercase tracking-tight block mt-2"> 
            A to Z Trading, Fane Trading, M/S Bazlur Rahman, Gangchill Traders, etc.
          </span>
        </p>

        <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-gray-50">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest border-b pb-3">Sister Concern Ecosystem</h3>
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              {/* Changed 'size' to 'height' to fix TypeScript error */}
              <GangchillLogo height={60} />
              <div>
                <p className="font-black text-gray-900 uppercase tracking-tighter">Gangchill Group</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Trading & Logistics</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <TKingLogo height={50} />
              </div>
              <div>
                <p className="font-black text-gray-900 uppercase tracking-tighter">T•KING Partnership</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Heavy Duty Sales</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest border-b pb-3">Financial Backbone</h3>
              <ul className="grid grid-cols-1 gap-2 text-xs font-black text-gray-500 uppercase tracking-tight">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> UCBL Bank Ltd</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Bank Asia</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Jamuna Bank</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> LankaBangla Finance</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> United Leasing</li>
              </ul>
            </div>
            
            <div className="p-6 bg-blue-900 rounded-3xl text-white shadow-xl shadow-blue-900/20">
               <h3 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Group Leadership</h3>
               <p className="text-sm font-bold leading-relaxed">
                Operated by five brothers under the visionary leadership of <span className="text-yellow-400">Mr. Mizanur Rahman Khan</span>.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;