"use client";

import React, { useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Program,
  Mesh,
  Texture,
  type OGLRenderingContext,
} from "ogl";

type GL = OGLRenderingContext;
type OGLProgram = Program;
type OGLMesh = Mesh;
type OGLTransform = Transform;
type OGLPlane = Plane;

interface ScreenSize {
  width: number;
  height: number;
}

interface ViewportSize {
  width: number;
  height: number;
}

interface ScrollState {
  ease: number;
  current: number;
  target: number;
}

interface AutoBindOptions {
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
}

interface MediaParams {
  gl: GL;
  geometry: OGLPlane;
  scene: OGLTransform;
  screen: ScreenSize;
  viewport: ViewportSize;
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;
}

interface CanvasParams {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scrollEase: number;
  cameraFov: number;
  cameraZ: number;
}

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;

varying vec2 vUv;

float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,          oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                               0.0,                                 0.0,                                 1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float qinticInOut(float t) {
  return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;

  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm / 2.0) / norm;

  float localprogress = clamp(
    (fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1.0 - 0.01 * uDistortion),
    0.0,
    2.0
  );

  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;

  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;

  vec2 scale = vec2(1.0, 1.0);

  if (planeAspect > imageAspect) {
    scale.x = imageAspect / planeAspect;
  } else {
    scale.y = planeAspect / imageAspect;
  }

  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;
  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self: any, { include, exclude }: AutoBindOptions = {}) {
  const getAllProperties = (object: any): Set<[any, string | symbol]> => {
    const properties = new Set<[any, string | symbol]>();
    do {
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while (
      (object = Reflect.getPrototypeOf(object)) &&
      object !== Object.prototype
    );

    return properties;
  };

  const filter = (key: string | symbol) => {
    const match = (pattern: string | RegExp) =>
      typeof pattern === "string"
        ? key === pattern
        : (pattern as RegExp).test(key.toString());

    if (include) return include.some(match);
    if (exclude) return !exclude.some(match);
    return true;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === "constructor" || !filter(key)) continue;

    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === "function") {
      self[key] = self[key].bind(self);
    }
  }

  return self;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function map(
  num: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number,
  round = false
) {
  const num1 = (num - min1) / (max1 - min1);
  const num2 = num1 * (max2 - min2) + min2;
  return round ? Math.round(num2) : num2;
}

class Media {
  gl: GL;
  geometry: OGLPlane;
  scene: OGLTransform;
  screen: ScreenSize;
  viewport: ViewportSize;
  image: string;
  length: number;
  index: number;
  planeWidth: number;
  planeHeight: number;
  distortion: number;

  program!: OGLProgram;
  plane!: OGLMesh;
  gap = 0;
  y = 0;

  constructor({
    gl,
    geometry,
    scene,
    screen,
    viewport,
    image,
    length,
    index,
    planeWidth,
    planeHeight,
    distortion,
  }: MediaParams) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uSpeed: { value: 0 },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] },
        uTime: { value: 0 },
      },
      cullFace: false,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x =
      (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y =
      (this.viewport.height * this.planeHeight) / this.screen.height;

    this.plane.position.x = 0;

    this.program.uniforms.uPlaneSize.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
  }

  onResize({
    screen,
    viewport,
  }: { screen?: ScreenSize; viewport?: ViewportSize } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.setScale();

    this.gap = this.plane.scale.y * 1.12;
    this.y = this.index * this.gap;
  }

  update(scroll: ScrollState) {
    this.plane.position.y = scroll.current - this.y;

    const position = map(
      this.plane.position.y,
      -this.viewport.height,
      this.viewport.height,
      5,
      15
    );

    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current;
  }
}

class CanvasController {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  items: string[];
  planeWidth: number;
  planeHeight: number;
  distortion: number;
  scroll: ScrollState;
  cameraFov: number;
  cameraZ: number;

  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: OGLTransform;
  planeGeometry!: OGLPlane;
  medias!: Media[];
  screen!: ScreenSize;
  viewport!: ViewportSize;
  rafId: number | null = null;
  progress = 0;

  constructor({
    container,
    canvas,
    items,
    planeWidth,
    planeHeight,
    distortion,
    scrollEase,
    cameraFov,
    cameraZ,
  }: CanvasParams) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = {
      ease: scrollEase,
      current: 0,
      target: 0,
    };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;

    AutoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });

    this.gl = this.renderer.gl;
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 1,
      widthSegments: 100,
    });
  }

  createMedias() {
    this.medias = this.items.map(
      (image, index) =>
        new Media({
          gl: this.gl,
          geometry: this.planeGeometry,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
          image,
          length: this.items.length,
          index,
          planeWidth: this.planeWidth,
          planeHeight: this.planeHeight,
          distortion: this.distortion,
        })
    );
  }

  setProgress(progress: number) {
    this.progress = Math.max(0, Math.min(1, progress));
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();

    this.screen = {
      width: rect.width,
      height: rect.height,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    this.medias?.forEach((media) =>
      media.onResize({
        screen: this.screen,
        viewport: this.viewport,
      })
    );
  }

  update() {
    const gap = this.medias?.[0]?.gap ?? 0;
    const maxTravel = gap * Math.max(0, this.items.length - 1);

    this.scroll.target = this.progress * maxTravel;
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    this.medias?.forEach((media) => media.update(this.scroll));
    this.renderer.render({ scene: this.scene, camera: this.camera });

    this.rafId = requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize);
  }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.onResize);
  }
}

interface FlyingPostersProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
  planeWidth?: number;
  planeHeight?: number;
  distortion?: number;
  scrollEase?: number;
  cameraFov?: number;
  cameraZ?: number;
  progress?: number;
}

export default function FlyingPosters({
  items = [],
  planeWidth = 320,
  planeHeight = 400,
  distortion = 2.2,
  scrollEase = 0.08,
  cameraFov = 45,
  cameraZ = 20,
  progress = 0,
  className,
  ...props
}: FlyingPostersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<CanvasController | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || items.length === 0) return;

    instanceRef.current = new CanvasController({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
      planeWidth,
      planeHeight,
      distortion,
      scrollEase,
      cameraFov,
      cameraZ,
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  useEffect(() => {
    instanceRef.current?.setProgress(progress);
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className ?? ""}`}
      {...props}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}