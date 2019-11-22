precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float threshold;
void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec3 mcolor = vec3(0, 0, 0);
    if (color.a > threshold) {
       gl_FragColor = vec4(mcolor, 1.0);
    } else {
       gl_FragColor = vec4(vec3(0.0), 0.0);
    }
}
