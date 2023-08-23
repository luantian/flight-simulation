<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { PlaneF35 } from "@/models/PlaneF35";

const planeF35 = new PlaneF35();

console.log("planeF35", planeF35.name);

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



planeF35.run();
planeF35.fly();

</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>