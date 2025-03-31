import { ChevronDown, ChevronUp } from "lucide-react";

export default function SortChevrons({ isVisible, dir, className }) {
  return (
    <div
      className={`group-hover:opacity-100 transition-all duration-100 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <ChevronUp
        size={14}
        className={`${isVisible && dir === "asc" ? "text-white" : ""}`}
      />
      <ChevronDown
        size={14}
        className={`-mt-1.5 ${isVisible && dir === "desc" ? "text-white" : ""}`}
      />
    </div>
  );
}
