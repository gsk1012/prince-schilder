import { useEffect, useRef } from 'react';

const REVERSE_SPEED = 1.0; // seconds per second in reverse

export default function VideoLoop({ src, poster, style }) {
  const videoRef = useRef(null);
  const dirRef = useRef(1);
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent browser from stopping at end
    const onEnded = () => {
      dirRef.current = -1;
      lastTimestampRef.current = null;
    };
    video.addEventListener('ended', onEnded);

    video.play().catch(() => {});

    function tick(ts) {
      rafRef.current = requestAnimationFrame(tick);

      if (dirRef.current === 1) {
        // Forward — browser plays normally, nothing to do
        return;
      }

      // Reverse — manually scrub backward
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = ts;
        return;
      }

      const delta = (ts - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = ts;

      if (!video.duration || video.duration === Infinity) return;

      const next = video.currentTime - delta * REVERSE_SPEED;
      if (next <= 0) {
        video.currentTime = 0;
        dirRef.current = 1;
        lastTimestampRef.current = null;
        video.play().catch(() => {});
      } else {
        video.currentTime = next;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      poster={poster}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
