'use client';

const VideoBackground = () => {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-indigo-900/10 backdrop-blur-sm" />
    </div>
  );
};

export default VideoBackground; 