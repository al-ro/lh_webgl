import {gl} from "./canvas.js"
import {Material} from './material.js'
import {getVertexSource, getFragmentSource} from './starsMaterial.glsl.js'

export class StarsMaterial extends Material{

  modelMatrixHandle;
  modelMatrix;

  aspectHandle;
  aspect;

  getVertexShaderSource(parameters){
    return getVertexSource(parameters);
  }
  
  getFragmentShaderSource(){
    return getFragmentSource();
  }

  getParameterHandles(){
    this.attributeHandles.positionHandle = this.program.getAttribLocation('position');
    this.attributeHandles.vertexUVHandle = this.program.getAttribLocation('uv');

    this.modelMatrixHandle = this.program.getUniformLocation('modelMatrix');
    this.timeHandle = this.program.getUniformLocation('time');
    this.aspectHandle = this.program.getUniformLocation('aspect');
  }


  bindParameters(geometry, time){
    gl.uniformMatrix4fv(this.modelMatrixHandle, false, geometry.getModelMatrix());
    gl.uniform1f(this.timeHandle, time);
    gl.uniform1f(this.aspectHandle, this.aspect);
  }

  getHandles(){
    return this.attributeHandles; 
  }

  setAspect(aspect){
    this.aspect = aspect;
  }
}
