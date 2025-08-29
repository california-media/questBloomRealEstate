import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  inView,
} from "framer-motion";

const ScrollRevealSectionMobile = ({ sections }) => {
  const sectionRef = useRef(null);
  const [isScrollHijacked, setIsScrollHijacked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Motion values for smooth animations
  const scrollY = useMotionValue(0);
  const progress = useMotionValue(0);

  // Check if section is in view
  // 1. Fully in view
  const fullyInView = useInView(sectionRef, { amount: 1 });

  // 2. Any part in view (we’ll refine to bottom check manually below)
  const partlyInView = useInView(sectionRef, { amount: 0 });

  // Combine
  const isInView = fullyInView || partlyInView;

  // Transform values based on progress
  const imageWidth = useTransform(
    progress,
    [0, 0.5, 1],
    ["400px", "700px", "1600px"]
  );

  useEffect(() => {
    let ticking = false;
    let startScrollY = 0;
    const scrollDistance = window.innerHeight; // Distance to complete animation

    const handleScroll = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (isInView && !isScrollHijacked) {
            // Start hijacking when section comes into view
            setIsScrollHijacked(true);
            startScrollY = currentScrollY;
            // document.body.style.overflow = "hidden";
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
        className="scroll-reveal-section pb-0 pt20 d-block d-lg-none"
        style={{ position: "relative" }}
      >
        <div className="container-fluid bg-dnger  h-100 p-0 d-flex align-items-center justify-content-center position-relative">
          {/* Left text */}
          <motion.div
            className="reveal-text-left"
            dangerouslySetInnerHTML={{
              __html:
                sections.find(
                  (section) =>
                    section.section_name === `About Us Main Left Text`
                )?.html_content ||
                `<h3>
              <span class="highlight">Luxury</span>
              <br />
              Living
              <br />
              Redefined
            </h3>
            <p>
              Questbloom Real Estate sets a new standard of sophistication in
              Dubai’s property market.
            </p>
            <p>
              From waterfront villas to skyline apartments, we deliver homes
              that match your lifestyle and aspirations.
            </p>`,
            }}
          ></motion.div>

          {/* Center image */}

          <motion.img
            style={{ height: "1100px", width: "800px", objectFit: "cover" }}
            src={
              sections.find(
                (section) => section.section_name === `About Us Main Image`
              )?.html_content || "/images/background/aboutus-cover.jfif"
            }
            alt="Sobha Group Development"
            className="reveal-image "
          />

          {/* Right text */}
          <motion.div
            className="reveal-text-right mb-5"
            dangerouslySetInnerHTML={{
              __html:
                sections.find(
                  (section) =>
                    section.section_name === `About Us Main Right Text`
                )?.html_content ||
                `  <h3>
              Built on
              <br />
              <span class="highlight">Trust</span>
              <br />
              and Integrity
            </h3>
            <p>
              More than agents, we are your partners, committed to guiding you
              with expertise and care.
            </p>
            <p>
              Seamless journeys, lasting relationships, and exceptional results.
            </p>`,
            }}
          ></motion.div>
        </div>
      </section>
    </>
  );
};

export default ScrollRevealSectionMobile;
