import { MotionProps } from "framer-motion";

export type AnimVariants = {
  initial?: import("framer-motion").Variant;
  enter: import("framer-motion").Variant;
  exit?: import("framer-motion").Variant;
};

interface AnimProps extends MotionProps {
  variants: AnimVariants;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom?: any;
}

export const animate = ({ variants, custom, ...rest }: AnimProps) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    whileHover: "hover",
    whileInView: "view",
    viewport: {
      once: true,
    },
    custom,
    variants,
    ...rest,
  };
};
