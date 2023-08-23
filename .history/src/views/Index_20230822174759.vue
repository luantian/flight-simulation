<template>
    <div>sdf</div>
    <el-button>123</el-button>
</template>

<script setup lang="ts">
import { FlyF35 } from "@/models/FlyF35";
console.log("FlyF35", FlyF35);

const flyF35 = new FlyF35();
console.log("flyF35", flyF35.name);
flyF35.fly();
</script>

