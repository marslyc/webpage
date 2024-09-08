<template>
    <div>
        <Scene :eventList="eventList"></Scene>
        <BigScreen :dataInfo="dataInfo" :eventList="eventList"></BigScreen>
    </div>
</template>

<script setup>
import Scene from '@/components/Scene.vue'
import BigScreen from '@/components/BigScreen.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';

// import { getSmartCityInfo, getSmartCityList } from '@/api/api.js'

let dataInfo = ref([]);

let eventList = ref([])



const changeInfo = async () => {
    // let result = await getSmartCityInfo()

    let nameArr = ['火警','电力','治安'];
    let unitArr = ['起','次','件'];
    // let num = Math.floor(Math.random() * 3) + 1;
    let result = []
    for(let i = 0; i< 3;i++) {
        result.push({
            name: nameArr[i],
            unit: unitArr[i],
            number: Math.floor(Math.random() *30)
        })
    }

    dataInfo.value = result

}

const changeList = async () => {
    // let result = await getSmartCityList()

    // eventList.value = result.data.list
    let nameArr = ['火警','电力','治安'];
    let num = Math.floor(Math.random() * 3) + 1;
    let result = []
    for(let i = 0; i< num;i++) {
        result.push({
            name: nameArr[Math.floor(Math.random() * 3)],
            type: "数据类型配置" + Math.floor(Math.random() *1000),
            time: `${Math.floor(Math.random() * 24)} : ${Math.floor(Math.random() * 60)} : ${Math.floor(Math.random() * 60)}`,
            position: {
                "x": Math.floor(Math.random() * 100),
                "y": Math.floor(Math.random() * 100)
            }
        })
    }
    eventList.value = result;
    // result = [
    //     {
    //         name:'火警',
    //         code: '110000',
    //         type: "iot设备好数据",
    //         time: '12:00:00',
    //         position: {
    //             "x": 11,
    //             "y": 69
    //         }
    //     },
    //     {
    //         name:'电力',
    //         code: '110000',
    //         type: "事件发生在XXX",
    //         time: '15:30:05',
    //         position: {
    //             "x": 2,
    //             "y": 97
    //         }
    //     },
    //     {
    //         name:'治安',
    //         code: '110000',
    //         type: "电源嘎热哈",
    //         time: '10:20:55',
    //         position: {
    //             "x": 44,
    //             "y": 39
    //         }
    //     }
    // ]
}
let timer = null
onMounted(() => {
    changeInfo()
    changeList()
    timer = setInterval(()=> {
        changeInfo()
        changeList()
    }, 50000)
})
onBeforeUnmount(()=> {
    clearInterval(timer)
    timer = null
})

</script>