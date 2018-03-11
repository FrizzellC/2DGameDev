/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function DirectionalLight(){
    this.mLight = this._createALight(Light.eLightType.eDirectionalLight,
            [0, 0, 10],           // position (not used by directional)
            [0, -.5, .5],          // Pointing direction 
            [0.7, 0.7, 0.0, 1],     // color
            500, 500,               // near anf far distances: essentially switch this off
            0.1, 0.2,               // inner and outer cones
            0,                      // intensity
            1.0                     // drop off
    );
}

DirectionalLight.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);

    return light;
};