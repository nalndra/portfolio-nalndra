"use client";

import { RefObject, useEffect, useState } from "react";

type Opts = { rotationFactor?: number };

export default function useMouseFollow(containerRef: RefObject<HTMLElement | null>, opts: Opts = { rotationFactor: 0.6 }) {
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = (containerRef && containerRef.current) || document.body;

    function onMove(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width; // 0..1
      const y = (e.clientY - r.top) / r.height;
      // center to -0.5..0.5 then scale
      const rx = (y - 0.5) * -1 * (opts.rotationFactor ?? 0.6);
      const ry = (x - 0.5) * (opts.rotationFactor ?? 0.6);
      setTarget({ x: rx, y: ry });
    }

    function onLeave() {
      setTarget({ x: 0, y: 0 });
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, opts.rotationFactor]);

  return target;
}
