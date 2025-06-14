import { useRef, useEffect, useState, useMemo } from 'react';
import ReviewCard from './ReviewCard';

interface Review {
  name: string;
  business: string;
  rating: number;
  content: string;
  image: string | null;
  id?: string;
  createdAt?: string;
}

interface ReviewSliderProps {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const initialSetupDoneRef = useRef(false); // For tracking initial scroll setup

  const MAX_REVIEWS = 10;
  const displayReviews = useMemo(() => {
    // console.log('[ReviewSlider] Recalculating displayReviews via useMemo');
    return [...reviews]
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, MAX_REVIEWS);
  }, [reviews]);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement || displayReviews.length === 0) return;

    const numReviews = displayReviews.length;
    const CARD_WIDTH = 350; // px, from w-[350px]
    const GAP = 24; // px, from gap-6 (1.5rem, assuming 1rem = 16px)
    const ITEM_EFFECTIVE_WIDTH = CARD_WIDTH + GAP;
    
    const SCROLL_STEP = 1; // 프레임당 스크롤 픽셀
    // console.log('[ReviewSlider] useEffect run. displayReviews count:', displayReviews.length);

    if (!initialSetupDoneRef.current) {
      sliderElement.style.scrollBehavior = 'auto';
      sliderElement.scrollLeft = 0; // Start from the beginning
      initialSetupDoneRef.current = true;
      // console.log('[ReviewSlider] Initial scrollLeft set to: 0 and initialSetupDoneRef.current = true');
    }
    
    const rAfIdForInitialSmooth = requestAnimationFrame(() => {
      if (sliderElement && !isPaused) { // !isPaused 조건 추가
        sliderElement.style.scrollBehavior = 'smooth';
        console.log('[ReviewSlider] Initial scrollBehavior set to smooth.');
      }
    });

    let animationFrameId: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!sliderElement) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (isPaused) {
        if (sliderElement.style.scrollBehavior !== 'auto') {
          sliderElement.style.scrollBehavior = 'auto';
          console.log('[ReviewSlider] Paused. scrollBehavior set to auto.');
        }
        // 현재 스크롤 위치를 강제로 다시 설정하여 진행 중인 smooth scroll을 중단
        sliderElement.scrollLeft = sliderElement.scrollLeft;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // 일시정지에서 해제되었거나 점프 후 애니메이션 재개 시 smooth 보장
      if (sliderElement.style.scrollBehavior !== 'smooth') {
        sliderElement.style.scrollBehavior = 'smooth';
        console.log('[ReviewSlider] Resuming/Continuing. scrollBehavior set to smooth.');
      }

      // FPS 조절 (약 60FPS)
      if (timestamp - lastTimestamp < 16) { 
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTimestamp = timestamp; // FPS 조절 후 lastTimestamp 업데이트

      // console.log(`[ReviewSlider] Animating. scrollLeft: ${sliderElement.scrollLeft}, isPaused: ${isPaused}`);
      const currentScrollLeft = sliderElement.scrollLeft;

      // Check if scrolled to the end
      // Add a small tolerance (e.g., 1 or SCROLL_STEP) to prevent floating point issues
      if (sliderElement.scrollLeft + sliderElement.clientWidth >= sliderElement.scrollWidth - SCROLL_STEP) {
        // console.log('[ReviewSlider] Reached end of content. Stopping animation.');
        // Optionally, snap to the very end if not perfectly aligned
        sliderElement.scrollLeft = sliderElement.scrollWidth - sliderElement.clientWidth;
        cancelAnimationFrame(animationFrameId); // Stop animation
        return;
      } else {
        sliderElement.scrollLeft += SCROLL_STEP;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (rAfIdForInitialSmooth) cancelAnimationFrame(rAfIdForInitialSmooth);
    };
  }, [isPaused, displayReviews]);

  // Reset initialSetupDoneRef when displayReviews changes, so initial scroll position is re-applied
  useEffect(() => {
    initialSetupDoneRef.current = false;
    // console.log('[ReviewSlider] displayReviews changed (useEffect), initialSetupDoneRef.current set to false');
  }, [displayReviews]);

  if (displayReviews.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        ref={sliderRef}
        className="flex overflow-x-hidden"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-6 pr-6">
          {/* 원본 리뷰들 */}
          {displayReviews.map((review, index) => (
            <div 
              key={`${review.id || review.name}-${index}`}
              className="flex-none w-[350px]"
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 