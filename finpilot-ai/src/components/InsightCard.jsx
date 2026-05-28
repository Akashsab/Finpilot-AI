import React from "react";
import { ArrowRight, AlertCircle, Info, CheckCircle } from "lucide-react";

/**
 * Reusable card for an insight entry.
 * Props:
 *   - type: "warning" | "info" | "success"
 *   - title: string
 *   - description: string
 *   - actionText?: string (optional button label)
 */
export default function InsightCard({ type, title, description, actionText }) {
  const typeMap = {
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-amber-400" />, // warning icon
      bg: "bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700",
      border: "border-amber-400",
    },
    info: {
      icon: <Info className="w-6 h-6 text-sky-400" />, // info icon
      bg: "bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700",
      border: "border-sky-400",
    },
    success: {
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />, // success icon
      bg: "bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700",
      border: "border-emerald-400",
    },
  };

  const { icon, bg, border } = typeMap[type] || typeMap.info;

  return (
    <div
      className={`${bg} border ${border} rounded-xl p-5 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1`}
    >
      <div className="flex items-start space-x-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-200 mb-4">{description}</p>
      {actionText && (
        <button
          className="flex items-center space-x-1 text-sm font-medium text-white hover:text-gray-100 transition-colors"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
