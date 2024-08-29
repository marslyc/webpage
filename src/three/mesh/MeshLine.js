import * as THREE from "three";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";
export default class MeshLine {
    constructor(geometry) {
        let edges = new THREE.EdgesGeometry(geometry)
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff
        })
        let line = new THREE.LineSegments(edges, this.material)
        this.geometry = edges
        this.mesh = line
    }
}