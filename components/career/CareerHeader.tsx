export default function CareerHeader() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 bg-white">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-navy uppercase bg-slate-100 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Faculty Positions Active
        </span>
        
        <h1
          className="
          mt-6
          text-4xl md:text-6xl
          font-bold
          leading-[1.12]
          tracking-[-0.03em]
          text-navy
          "
        >
          Join Healora Team
          <span className="block text-slate-700 font-medium text-3xl md:text-5xl mt-2">
            Build the Future of Healthcare
          </span>
        </h1>

        <p
          className="
          mt-6
          text-base md:text-lg
          text-slate-500
          max-w-2xl
          mx-auto
          leading-relaxed
          "
        >
          We are evaluating passionate medical professionals who believe in hybrid clinical workflows, 
          preventative digital diagnostics, and modern telemedicine ecosystems.
        </p>
      </div>
    </section>
  );
}