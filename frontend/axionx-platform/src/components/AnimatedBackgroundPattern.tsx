export const AnimatedBackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Animated wave paths */}
        <path
          d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <path
          d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200"
          stroke="url(#wave-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
        <path
          d="M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300"
          stroke="url(#wave-gradient)"
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        />
        <path
          d="M0,400 Q250,350 500,400 T1000,400 T1500,400 T2000,400"
          stroke="url(#wave-gradient)"
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '0.5s' }}
        />
      </svg>
    </div>
  );
};
