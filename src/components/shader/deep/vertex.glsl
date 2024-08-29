precision lowp float;
attribute vec3 position;
attribute vec2 uv;


uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 传到 fragment.glsl 使用 varying 
varying vec2 vUv;

// 获取时间
uniform float uTime;
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
}