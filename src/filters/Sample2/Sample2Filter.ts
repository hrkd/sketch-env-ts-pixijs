import { Filter } from '@pixi/core';
import fragment from './Sample2.frag';

const vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`;

class Sample2Filter extends Filter {
  /**
   * @param {number} [scale=1] - The scale of the effect.
   * @param {number} [angle=5] - The radius of the effect.
   */
  constructor(options: any) {
    super(vertex, fragment, options);
  }
}

export { Sample2Filter };
