precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float threshold;
uniform float r;
uniform float g;
uniform float b;
void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 lt = vec4(vec3(r, g, b), 1.0);
    vec4 trans = vec4(vec3(0.0), 0.0);

    if (threshold < color.a) {
       gl_FragColor = lt;
    }

    // if (threshold > color.a && color.a >= (threshold - .1)) {
    //    gl_FragColor = lt;
    // } else if ((threshold - .3) > color.a && color.a >= (threshold - .35)) {
    //    gl_FragColor = black;
    // } else if ((threshold - .5) > color.a && color.a >= (threshold - .55)) {
    //    gl_FragColor = black;
    // } else {
    //    gl_FragColor = trans;
    // }
}
