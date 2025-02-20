import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4" style={{ color: '#ffffff' }}>
      <div style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 500 }}>加载中</div>
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              animation: 'bounce 0.6s infinite',
              animationDelay: `${(i - 1) * 0.2}s`,
              animationTimingFunction: 'cubic-bezier(0.28, 0.84, 0.42, 1)'
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;