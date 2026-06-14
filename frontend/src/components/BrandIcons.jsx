export function BrandLogo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" role="img">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="globe-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Dark rounded background */}
      <rect width="64" height="64" rx="16" fill="url(#bg-grad)" />

      {/* Globe ring — horizontal equator */}
      <ellipse cx="32" cy="38" rx="17" ry="17" fill="none" stroke="url(#globe-grad)" strokeWidth="2.2" opacity="0.9" />
      {/* Latitude line */}
      <ellipse cx="32" cy="38" rx="10" ry="17" fill="none" stroke="url(#globe-grad)" strokeWidth="1.4" opacity="0.5" />
      {/* Equator line */}
      <line x1="15" y1="38" x2="49" y2="38" stroke="url(#globe-grad)" strokeWidth="1.4" opacity="0.5" />

      {/* Leaf sprout growing from top of globe */}
      {/* Stem */}
      <path
        d="M32 38 Q32 28 32 22"
        fill="none"
        stroke="#34d399"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M32 28 Q24 24 22 18 Q28 17 32 22 Z"
        fill="url(#leaf-grad)"
        opacity="0.95"
      />
      {/* Right leaf */}
      <path
        d="M32 25 Q40 21 42 15 Q36 15 32 20 Z"
        fill="url(#leaf-grad)"
        opacity="0.8"
      />
    </svg>
  );
}

/* ── Sidebar nav icons ─────────────────────────────────────────────────────── */

export function DashboardIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function AnalyticsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Simulator — beakers / flask shape suggesting experimentation */
export function SimulatorIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M9 3h6M9 3v7.5L5.5 17A2 2 0 0 0 7.3 20h9.4a2 2 0 0 0 1.8-3L15 10.5V3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 15.5h11" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* History — clock with arrow */
export function HistoryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="3 3 3 8 8 8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="12 7 12 12 15 15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Reports — document with lines */
export function ReportsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="13" x2="16" y2="13" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* Settings — gear */
export function SettingsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Login — arrow into a door */
export function LoginIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="10 17 15 12 10 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="12" x2="3" y2="12" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* Signup — person with plus */
export function SignupIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeWidth="1.8" />
      <line x1="19" y1="8" x2="19" y2="14" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="22" y1="11" x2="16" y2="11" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ── Metric card icons ──────────────────────────────────────────────────────── */

export function ScoreIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function TotalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="2" y="3" width="6" height="18" rx="1.5" strokeWidth="1.8" />
      <rect x="9" y="8" width="6" height="13" rx="1.5" strokeWidth="1.8" />
      <rect x="16" y="13" width="6" height="8" rx="1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function AverageIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="4 6 8 6 12 4 16 8 20 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="4 18 8 18 12 20 16 16 20 18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PeakIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 6 23 6 23 12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RegionIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
      <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1.8" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="1.8" />
    </svg>
  );
}

export function ModelIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Social / misc ─────────────────────────────────────────────────────────── */

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
      <path fill="currentColor" d="M24 24h-5.04V15.08c0-2.14-.04-4.9-2.99-4.9-2.99 0-3.45 2.34-3.45 4.76V24H8.52V9.5H13.2v2.01h.07c.65-1.24 2.24-2.54 4.61-2.54 4.93 0 5.84 3.24 5.84 7.45V24Z" />
      <path fill="currentColor" d="M5.01 9.5H0V24h5.01V9.5Z" opacity="0.9" />
    </svg>
  );
}

export function MailIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.8" />
      <polyline points="22 6 12 13 2 6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function LeetCodeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.905 6.22a1.08 1.08 0 0 0-1.42.38l-2.11 3.09-2.79-.9a1.08 1.08 0 0 0-1.32.72 1.08 1.08 0 0 0 .72 1.32l3.26 1.05a1.08 1.08 0 0 0 1.3-.44l2.45-3.6a1.08 1.08 0 0 0-.52-1.67Zm-6 6.94a1.08 1.08 0 0 0-1.08 1.08v3.44a1.08 1.08 0 0 0 2.16 0v-3.44a1.08 1.08 0 0 0-1.08-1.08Zm3.74.28a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16Z"
      />
    </svg>
  );
}
