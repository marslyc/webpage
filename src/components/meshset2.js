import * as THREE from 'three'

let meshsset = function(){




  const geometry = new THREE.SphereGeometry(1, 30, 30)

  const material = new THREE.MeshStandardMaterial({
    // metalness: 0.7,
    // roughness: 0.1,
  })

  return new THREE.Mesh(geometry,material)

}

export default meshsset;