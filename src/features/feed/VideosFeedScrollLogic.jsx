import { useEffect, useRef } from "react";

export default function useFeedSnapScroll() {
  const feedContainerRef = useRef(null);

  useEffect(() => {
    const feedContainer = feedContainerRef.current;
    if (!feedContainer) return;
    const feedItems = feedContainer.querySelectorAll(".feed-item");
    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;
    let touchStartY = 0;
    let touchEndY = 0;

    // Function to scroll to specific item
    function scrollToItem(index) {
      const item = feedItems[index];
      if (item) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        currentIndex = index;
      }
    }

    // Wheel event
    const onWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      if (e.deltaY > 0 && currentIndex < feedItems.length - 1) {
        currentIndex++;
        scrollToItem(currentIndex);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
        scrollToItem(currentIndex);
      }
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    // Touch events
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    };
    function handleSwipe() {
      if (isScrolling) return;
      const swipeThreshold = 50;
      const swipeDistance = touchStartY - touchEndY;
      if (Math.abs(swipeDistance) < swipeThreshold) return;
      isScrolling = true;
      if (swipeDistance > 0 && currentIndex < feedItems.length - 1) {
        currentIndex++;
        scrollToItem(currentIndex);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        currentIndex--;
        scrollToItem(currentIndex);
      }
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }

    // Keyboard navigation
    const onKeyDown = (e) => {
      if (isScrolling) return;
      if (e.key === "ArrowDown" && currentIndex < feedItems.length - 1) {
        e.preventDefault();
        isScrolling = true;
        currentIndex++;
        scrollToItem(currentIndex);
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        isScrolling = true;
        currentIndex--;
        scrollToItem(currentIndex);
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    // Intersection Observer
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(feedItems).indexOf(entry.target);
            if (index !== -1) {
              currentIndex = index;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    feedItems.forEach((item) => observer.observe(item));

    // Prevent default scroll behavior
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPosition = feedContainer.scrollTop;
        const itemHeight = window.innerHeight;
        const nearestIndex = Math.round(scrollPosition / itemHeight);
        if (nearestIndex !== currentIndex) {
          currentIndex = nearestIndex;
          scrollToItem(currentIndex);
        }
      }, 100);
    };

    feedContainer.addEventListener("wheel", onWheel, { passive: false });
    feedContainer.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    feedContainer.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("keydown", onKeyDown, { passive: false });
    feedContainer.addEventListener("scroll", onScroll, { passive: false });

    return () => {
      feedContainer.removeEventListener("wheel", onWheel);
      feedContainer.removeEventListener("touchstart", onTouchStart);
      feedContainer.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKeyDown);
      feedContainer.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return feedContainerRef;
}
