<template>
    <div class="box-main">
        <div @click="jumpBlender(item.path)" v-for="item in blenderList" :key="item">
            
            <img :src="item.src" alt="">
            {{ item.name }}
        </div>
        <div >网格模型</div>
        <div >球缓冲体</div>
        <div >纹理贴图</div>

    </div>
        
</template>

<script setup>

import { onMounted, reactive, ref, onBeforeUnmount, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

let blenderList = ref([
    {
        name: '筋膜枪',
        path: '/blender/fasciaGun',
        src: new URL('@/images/blender/fasciaGun.jpg', import.meta.url).href
    },
    {
        name: '平底锅',
        src: new URL('@/images/blender/pot.png', import.meta.url).href,
        path: '/blender/pot'
    },
    // {
    //     name: '球缓冲体',
    //     path: '/blender/sphere'
    // },
])

let router = useRouter()
let jumpBlender = (path) => {
    console.log('跳转')
    let href = router.resolve({ 
        path: path,
    }).href
    window.open(href, '_blank');
}



</script>
<style scoped>

.box-main {
    /* background: #fff; */
    display: flex;
    flex-wrap: wrap;
    position: relative;
    overflow: auto;
}

.box-main div {
    width: 400px;
    height: 300px;
    /* display: inline-block; */
    min-width: 300px;
    min-height: 300px;
    flex: 1 0 0;
    background: #e2e2e2;
    margin: 5px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}


.box-main div img {
    /* width: 100%; */
    height: 260px;
}
</style>