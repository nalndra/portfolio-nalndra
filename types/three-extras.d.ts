declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager, Group, Object3D } from 'three';
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (gltf: any) => void, onProgress?: (ev: ProgressEvent) => void, onError?: (ev: ErrorEvent) => void): void;
    parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: any) => void): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, MOUSE, TOUCH } from 'three';
  import { Renderer } from 'three';
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enabled: boolean;
    target: import('three').Vector3;
    enablePan: boolean;
    enableZoom: boolean;
    autoRotate: boolean;
    update(): void;
    dispose(): void;
    // ... minimal typing
  }
}
