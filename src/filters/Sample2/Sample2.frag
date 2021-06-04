precision lowp float;

uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform float width;
uniform float height;

bool inCircle(vec2 position, vec2 offset, float size) {
    vec2 screen = vec2(width, height);
    float len = length((position - offset) *screen)/screen.x;
    if (len < size) {
        return true;
    }
    return false;
}

void main(void) { 
    // vec4 destColor = vec4(0.0/255.0, 0.0/255.0, 0.0/255.0, 1.0);
    vec4 destColor = vec4(37.0/255.0, 62.0/255.0, 82.0/255.0, 1.0);
    float box = 30.0;

    vec2 coord = vTextureCoord.xy;

    //box左上の座標
    float offsetX = mod(coord.x, box/width);
    float offsetY = mod(coord.y, box/height);
    vec2 coordLT = coord - vec2(offsetX, offsetY); 

    // //ボックスの中心
    vec2 center = coordLT + vec2((box/width/2.0), (box/height/2.0)); 

    vec4 color = texture2D(uSampler, coordLT);

    if (inCircle(coord, center, box/width/5.0 * (1.0-color.r))) {
        gl_FragColor = destColor;
    // } else{
    //     gl_FragColor = color;
    }
    // gl_FragColor = destColor;

}
