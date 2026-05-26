export function BrandLogo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" role="img">
      <defs>
        <linearGradient id="brand-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#brand-gradient)" />
      <path
        d="M19 38c0-8 7-15 13-15s13 6 13 14-7 15-13 15-13-6-13-14Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path
        d="M28 22.5c1.6-3 6.2-4 9.4-2 4.2 2.7 5.2 9.8 1.6 14.3-2.2 2.8-5.8 4.8-8.8 4.8-1.6 0-2.8-0.7-4-1.7"
        fill="none"
        stroke="rgba(16,185,129,0.95)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="24" r="4" fill="rgba(255,255,255,0.95)" />
    </svg>
  );
}

export function DashboardIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function AnalyticsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 16l5-5 4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="11" r="1.6" fill="currentColor" />
      <circle cx="13" cy="15" r="1.6" fill="currentColor" />
      <circle cx="19" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function LoginIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="7" y="10" width="10" height="7" rx="2" fill="currentColor" opacity="0.9" />
      <path d="M9 10V8a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 13h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SignupIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3" fill="currentColor" opacity="0.9" />
      <path d="M6 21c0-4 3-6 6-6s6 2 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 7v4M20 9h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function QuickNavIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3l4.5 9.5L12 8l-4.5 4.5L12 3z" fill="currentColor" opacity="0.9" />
      <path d="M5 18l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TotalIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4a8 8 0 0 1 8 8H12V4Z" fill="currentColor" opacity="0.12" />
      <path d="M12 12h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function AverageIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3c-3.75 3.5-5 6.5-5 8.5 0 3.75 2.25 6.25 5 7.5 2.75-1.25 5-3.75 5-7.5 0-2-1.25-5-5-8.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 12.5c0-1 1-2 2-2s2 1 2 2-1 1.75-2 1.75S10 13.5 10 12.5Z" fill="currentColor" />
      <path d="M7 7l2.5 1.5M17 7l-2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PeakIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3 18l5-7 4 5 6-9 3 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 5l2 3 3-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="4.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function RegionIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2" fill="currentColor" />
      <path d="M8 17s1.5-1 4-1 4 1 4 1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ModelIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="8" cy="7" r="2" fill="currentColor" />
      <circle cx="16" cy="7" r="2" fill="currentColor" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <path d="M8 9.5l4 3 4-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12.5l2 2.5 2-2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScoreIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 14a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14V8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10l1.5-1.5M16 10l-1.5-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}
