import React from 'react';

export const StockSphereLogo = ({ className = "w-6 h-6", color = "#059669" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer & Inner Network Rings */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2.5" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
      <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" stroke={color} strokeWidth="2" fill="none" />
      <polygon points="50,26 71,38 71,62 50,74 29,62 29,38" stroke={color} strokeWidth="1.5" fill="none" />
      
      {/* Cross Spoke Connections */}
      <line x1="50" y1="12" x2="50" y2="88" stroke={color} strokeWidth="1.5" />
      <line x1="17" y1="31" x2="83" y2="69" stroke={color} strokeWidth="1.5" />
      <line x1="17" y1="69" x2="83" y2="31" stroke={color} strokeWidth="1.5" />
      
      {/* Outer Node Dots */}
      <circle cx="50" cy="12" r="4.5" fill={color} />
      <circle cx="83" cy="31" r="4.5" fill={color} />
      <circle cx="83" cy="69" r="4.5" fill={color} />
      <circle cx="50" cy="88" r="4.5" fill={color} />
      <circle cx="17" cy="69" r="4.5" fill={color} />
      <circle cx="17" cy="31" r="4.5" fill={color} />
      
      {/* Inner Node Dots */}
      <circle cx="50" cy="26" r="3.5" fill={color} />
      <circle cx="71" cy="38" r="3.5" fill={color} />
      <circle cx="71" cy="62" r="3.5" fill={color} />
      <circle cx="50" cy="74" r="3.5" fill={color} />
      <circle cx="29" cy="62" r="3.5" fill={color} />
      <circle cx="29" cy="38" r="3.5" fill={color} />
      
      {/* Center Core Node */}
      <circle cx="50" cy="50" r="6" fill={color} />
    </svg>
  );
};

export default StockSphereLogo;
