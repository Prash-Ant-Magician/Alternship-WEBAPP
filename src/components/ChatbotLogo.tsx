export default function ChatbotLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 320 320" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main circular background */}
      <circle cx="160" cy="160" r="150" fill="url(#gradient1)" />
      
      {/* Chat bubble tail */}
      <path 
        d="M 120 300 L 140 320 L 160 300 Z" 
        fill="url(#gradient2)"
      />
      
      {/* Left antenna */}
      <rect x="62" y="50" width="8" height="64" rx="4" fill="#0066CC" />
      <circle cx="66" cy="45" r="10" fill="#0066CC" />
      
      {/* Right antenna */}
      <rect x="250" y="50" width="8" height="64" rx="4" fill="#0066CC" />
      <circle cx="254" cy="45" r="10" fill="#0066CC" />
      
      {/* Head panel */}
      <path 
        d="M 95 80 Q 95 60 115 60 L 205 60 Q 225 60 225 80 L 225 120 L 95 120 Z" 
        fill="url(#gradient3)"
      />
      {/* Panel lines */}
      <rect x="120" y="85" width="80" height="2" rx="1" fill="#0052A3" />
      <rect x="120" y="92" width="80" height="2" rx="1" fill="#0052A3" />
      <rect x="120" y="99" width="80" height="2" rx="1" fill="#0052A3" />
      {/* Bottom line */}
      <rect x="130" y="110" width="60" height="4" rx="2" fill="#0052A3" />
      
      {/* Left headphone */}
      <rect x="40" y="120" width="48" height="80" rx="16" fill="#0066CC" />
      
      {/* Right headphone */}
      <rect x="232" y="120" width="48" height="80" rx="16" fill="#0066CC" />
      
      {/* Main face circle */}
      <circle cx="160" cy="180" r="112" fill="url(#gradient4)" />
      
      {/* Left cheek lines */}
      <line x1="90" y1="160" x2="110" y2="180" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      <line x1="95" y1="165" x2="115" y2="185" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="170" x2="120" y2="190" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      
      {/* Right cheek lines */}
      <line x1="230" y1="160" x2="210" y2="180" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      <line x1="225" y1="165" x2="205" y2="185" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      <line x1="220" y1="170" x2="200" y2="190" stroke="#0052A3" strokeWidth="2" strokeLinecap="round" />
      
      {/* Left eye */}
      <circle cx="128" cy="172" r="20" fill="#06B6D4" className="blinking-eye" />
      
      {/* Right eye */}
      <circle cx="192" cy="172" r="20" fill="#06B6D4" className="blinking-eye" />
      
      {/* Mouth */}
      <rect x="140" y="220" width="40" height="8" rx="4" fill="#06B6D4" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
