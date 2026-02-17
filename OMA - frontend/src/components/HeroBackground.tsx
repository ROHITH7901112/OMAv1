import '../styles/hero-background.css';

export const HeroBackground = () => {
  return (
    <div className="hero-background-wrapper">
      {/* Animated gradient background */}
      <div className="animated-gradient" />
      
      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="grid-pattern"></div>
      
      {/* Light particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
