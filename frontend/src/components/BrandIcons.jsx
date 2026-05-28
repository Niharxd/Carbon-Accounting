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

export function GithubIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.55 1.04 1.55 1.04.9 1.54 2.36 1.1 2.93.84.09-.66.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.59 9.59 0 0 1 12 6.8c.85.004 1.71.11 2.51.32 1.9-1.3 2.74-1.03 2.74-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .27.18.59.69.49A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"
      />
    </svg>
  );
}

export function LinkedinIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5Z" />
      <path
        fill="currentColor"
        d="M24 24h-5.04V15.08c0-2.14-.04-4.9-2.99-4.9-2.99 0-3.45 2.34-3.45 4.76V24H8.52V9.5H13.2v2.01h.07c.65-1.24 2.24-2.54 4.61-2.54 4.93 0 5.84 3.24 5.84 7.45V24Z"
      />
      <path fill="currentColor" d="M5.01 9.5H0V24h5.01V9.5Z" opacity="0.9" />
    </svg>
  );
}

export function MailIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 7.5l7 5 7-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LeetCodeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3.5c-4.5 0-8.2 3.7-8.2 8.2 0 4.5 3.7 8.2 8.2 8.2 4.5 0 8.2-3.7 8.2-8.2 0-4.5-3.7-8.2-8.2-8.2Zm3.37 10.4-1.78-1.03c-.18-.1-.39.03-.39.23v2.91c0 .35-.28.63-.63.63-.35 0-.63-.28-.63-.63V12.8c0-.2-.21-.33-.39-.23l-1.78 1.03c-.32.19-.44.6-.26.91.19.32.6.44.91.26l2.17-1.25 2.17 1.25c.13.08.28.12.43.12.2 0 .39-.08.52-.24.18-.32.07-.72-.26-.91Z" fill="currentColor" />
    </svg>
  );
}
