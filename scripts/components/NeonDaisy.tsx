import React from 'react';

export interface NeonDaisyProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * NeonDaisy Component - Icono floral interactivo con estética amarillo neón
 * inspirado en la botánica matemática de 2048-Petal.
 */
export const NeonDaisy: React.FC<NeonDaisyProps> = ({
  size = 24,
  className = '',
  glow = true,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: glow ? 'drop-shadow(0 0 4px #FAFF00)' : 'none',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <defs>
        <radialGradient id="neonCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FAFF00" />
          <stop offset="100%" stopColor="#E2FF04" />
        </radialGradient>
      </defs>
      <g fill="#FFFFF0" stroke="#FAFF00" strokeWidth="0.8">
        <ellipse cx="12" cy="5" rx="2.2" ry="3.8" />
        <ellipse cx="12" cy="19" rx="2.2" ry="3.8" />
        <ellipse cx="5" cy="12" rx="3.8" ry="2.2" />
        <ellipse cx="19" cy="12" rx="3.8" ry="2.2" />
        <ellipse cx="7" cy="7" rx="2.2" ry="3.8" transform="rotate(-45 7 7)" />
        <ellipse cx="17" cy="17" rx="2.2" ry="3.8" transform="rotate(-45 17 17)" />
        <ellipse cx="17" cy="7" rx="2.2" ry="3.8" transform="rotate(45 17 7)" />
        <ellipse cx="7" cy="19" rx="2.2" ry="3.8" transform="rotate(45 7 19)" />
      </g>
      <circle cx="12" cy="12" r="4.2" fill="url(#neonCenter)" stroke="#FFE600" strokeWidth="1" />
      <circle cx="10.5" cy="11.2" r="0.7" fill="#0D0D00" />
      <circle cx="13.5" cy="11.2" r="0.7" fill="#0D0D00" />
      <path
        d="M10.8 13.1 Q12 14.3 13.2 13.1"
        stroke="#0D0D00"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NeonDaisy;
