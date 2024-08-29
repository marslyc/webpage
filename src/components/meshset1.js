import * as THREE from 'three'
let meshsset = function(){
  // 创建几何体
    //   三个点成个三角形，每个点有三个值
    
    // const geometry = new THREE.BufferGeometry();
    // let vertices = new Float32Array([
    //     -1.0, -1.0, 1.0, 
    //     1.0, -1.0, 1.0, 
    //     1.0, 1.0, 1.0, 
    //     1.0, 1.0, 1.0, 
    //     -1.0, 1.0, 1.0,
    //     -1.0, -1.0, 1.0,
    // ])
    // geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))

    var div = document.createElement("div");
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.position = "fixed";
    div.style.left = "15px";
    div.style.top = "15px";
    div.style.color = "#fff";
    document.body.appendChild(div);
    let event = {};
    // 单张纹理图的加载
    event.onLoad = function () {
      console.log("图片加载完成");
    };
    event.onProgress = function (url, num, total) {
      console.log("图片加载完成:", url);
      console.log("图片加载进度:", num);
      console.log("图片总数:", total);
      let value = ((num / total) * 100).toFixed(2) + "%";
      console.log("加载进度的百分比：", value);
      div.innerHTML = value;
    };
    event.onError = function (e) {
      console.log("图片加载出现错误");
      console.log(e);
    };
    // 设置加载管理器
    let loadingManger = new THREE.LoadingManager(
      event.onLoad,
      event.onProgress,
      event.onError
    )

    // 纹理
    let textureLoader = new THREE.TextureLoader(loadingManger)
    let doorimgSrc = new URL('../images/textures/door/color.jpg',import.meta.url).href
    let minecraftSrc = new URL('../images/textures/minecraft.png',import.meta.url).href
    let alphaSrc = new URL('../images/textures/door/alpha.jpg',import.meta.url).href
    let alSrc = new URL('../images/textures/door/ambientOcclusion.jpg',import.meta.url).href
    let heightSrc = new URL('../images/textures/door/height.jpg',import.meta.url).href
    // 粗糙度贴图
    let roughnessSrc = new URL('../images/textures/door/roughness.jpg',import.meta.url).href
    // 导入金属贴图
    let metalnessSrc = new URL('../images/textures/door/metalness.jpg',import.meta.url).href
    // 导入法线贴图
    let normalSrc = new URL('../images/textures/door/normal.jpg',import.meta.url).href
    let doorColorTexture = textureLoader.load(doorimgSrc)
    let texture = textureLoader.load(minecraftSrc)
    let alphaMap = textureLoader.load(alphaSrc)
    let alMap = textureLoader.load(alSrc)

    let roughnessTexture = textureLoader.load(roughnessSrc)
    let metalnessTexture = textureLoader.load(metalnessSrc)
    let normalTexture = textureLoader.load(normalSrc)
    //导入置换贴图
    const doorHeightTexture = textureLoader.load(heightSrc);

    // doorColorTexture.offset.x = 0.5
    // doorColorTexture.offset.y = 0.5
    // doorColorTexture.offset.set(0.5,0.5)
    // doorColorTexture.center.set(0.5, 0.5);
    // // 旋转45deg
    // doorColorTexture.rotation = Math.PI / 4;
    // doorColorTexture.repeat.set(2,2)
    // doorColorTexture.wrapS = THREE.RepeatWrapping
    // doorColorTexture.wrapT = THREE.RepeatWrapping

    // texture纹理显示设置
    // texture.minFilter = THREE.NearestFilter;
    // texture.magFilter = THREE.NearestFilter;
    // texture.minFilter = THREE.LinearFilter;
    // texture.magFilter = THREE.LinearFilter;
    // 循环多个三角形
    // 100, 100, 100 配合置换贴图，突出显示
    const geometry = new THREE.BoxGeometry(1,1,1, 100, 100, 100)
    // const material = new THREE.MeshBasicMaterial({
    // MeshStandardMaterial需要光源才能显示
    const material = new THREE.MeshStandardMaterial({
        color: '#ffff00',
        map: doorColorTexture,
        alphaMap: alphaMap,
        transparent: true,
        aoMap: alMap,
        aoMapIntensity: 0.5,
        side: THREE.DoubleSide,
        displacementMap : doorHeightTexture,
        displacementScale: 0.1,
        roughnessMap: roughnessTexture,
        roughness: 1,
        metalness: 1,
        metalnessMap: metalnessTexture,
        
        normalMap: normalTexture,

        // opacity: 0.5
        // map: texture
    })
    // aoMap需要第二组uv 坐标
    geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
    )
    return new THREE.Mesh(geometry,material)

    // 创建几何体,
    // for(let i = 0; i < 50; i++){
    //     let mlgeometry = new THREE.BufferGeometry()
    //     let positionArray = new Float32Array(9)
    //     for(let j = 0; j < 9; j++){
    //         positionArray[j] = Math.random() * 5 - 2.5
    //     }
    //     mlgeometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
    //     let mlcolors = new THREE.Color(Math.random(),Math.random(),Math.random())
    //     const mlmaterial = new THREE.MeshBasicMaterial({
    //     color: mlcolors,
    //     side: THREE.DoubleSide,
    //     transparent: true,
    //     opacity: 0.5
    //     })
    //     let mlcube = new THREE.Mesh(mlgeometry,mlmaterial)
    //     scene.add(mlcube)
    // }
}

export default meshsset;