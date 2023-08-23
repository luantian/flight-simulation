<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { Viewer } from "@/viewer";
import { PlaneF35 } from "@/models/PlaneF35";
import { onMounted } from "vue";
import type { ISixForceInterface } from "@/interface/SixForceInterface";

const planeF35 = new PlaneF35();

console.log("planeF35", planeF35.name);


onMounted(() => {
    const viewer = new Viewer(
        document.querySelector("#container") as HTMLElement
    );
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
