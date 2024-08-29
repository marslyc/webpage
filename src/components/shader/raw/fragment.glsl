precision lowp float;
varying vec2 vUv;
varying float vElevation;

uniform sampler2D uFlag; 

void main(){
    float height = vElevation + 0.05 * 20.0;
    // gl_FragColor = vec4(1.0*height, 0.0, 0.0, 1.0);

    // 取出对应的颜色
    vec4 flagColor = texture2D(uFlag, vUv);
    flagColor.rgb*=height;
    gl_FragColor = flagColor;
}