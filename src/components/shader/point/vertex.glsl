varying vec2 vUv;

attribute float imgIndex;

attribute float aScale;

varying float vImgIndex;
uniform float uTime;

varying vec3 vColor;


void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    

    // 顶点角度
    float angle = atan( modelPosition.x, modelPosition.z);
    // 顶点到中心的距离
    float distanceToCenter = length(modelPosition.xz);
    // 设置旋转偏移度数
    float angleOffset = 1.0 /  distanceToCenter *uTime;
    // 当前的角度 = 之前角度 + 偏移角度
    angle += angleOffset;

    // 
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;


    vec4 viewPosition = viewMatrix * modelPosition ;

    gl_Position = projectionMatrix * viewPosition ;

    vUv = uv;
    // 设置点大小
    // gl_PointSize = 60.0 ;
    // 根据 z轴 viewPosition
    gl_PointSize = -100.0 / viewPosition.z * aScale;

    vImgIndex = imgIndex;
    vColor = color;
}