"use client";

import React, { Suspense, lazy } from "react";

// Lazy-load the actual viewer so the heavy three.js + drei code only runs on the client
const LazyViewer = lazy(() => import("./ModelViewer"));

export default function ModelViewerClient() {
  return (
    <Suspense fallback={null}>
      <LazyViewer />
    </Suspense>
  );
}
