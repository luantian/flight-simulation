<template>
    <el-button>123</el-button>
</template>

<script setup lang="ts">
import { Scene } from "three"
import { PlaneF35 } from "@/models/PlaneF35";
console.log("FlyF35", PlaneF35);

console.log('Scene', Scene);

const planeF35 = new PlaneF35();
console.log("planeF35", planeF35.name);
planeF35.fly();
</script>
