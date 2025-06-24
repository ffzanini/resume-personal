"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Tooltip } from "@/components";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollY.set(0);
  }, [pathname, scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          className="fixed bottom-4 right-4 p-2 cursor-pointer z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ y: -8 }}
          onClick={goTop}
        >
          <Tooltip text="Back to top" position="top">
            <Image
              src="/images/point_up.svg"
              width={36}
              height={36}
              alt="point up"
              loading="lazy"
              className="z-40"
            />
          </Tooltip>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
