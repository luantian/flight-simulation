<template>
    <div id="container"></div>
</template>

<script setup lang="ts">

import { PlaneF35 } from "@/models/PlaneF35";

const planeF35 = new PlaneF35();

console.log("planeF35", planeF35.name);




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