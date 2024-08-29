<template>
    <div id="bone" ref="boneScene"></div>
</template>

<script setup>
import renderer from '@/components/Bone.js'
import { onMounted, reactive, ref, render } from 'vue';

let boneScene = ref(null)
onMounted(() => {
    boneScene.value.appendChild(renderer.domElement)
})

</script>