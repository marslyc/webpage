import { path } from 'd3'

const cityComponent = ()=> import('../views/City.vue')
const parkComponent = ()=> import('../views/Park.vue')
const factoryComponent = ()=> import('../views/Factory.vue')
const mapComponent = ()=> import('../views/Map.vue')
const boneComponent = ()=> import('../views/Bone.vue')
const cannonComponent = ()=> import('../views/Cannon.vue')
const webpageComponent = ()=> import('../views/Webpage.vue')
const peopleComponent = ()=> import('../views/People.vue')
const raycasterComponent = ()=> import('../views/Raycaster.vue')
// 烟花
const fireworkComponent = ()=> import('../views/Firework.vue')
const lightComponent = ()=> import('../views/Light.vue')
const snowComponent = ()=> import('../views/Snow.vue')
const passComponent = ()=> import('../views/Pass.vue')
const pointComponent = ()=> import('../views/Point.vue')
const shaderComponent = ()=> import('../views/Shader.vue')
const houseComponent = ()=> import('../views/House.vue')
const wanderComponent = ()=> import('../views/Wander.vue')
const earthComponent = ()=> import('../views/Earth.vue')
const gameComponent = ()=> import('../views/Game.vue')
const mluSceneComponent = ()=> import('../views/MluScene.vue')


const routes = [
    {
        path: '/',
        redirect: '/webpage'
    },
    
    {
        path: '/webpage',
        name: '网页',
        component: webpageComponent
    },
    {
        path: '/mluScene',
        name: '多场景',
        component: mluSceneComponent
    },
    // {
    //     path: '/game',
    //     name: '游戏',
    //     component: gameComponent
    // },
    {
        // 虚拟运动
        path: '/wander',
        name: '虚拟运动',
        component: wanderComponent
    },
    {
        path: '/earth',
        name: '月球运动',
        component: earthComponent
    },
    {
        path: '/house',
        name: '3D看房',
        component: houseComponent
    },
    // {
    //     path: '/shader',
    //     name: 'shader',
    //     component: shaderComponent
    // },
    // {
    //     path: '/point',
    //     name: 'point',
    //     component: pointComponent
    // },
    // {
    //     path: '/pass',
    //     name: 'pass',
    //     component: passComponent
    // },
    // {
    //     path: '/snow',
    //     name: 'snow',
    //     component: snowComponent
    // },
    {
        path: '/light',
        name: '孔明灯',
        component: lightComponent
    },
    // {
    //     path: '/firework',
    //     name: '烟花',
    //     component: fireworkComponent
    // },
    {
        path: '/cannon',
        name: '物理引擎',
        component: cannonComponent
    },
    {
        path: '/city',
        name: '智慧城市',
        component: cityComponent
    },
    {
        path: '/park',
        name: '智慧园区',
        component: parkComponent
    },
    {
        path: '/factory',
        name: '智慧工厂',
        component: factoryComponent
    },
    {
        path: '/bone',
        name: '骨骼动画',
        component: boneComponent
    },
    
    {
        path: '/map',
        name: '3D地图',
        component: mapComponent
    },
    {
        path: '/raycaster',
        name: '射线',
        component: raycasterComponent
    },
    // {
    //     path: '/people',
    //     name: '人物变形',
    //     component: peopleComponent
    // },
    
    
    
]

export default routes