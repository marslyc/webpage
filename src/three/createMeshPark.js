

import Park from './mesh/Park'
import scene from './scenePark';
let park;
export default function createMesh(){
    park = new Park(scene)
}

export function updateMesh(time) {
    park.update(time)
};