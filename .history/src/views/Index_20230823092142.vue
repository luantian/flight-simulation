<template>
    <el-button>测试按钮</el-button>
</template>

<script setup lang="ts">
import { Scene } from "three"
import { PlaneF35 } from "@/models/PlaneF35";
console.log("PlaneF35", PlaneF35);

console.log('Scene', Scene);

const planeF35 = new PlaneF35();

console.log("planeF35", planeF35.name);

planeF35.run();
planeF35.fly();

</script>
