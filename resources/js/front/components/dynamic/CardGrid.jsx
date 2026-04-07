import React from 'react';
import Card from './Card';

export default function CardGrid({
  title,
  subtitle,
  items,
  columns = 3, // Default to 3, but allow override
  className = ""
}) {
  // Map column numbers to Tailwind classes
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section className={`py-16 px-6 max-w-[1600px] mx-auto ${className}`}>
      {(title || subtitle) && (
        <div className="mb-10">
          {subtitle && (
            <p className="text-[#0d8fe8] font-extrabold uppercase tracking-wider text-sm mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className={`grid gap-6 ${gridCols[columns] || gridCols[3]}`}>
        {items.map((card, index) => (
          <Card key={index} {...card}/>
        ))}
      </div>
    </section>
  );
}
