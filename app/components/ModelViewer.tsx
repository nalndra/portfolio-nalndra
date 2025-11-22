"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Plain THREE.js Model Viewer (client-only)
// - Loads GLB from public/3d-assets
// - Reacts to pointer movement with smoothing/delay
// - Uses OrbitControls for optional manual interaction
// - Optimized with loading states and reduced rendering

export default function ModelViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroPermissionGranted, setGyroPermissionGranted] = useState(false);
  const requestGyroRef = useRef<(() => void) | undefined>(undefined);

  // Separate effect for mobile detection
  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobile(checkIsMobile());
    
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Check if mobile - computed locally
    const checkIsMobile = () => window.innerWidth < 768;
    const isMobile = checkIsMobile();

    const scene = new THREE.Scene();
    scene.background = null; // transparent for overlay
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Adaptive camera and model settings based on screen size
    const getFOV = () => {
      if (isMobile) {
        return width < 480 ? 55 : 50; // Wider FOV for small mobile
      }
      return 45; // Default for desktop
    };

    const getCameraPosition = () => {
      if (isMobile) {
        return { x: 0, y: width < 480 ? 1.5 : 1.2, z: 0 };
      }
      return { x: 0, y: 1, z: 0 };
    };

    const getModelPosition = () => {
      if (isMobile) {
        return { x: 0, y: width < 480 ? -0.8 : -0.7, z: 0 };
      }
      return { x: 0, y: -0.6, z: 0 };
    };

    const getModelScale = () => {
      if (isMobile) {
        if (width < 480) return 1.5; // Small phones
        if (width < 640) return 1.7; // Medium phones
        return 1.8; // Large phones/small tablets
      }
      if (width < 1024) return 2.2; // Tablets
      if (width < 1440) return 2.5; // Small desktops
      return 2.8; // Large desktops
    };

    const cameraPos = getCameraPosition();
    const camera = new THREE.PerspectiveCamera(getFOV(), width / height, 0.1, 1000);
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      stencil: false, // Disable stencil buffer
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)); // Reduce pixel ratio
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    rendererRef.current = renderer;

    // lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(10, 10, 10);
    scene.add(dir);

    // orbit controls - DISABLED for background mode
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.enableZoom = false; // disable zoom
    controls.enabled = false; // fully disable controls
    controls.autoRotate = false;
    controlsRef.current = controls;

    // track pointer and target rotation
    let targetX = 0;
    let targetY = 0;
    let lastPointerUpdateTime = 0;
    const POINTER_THROTTLE_MS = 16; // ~60fps throttle

    function onPointerMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastPointerUpdateTime < POINTER_THROTTLE_MS) return;
      lastPointerUpdateTime = now;

      // Use viewport coordinates for whole-page tracking
      const x = e.clientX / window.innerWidth; // 0..1
      const y = e.clientY / window.innerHeight;
      // center and scale - reduced factor for subtle movement (even more subtle on mobile)
      const factor = isMobile ? 0.3 : 0.5;
      targetX = (y - 0.5) * -factor; // tilt factor (x rotation)
      targetY = (x - 0.5) * factor; // yaw factor (y rotation)
    }

    function onPointerLeave() {
      targetX = 0;
      targetY = 0;
    }

    // Listen on window for full-page cursor tracking with passive flag
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Gyroscope support for mobile
    let gyroEnabled = false;
    let gyroHandler: ((event: DeviceOrientationEvent) => void) | null = null;

    function enableGyro() {
      if (gyroEnabled) return;
      gyroEnabled = true;
      setGyroPermissionGranted(true);

      gyroHandler = (event) => {
        if (event.beta == null || event.gamma == null) return;

        const tiltX = THREE.MathUtils.degToRad(event.beta);
        const tiltY = THREE.MathUtils.degToRad(event.gamma);

        const sensitivity = 0.02;

        targetX = tiltX * sensitivity;
        targetY = -tiltY * sensitivity;
      };

      window.addEventListener("deviceorientation", gyroHandler);
    }

    // iOS butuh permission manual
    function requestGyroPermission() {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((state: any) => {
            if (state === "granted") {
              enableGyro();
            }
          })
          .catch(console.error);
      } else {
        enableGyro();
      }
    }

    requestGyroRef.current = requestGyroPermission;    // load model with loading states
    setIsLoading(true);
    setHasError(false);
    const loader = new GLTFLoader();
    loader.load(
      "/3d-assets/submerged_era.glb",
      (gltf: any) => {
        const root: THREE.Object3D = gltf.scene || (gltf.scenes && gltf.scenes[0]);
        if (!root) return;
        root.traverse((c: any) => {
          // disable shadows for performance - lighter rendering
          if (c.isMesh) {
            c.castShadow = false;
            c.receiveShadow = false;
            // Optimize materials for performance
            if (c.material) {
              c.material.needsUpdate = false;
            }
          }
        });
        const modelPos = getModelPosition();
        root.position.set(modelPos.x, modelPos.y, modelPos.z);
        // Adjust scale based on screen size
        root.scale.setScalar(getModelScale());
        scene.add(root);
        modelRef.current = root;
        setIsLoading(false);
      },
      (progress: any) => {
        // Optional: handle loading progress
        if (progress.total > 0) {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        }
      },
      (err: any) => {
        console.error("GLTF load error", err);
        setHasError(true);
        setIsLoading(false);
      }
    );

    // handle resize with debounce for performance
    let resizeTimeout: NodeJS.Timeout;
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight || 480;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        
        // Update mobile status and model scale/position on resize
        const isMobileNow = checkIsMobile();
        
        // Update camera FOV and position
        const newFOV = isMobileNow ? (w < 480 ? 55 : 50) : 45;
        if (camera.fov !== newFOV) {
          camera.fov = newFOV;
          camera.updateProjectionMatrix();
        }
        
        const cameraPos = getCameraPosition();
        camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
        
        // Update model scale and position
        if (modelRef.current) {
          const newScale = getModelScale();
          modelRef.current.scale.setScalar(newScale);
          
          const modelPos = getModelPosition();
          modelRef.current.position.set(modelPos.x, modelPos.y, modelPos.z);
        }
      }, 100); // debounce 100ms
    }
    window.addEventListener("resize", onResize, { passive: true });

    // animation loop with smoothing and FPS throttling
    let lastTime = performance.now();
    let fpsInterval = 1000 / 30; // Target 30 FPS for better performance
    let lastFrameTime = performance.now();
    
    function animate(now = performance.now()) {
      // FPS throttling - only render if enough time has passed
      const elapsed = now - lastFrameTime;
      
      if (elapsed < fpsInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = now - (elapsed % fpsInterval);
      
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // smooth model rotation toward target
      const model = modelRef.current;
      if (model) {
        const curX = model.rotation.x;
        const curY = model.rotation.y;
        const t = 1 - Math.exp(-6 * dt); // smoothing factor
        model.rotation.x = THREE.MathUtils.lerp(curX, targetX, t);
        model.rotation.y = THREE.MathUtils.lerp(curY, targetY, t);
      }

      if (renderer && camera && scene) {
        renderer.render(scene, camera);
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (gyroHandler) {
        window.removeEventListener("deviceorientation", gyroHandler);
      }
      window.removeEventListener("resize", onResize);
      
      // dispose controls
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      // dispose geometries and materials before disposing renderer
      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.geometry?.dispose?.();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material?.dispose?.();
            }
          }
        });
      }
      
      // dispose renderer - just dispose resources, React handles canvas removal
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Show loading state or error
  if (hasError) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        <div className="text-white/60 text-sm">Failed to load 3D model</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
      <canvas ref={canvasRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="text-white/60 text-sm">Loading 3D model...</div>
        </div>
      )}
      {isMobile && !gyroPermissionGranted && (
        <div className="absolute bottom-4 right-4 animate-spin-slow">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-white/40 blur-sm animate-pulse"></div>
            <button
              onClick={() => requestGyroRef.current?.()}
              className="relative bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              Enable Gyroscope
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
