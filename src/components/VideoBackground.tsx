export default function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[1]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 