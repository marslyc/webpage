

import createCity from './mesh/Factory'
import scene from './sceneFactory';
let factory;
const createMesh = ()=> {
    factory = new createCity(scene)
    return factory;
}

export default createMesh;

export function updateMesh(t) {
    // 更新
    factory.update(t)
}