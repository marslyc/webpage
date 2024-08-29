precision lowp float;
attribute vec3 position;
attribute vec2 uv;


uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 获取时间
uniform float uTime;


// 传到 fragment.glsl 使用 varying 
varying vec2 vUv;
// 精度
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

varying float vElevation;

void main(){
    vUv = uv;
    vec4 modelPotition = modelMatrix * vec4( position, 1.0 );
    // modelPotition.x += 1.0;
    // modelPotition.z += modelPotition.x;
    modelPotition.z = sin((modelPotition.x + uTime) * 10.0) * 0.1;
    modelPotition.z += sin((modelPotition.y + uTime) * 10.0) * 0.1;
    
    vElevation = modelPotition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPotition ;
}