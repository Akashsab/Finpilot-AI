import React from "react";
import InsightCard from "./InsightCard";

/**
 * Timeline component that renders a vertical line and a list of InsightCard items.
 * Props:
 *   - insights: array of objects with shape { id, type, title, description, actionText }
 */
export default function InsightTimeline({ insights }) {
  return (
    <ul className="relative border-l border-gray-700 pl-6 space-y-8">
      {insights.map((ins, idx) => (
        <li key={ins.id} className="flex flex-col">
          {/* The dot on the line */}
          <span className="absolute left-0 top-1 w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-300" />
          {/* Card content */}
          <div className="ml-4">
            <InsightCard
              type={ins.type}
              title={ins.title}
              description={ins.description}
              actionText={ins.actionText}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
