"use client";

/* eslint-disable react-doctor/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import {
  Color,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = {
  globeConfig: GlobeConfig;
  data: Position[];
};

type GlobePoint = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

type GlobeMaterial = {
  color: Color;
  emissive: Color;
  emissiveIntensity: number;
  shininess: number;
};

function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);
  const isInitializedRef = useRef(false);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#0b1020",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig],
  );

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      isInitializedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitializedRef.current) return;

    const globeMaterial =
      globeRef.current.globeMaterial() as unknown as GlobeMaterial;
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
    globeMaterial.shininess = defaultProps.shininess;
  }, [
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.globeColor,
    defaultProps.shininess,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitializedRef.current || !data.length) return;

    const points: GlobePoint[] = [];
    data.forEach((arc) => {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    });

    const filteredPoints = points.filter(
      (point, index, allPoints) =>
        allPoints.findIndex(
          (item) => item.lat === point.lat && item.lng === point.lng,
        ) === index,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((item: object) => (item as Position).startLat)
      .arcStartLng((item: object) => (item as Position).startLng)
      .arcEndLat((item: object) => (item as Position).endLat)
      .arcEndLng((item: object) => (item as Position).endLng)
      .arcColor((item: object) => (item as Position).color)
      .arcAltitude((item: object) => (item as Position).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((item: object) => (item as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((item: object) => (item as GlobePoint).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  }, [data, defaultProps]);

  useEffect(() => {
    if (!globeRef.current || !isInitializedRef.current || !data.length) return;

    const interval = window.setInterval(() => {
      if (!globeRef.current) return;

      const ringIndexes = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringIndexSet = new Set(ringIndexes);
      const ringsData = data.flatMap((item, index) =>
        ringIndexSet.has(index)
          ? [
              {
                lat: item.startLat,
                lng: item.startLng,
                color: item.color,
              },
            ]
          : [],
      );

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [data]);

  return <group ref={groupRef} />;
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World({ globeConfig, data }: WorldProps) {
  const scene = useMemo(() => {
    const nextScene = new Scene();
    nextScene.fog = new Fog(0xffffff, 400, 2000);
    return nextScene;
  }, []);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, ASPECT, 180, 1800)}
      className="h-full w-full"
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        intensity={0.8}
        position={new Vector3(-200, 500, 200)}
      />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        autoRotate={globeConfig.autoRotate ?? true}
        minPolarAngle={
          globeConfig.initialPosition
            ? (90 - globeConfig.initialPosition.lat) * (Math.PI / 180)
            : Math.PI / 3.5
        }
        maxPolarAngle={
          globeConfig.initialPosition
            ? (90 - globeConfig.initialPosition.lat) * (Math.PI / 180)
            : Math.PI - Math.PI / 3
        }
      />
    </Canvas>
  );
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  const usedValues = new Set<number>();

  while (arr.length < count) {
    const value = Math.floor(Math.random() * (max - min)) + min;
    if (!usedValues.has(value)) {
      usedValues.add(value);
      arr.push(value);
    }
  }

  return arr;
}
