export default function SolaraCard() {
  return (
    <div
      className="relative h-[168px] w-[268px] overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
      style={{
        background:
          "linear-gradient(145deg, #2a5a48 0%, #1a3d30 42%, #0f241c 100%)",
      }}
      aria-hidden="true"
    >
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#5b8cff]/35 blur-2xl" />
      <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[#7c5cff]/30 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8.5 9.5L12 7.5l3.5 2v5L12 16.5 8.5 14.5v-5z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <span className="text-sm font-medium tracking-wide">solara</span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className="h-1.5 w-7 rounded-full bg-white/70"
              />
            ))}
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xs tracking-[0.18em] text-white/70">
              PREMIUM
            </span>
            <span className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider">
              VISA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
