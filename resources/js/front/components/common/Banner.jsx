export default function Banner({ children }) {
  return (
    <section className="bg-[#0d8fe8] text-white h-[560px] flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-6xl w-full px-6">
        {children}
      </div>
    </section>
  );
}