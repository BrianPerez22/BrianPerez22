import React from 'react';

export interface ProfileData {
  whoami: string;
  role: string;
  stack: string[];
  focus: string[];
  languages: { name: string; level: string; score: number }[];
}

export const ProfileTerminal: React.FC<{ data?: Partial<ProfileData> }> = ({ data }) => {
  const defaultData: ProfileData = {
    whoami: 'Brian Pérez Herrera',
    role: 'Software Engineering Student @ Universidad EAN',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'JavaScript'],
    focus: ['Elemental W (Founder & Interactive Science)', '2048-Petal (Game & Math)'],
    languages: [
      { name: 'es', level: 'native', score: 10 },
      { name: 'en', level: 'professional', score: 7 },
    ],
    ...data,
  };

  return (
    <div
      style={{
        backgroundColor: '#0A0A04',
        color: '#FAFF00',
        fontFamily: "'Fira Code', monospace",
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 0 25px rgba(250, 255, 0, 0.15)',
      }}
    >
      <div style={{ marginBottom: '14px' }}>
        <span style={{ color: '#FAFF00', fontWeight: 'bold' }}>$ whoami</span>
        <div style={{ color: '#FFFFFF', marginLeft: '12px' }}>{defaultData.whoami}</div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <span style={{ color: '#FAFF00', fontWeight: 'bold' }}>$ role</span>
        <div style={{ color: '#FFFFFF', marginLeft: '12px' }}>{defaultData.role}</div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <span style={{ color: '#FAFF00', fontWeight: 'bold' }}>$ stack</span>
        <div style={{ color: '#EAFF00', marginLeft: '12px' }}>
          {defaultData.stack.join(' · ')}
        </div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <span style={{ color: '#FAFF00', fontWeight: 'bold' }}>$ focus</span>
        <div style={{ color: '#FFFFFF', marginLeft: '12px' }}>
          {defaultData.focus.join(' · ')}
        </div>
      </div>
    </div>
  );
};

export default ProfileTerminal;
