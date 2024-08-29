<template>
    <div id="bone" ref="scene"></div>
</template>

<script setup>
import renderer from '@/components/Cannon.js'
import { onMounted, reactive, ref, render } from 'vue';

let scene = ref(null)
onMounted(() => {
    scene.value.appendChild(renderer.domElement)
})

</script>