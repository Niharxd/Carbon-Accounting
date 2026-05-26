export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 glass p-16 text-center space-y-4">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400 text-base max-w-sm mx-auto">{message}</p>
      {action && <div className="pt-4">{action}</div>}
    </div>
  );
}
