import {gl} from "./canvas.js"

// Add hash defines to toggle specific parts of the shaders according to geometry and material data
function getDefinePrefix(parameters, material){

  var prefix = "// " + material.constructor.name + "\n";

  if(parameters){
    if(parameters.hasOwnProperty("instanced") && parameters.instanced){
      prefix += "#define INSTANCED \n";
    }

    if(parameters.hasOwnProperty("uvs") && parameters.uvs){
      prefix += "#define HAS_UVS \n";
    }
  }

  return prefix;
}

function compileShader(shaderSource, shaderType){

  var shader = gl.createShader(shaderType);

  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }

  return shader;
}

export {compileShader, getDefinePrefix}
