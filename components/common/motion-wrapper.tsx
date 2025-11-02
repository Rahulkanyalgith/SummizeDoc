"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { FC } from "react";

export const MotionDiv: FC<HTMLMotionProps<"div">> = motion.div;
export const MotionSection: FC<HTMLMotionProps<"section">> = motion.section;
export const MotionH1: FC<HTMLMotionProps<"h1">> = motion.h1;
export const MotionH2: FC<HTMLMotionProps<"h2">> = motion.h2;
export const MotionH3: FC<HTMLMotionProps<"h3">> = motion.h3;
export const MotionP: FC<HTMLMotionProps<"p">> = motion.p;
export const MotionSpan: FC<HTMLMotionProps<"span">> = motion.span;
export const MotionImg: FC<HTMLMotionProps<"img">> = motion.img;
export const MotionButton: FC<HTMLMotionProps<"button">> = motion.button;
