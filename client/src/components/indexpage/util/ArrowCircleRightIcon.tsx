"use client"

import { ArrowCircleRight } from "@phosphor-icons/react"
import React from "react"

type ArrowCircleRightIconProps = {
  weight: "fill" | "duotone" | "light" | "thin" | "regular" | "bold" | undefined
  size: number
  className?: string
}

const ArrowCircleRightIcon: React.FC<ArrowCircleRightIconProps> = ({ weight, size, className="" }) => {
  return <ArrowCircleRight
    weight={!weight ? "fill" : weight}
    size={size}
    className={className} />
}

export default ArrowCircleRightIcon