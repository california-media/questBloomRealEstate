import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  inView,
} from "framer-motion";

const ScrollRevealSection = () => {
  const sectionRef = useRef(null);
  const [isScrollHijacked, setIsScrollHijacked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Motion values for smooth animations
  const scrollY = useMotionValue(0);
  const progress = useMotionValue(0);

  // Check if section is in view
  const isInView = useInView(sectionRef, {
    amount: 1, // Section must be 100% in view
  });

  // Transform values based on progress
  const imageWidth = useTransform(progress, [0, 1], ["700px", "1800px"]);

  const textOpacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const progressBarHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let ticking = false;
    let startScrollY = 0;
    const scrollDistance = window.innerHeight * 1.5; // Distance to complete animation

    const handleScroll = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (isInView && !isScrollHijacked) {
            // Start hijacking when section comes into view
            setIsScrollHijacked(true);
            startScrollY = currentScrollY;
            document.body.style.overflow = "hidden";
          }

          if (isScrollHijacked) {
            const scrollDelta = currentScrollY - startScrollY;
            const newProgress = Math.max(
              0,
              Math.min(1, scrollDelta / scrollDistance)
            );

            setScrollProgress(newProgress);
            progress.set(newProgress);

            // Release hijack when animation is complete and user scrolls further
            if (newProgress >= 1 && scrollDelta > scrollDistance + 50) {
              setIsScrollHijacked(false);
              document.body.style.overflow = "auto";
              // Allow natural scrolling to continue
              window.scrollTo(0, currentScrollY);
            }

            // Allow scrolling up when at the beginning
            if (newProgress <= 0 && scrollDelta < -50) {
              setIsScrollHijacked(false);
              document.body.style.overflow = "auto";
            }
          }

          scrollY.set(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView, isScrollHijacked, progress, scrollY]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Add some content before the section for testing */}

      <section
        ref={sectionRef}
        className="scroll-reveal-section py-5"
        style={{ height: "80vh", position: "relative" }}
      >
        <div className="container-fluid h-100 d-flex align-items-center justify-content-center position-relative">
          {/* Left text */}
          <motion.div
            className="reveal-text-left"
            style={{
              position: "absolute",
              left: "15%",
            }}
          >
            <h3>
              <span className="highlight">50</span>
              <br />
              years of
              <br />
              INCREDIBLE
              <br />
              LEGACY
            </h3>
            <p>
              Building dreams and creating lasting impressions through
              innovative architecture and sustainable development.
            </p>
            <p>
              Our commitment to excellence spans five decades of transformative
              projects across multiple continents.
            </p>
          </motion.div>

          {/* Center image */}

          <motion.img
            style={{ width: imageWidth, height: "1000px", objectFit: "cover" }}
            src="/images/background/aboutus-cover.jfif"
            alt="Sobha Group Development"
            className="reveal-image "
          />

          {/* Right text */}
          <motion.div
            className="reveal-text-right"
            style={{ opacity: 1 - textOpacity, position: "absolute", right: "15%" }}
          >
            <h3>
              Founded in <span className="highlight">1976</span>
              <br />
              by visionary
              <br />
              entrepreneur
              <br />
              <span className="highlight">P.N.C Menon</span>
            </h3>
            <p>
              A multinational, multi-product group with developments and
              investments in the UAE, India, and UK.
            </p>
            <p>
              From humble beginnings to becoming a global leader in luxury real
              estate and construction.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ScrollRevealSection;
