<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { World, Vec3, Body, Sphere, Plane } from "cannon-es";

import { Viewer } from "@/viewer";
import { PlaneF35 } from "@/models/PlaneF35";

import type { ISixForceInterface } from "@/interface/SixForceInterface";

const planeF35 = new PlaneF35();

console.log("planeF35", planeF35.name);

onMounted(() => {
    const world = new World({
        gravity: new Vec3(0, -9.82, 0),
    });

    const radius = 1;
    const sphereBody = new Body({
        mass: 5, // kg
        shape: new Sphere(radius),
    });
    sphereBody.position.set(0, 10, 0); // m
    world.addBody(sphereBody);

    const groundBody = new Body({
        type: Body.STATIC,
        shape: new Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
    world.addBody(groundBody);

    function animate() {
        requestAnimationFrame(animate);
        // the sphere y position shows the sphere falling
        console.log(`Sphere y position: ${sphereBody.position.y}`);
    }
    animate();

    // const viewer = new Viewer(
    //     document.querySelector("#container") as HTMLElement
    // );
    // viewer.loadGlb("/models/F35Plane.glb");

    // setInterval(() => {
    //     const sixForce: ISixForceInterface = {
    //         elevating: 0, // 升力
    //         side: 0, // 侧力
    //         resistance: 0, // 阻力
    //         rollingMoment: 0, // 滚转力矩
    //         yawMoment: 0, // 偏航力矩
    //         pitchingMoment: 0, // 俯仰力矩
    //     };
    //     planeF35.run(sixForce);
    // }, 60);
});
</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>
