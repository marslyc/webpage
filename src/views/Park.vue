<template>
    <div>
        <ParkScene :eventList="eventList"></ParkScene>
        <BigScreenPark></BigScreenPark>
    </div>
</template>

<script setup>
import ParkScene from '@/components/ParkScene.vue'
import BigScreenPark from '@/components/BigScreenPark.vue';
import { onMounted, reactive, ref } from 'vue';

// import { getSmartCityInfo, getSmartCityList } from '@/api/api.js'

let dataInfo = ref([]);

let eventList = ref([])



// const changeInfo = async () => {
//     // let result = await getSmartCityInfo()

//     let nameArr = ['火警','电力','治安'];
//     let unitArr = ['起','次','件'];
//     // let num = Math.floor(Math.random() * 3) + 1;
//     let result = []
//     for(let i = 0; i< 3;i++) {
//         result.push({
//             name: nameArr[i],
//             unit: unitArr[i],
//             number: Math.floor(Math.random() *30)
//         })
//     }

//     dataInfo.value = result

// }


onMounted(() => {
    // changeInfo()
    // changeList()
    // setInterval(()=> {
    //     changeInfo()
    //     changeList()
    // }, 50000)
})

</script>