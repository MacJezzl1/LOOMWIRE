"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const texturePaths = [
  "/art/loomwire-atelier-hero.png",
  "/art/loomwire-poster-collage.png"
];

export function AtelierScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      100
    );
    camera.position.set(0, 0.1, 7.4);

    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const posterMaterials = texturePaths.map((path) => {
      const texture = textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide
      });
    });

    const posterGeometry = new THREE.PlaneGeometry(1.55, 2.15);
    const posterPositions = [
      [-2.9, 0.55, -0.6, -0.38],
      [-1.12, -0.42, 0.35, 0.18],
      [1.12, 0.48, -0.2, -0.16],
      [2.82, -0.28, -0.75, 0.34],
      [-0.2, 1.38, -1.2, -0.04],
      [0.62, -1.32, -0.9, 0.08]
    ];

    posterPositions.forEach(([x, y, z, rotation], index) => {
      const mesh = new THREE.Mesh(
        posterGeometry,
        posterMaterials[index % posterMaterials.length]
      );
      mesh.position.set(x, y, z);
      mesh.rotation.y = rotation;
      mesh.rotation.z = index % 2 === 0 ? 0.035 : -0.03;
      group.add(mesh);
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.008, 12, 96),
      new THREE.MeshBasicMaterial({
        color: 0xd4a935,
        transparent: true,
        opacity: 0.75
      })
    );
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = 0.35;
    group.add(ring);

    const secondRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.004, 10, 120),
      new THREE.MeshBasicMaterial({
        color: 0xb7ff4a,
        transparent: true,
        opacity: 0.36
      })
    );
    secondRing.rotation.x = Math.PI / 2;
    secondRing.rotation.z = 0.3;
    group.add(secondRing);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf4efe4,
      transparent: true,
      opacity: 0.18
    });
    const linePoints: THREE.Vector3[] = [];
    for (let i = -6; i <= 6; i += 1) {
      linePoints.push(new THREE.Vector3(i * 0.42, -2.1, -1.6));
      linePoints.push(new THREE.Vector3(i * 0.42, 2.1, -1.6));
      linePoints.push(new THREE.Vector3(-2.6, i * 0.32, -1.6));
      linePoints.push(new THREE.Vector3(2.6, i * 0.32, -1.6));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const grid = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(grid);

    const pointer = { x: 0, y: 0 };
    const handlePointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointer);

    const resize = () => {
      const width = mount.clientWidth;
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.008;
      group.rotation.y = Math.sin(frame) * 0.07 + pointer.x * 0.05;
      group.rotation.x = Math.cos(frame * 0.8) * 0.025 - pointer.y * 0.035;
      ring.rotation.z += 0.004;
      secondRing.rotation.z -= 0.002;
      grid.position.x = Math.sin(frame * 0.7) * 0.05;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      posterGeometry.dispose();
      lineGeometry.dispose();
      posterMaterials.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
      lineMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="atelier-scene"
      aria-hidden="true"
      className="absolute inset-0 min-h-[680px] overflow-hidden opacity-80"
    />
  );
}
