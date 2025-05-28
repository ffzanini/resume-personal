"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn, animate } from "@/lib/utils";
import { contentAnim } from "@/constants/animations";

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      onExitComplete={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <motion.section
        className={cn(`2xl:pt-12 pt-16 container grow`)}
        {...animate({
          variants: contentAnim,
        })}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
