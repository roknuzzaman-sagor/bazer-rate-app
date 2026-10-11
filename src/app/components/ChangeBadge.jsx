import { toBn } from "@/lib/toBengali";

export default function ChangeBadge({ value, size = "sm" }) {
  const num = typeof value === "number" ? value : parseFloat(value) || 0;

  let label, cls;
  if (num > 0) {
    label = `▲ ${toBn(Math.abs(num).toFixed(1))}%`;
    cls = "bg-up-bg text-up";
  } else if (num < 0) {
    label = `▼ ${toBn(Math.abs(num).toFixed(1))}%`;
    cls = "bg-down-bg text-down";
  } else {
    label = "— ০.০%";
    cls = "bg-flat-bg text-flat";
  }

  const pad = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";
  return (
    <span className={`${cls} ${pad} rounded-md font-semibold whitespace-nowrap`}>
      {label}
    </span>
  );
}