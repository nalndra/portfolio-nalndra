// Minimal declarations so TypeScript accepts react-three/fiber JSX elements used in the app.
// This file is intentionally lightweight — it declares common three/fiber tags as `any`.

export {};

declare global {
  namespace JSX {
    interface IntrinsicElements extends Record<string, any> {
      // common three/fiber elements used in the project
      group: any;
      primitive: any;
      mesh: any;
      perspectiveCamera: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}
