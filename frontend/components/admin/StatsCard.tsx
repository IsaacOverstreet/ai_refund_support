type StatCardProps = {
  label: string;
  value: number;
  color: string;
  bg: string;
};

export default function StatCard({ label, value, color, bg }: StatCardProps) {
  return (
    <div className={`${bg} rounded-lg border border-slate-200 px-4 py-3`}>
      <p className="text-xs text-slate-500 font-medium">{label}</p>

      <p className={`text-2xl font-bold ${color} mt-0.5`}>{value}</p>
    </div>
  );
}
