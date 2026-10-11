export default function SectionHeader({ title, subtitle, tone = "default" }) {
  const color =
    tone === "up"
      ? "text-up"
      : tone === "down"
      ? "text-down"
      : "text-gray-900";

  return (
    <div className="mb-4 md:mb-5">
      <h2 className={`text-xl md:text-2xl font-bold ${color}`}>{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}