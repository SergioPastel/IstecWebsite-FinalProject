import React from 'react';

/**
 * A reusable Card component that supports:
 * - Badges (with dynamic colors)
 * - Custom Hover states
 * - Title, Subtitle/Date, Description
 * - Footer Link/Action
 */
export default function Card({
  title,
  description,
  subtitle,
  badge,
  badgeClass = "",
  hoverClass = "",
  linkText,
  linkClass = "",
  href = "#",
  icon, // Optional: for the Application Steps (1, 2, 3)
  children // For any unique content
}) {
  return (
    <div
      className={`min-h-full bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${hoverClass}`}
    >
      {/* Badge or Step Number */}
      {badge && (
        <span className={`inline-flex self-start items-center px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${badgeClass}`}>
          {badge}
        </span>
      )}

      {/* Icon (e.g., the step number 1, 2, 3) */}
      {icon && (
        <div className="w-[42px] h-[42px] rounded-full bg-white text-[#0d8fe8] inline-flex items-center justify-center font-extrabold mb-4 shadow-[0_8px_20px_rgba(255,255,255,0.18)]">
          {icon}
        </div>
      )}

      <h3 className="mt-[14px] mb-[10px] text-[1.2rem] leading-[1.3] font-semibold">
        {title}
      </h3>

      {subtitle && (
        <p className="mb-3 text-[0.95rem] font-bold text-[#4b5563]">
          {subtitle}
        </p>
      )}

      <p className="m-0 text-[#6b7280] leading-[1.7]">
        {description}
      </p>

      {/* Extra custom content */}
      {children}

      {linkText && (
        <a
          href={href}
          className={`inline-block mt-auto pt-4 font-bold hover:underline ${linkClass}`}
        >
          {linkText}
        </a>
      )}
    </div>
  );
}
