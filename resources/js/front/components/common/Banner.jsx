export default function Banner({ children, imageUrl = null, title = null, subtitle = null }) {
  return (
    <section className="bg-[#0d8fe8] text-white h-[560px] flex items-center justify-center relative overflow-hidden">
      {/* Background image with blue gradient overlay */}
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d8fe8]/80 via-[#0d8fe8]/30 to-[#0d8fe8]/10" />
        </>
      )}

      <div className="relative z-10 max-w-6xl w-full px-6">
        {/* If title/subtitle are passed directly (from siteInfo), render them */}
        {(title || subtitle) ? (
          <div>
            {title && (
              <h1 className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-1px]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-white/90">
                {subtitle}
              </p>
            )}
          </div>
        ) : (
          // Otherwise render children (existing pages that pass their own markup)
          children
        )}
      </div>
    </section>
  );
}
