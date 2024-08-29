import{S as m,r as g,ag as w,D as y,a as p,T as h,M as _,g as P,p as S,q as C,W as b,v as z,l as M}from"./three.module-BUZdne6h.js";import{O as L}from"./OrbitControls-UBkTBaol.js";import{r as F,o as T,c as D,a as E}from"./index-CvBKhgFj.js";var H=`precision lowp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

uniform float uTime;
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
}`,U=`precision lowp float;
varying vec2 vUv;
varying float vElevation;

uniform sampler2D uFlag; 

uniform float uTime;
uniform float uScale;

#define PI 3.1415926535897932384626433832795

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); 
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; 
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
void main(){
    
    

    
    

    
    
    
    

    
    
    
    

    
    
    

    
    
    
    

    
    
    

    
    
    
    

    
    
    
    

    
    
    
    

    
    
    

    
    
    

    
    
    

    
    
    

    
    
    
    
    
    

    
    

    
    
    

    
    
    

    
    
    

    
    
    
 
    
    
    

    
    
    

    
    

    
    
    

    
    
    
    
    
    

    
    
    
    

    
    
    

    
    
    

    
    
    

    
    
    

    

    
    
    

    
    
    
    
    
    

    
    
    

    
    
    

    
    
    
    
    
    
    
    

    
    
    

    
    
    

    
    
    
    
    
    
    

    
    
    
    
    
    
    

    
    
    
    
    
    
    

    
    
    
    

    
    
    
    

    
    
    
    
    
    

    
    
    
    
    
    
    

    
    
    
    
    

    
    
    
    
    

    
    
    

    
    

    
    

    
    
    

    
    

    
    
    

    
    
    

    
    

    
    vec3 purpleColor = vec3(1.0, 0.0, 1.0);
    vec3 greenColor = vec3(1.0, 1.0, 1.0);
    vec3 uvColor = vec3(vUv,1.0);
    float strength = step(0.9,sin(cnoise(vUv * 10.0)*20.0))  ;

    vec3 mixColor =  mix(greenColor,uvColor,strength);
    
    gl_FragColor =vec4(mixColor,1.0);

}`;const A={__name:"Shader",setup(W){let o=F();const e=new m,t=new g(90,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(0,0,2),e.add(t);let f=new URL("/assets/ca-CAutzYzD.jpeg",import.meta.url).href,r={uScale:.1,uFrequency:10},a=new w({vertexShader:H,fragmentShader:U,side:y,transparent:!0,uniforms:{uColor:{value:new p("purple")},uFrequency:{value:r.uFrequency},uScale:{value:r.uScale},uTime:{value:0},uFlag:{value:new h().load(f)}}}),i=new _(new P(1,1,64,64),a);i.receiveShadow=!0,e.add(i);let s=new S(16777215,.5);e.add(s);let c=new C(16777215,.5);c.castShadow=!0,e.add(c);const n=new b({alpha:!0});n.setSize(window.innerWidth,window.innerHeight),n.shadowMap.enabled=!0,T(()=>{o.value.appendChild(n.domElement)});const v=new L(t,n.domElement);v.enableDamping=!0;const u=new z(5);e.add(u);const x=new M;function l(){let d=x.getElapsedTime();a.uniforms.uTime.value=d,v.update(),n.render(e,t),requestAnimationFrame(l)}return l(),window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio)}),(d,k)=>(E(),D("div",{id:"box1",ref_key:"shaderScene",ref:o},null,512))}};export{A as default};
