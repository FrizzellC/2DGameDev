/*
 * File: Player.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Player */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Player.prototype.update = function () {
    switch(this.mCurrentState) {
        case Player.ePlayerState.Normal:
            this._updateNormal();
            break;
        case Player.ePlayerState.Boost:
            this._updateBoost();
            break;
        case Player.ePlayerState.Shoot:
            this._updateShoot();
            break;
        case Player.ePlayerState.Slow:
            this._updateSlow();
            break;
    }
    GameObject.prototype.update.call(this);
};


Player.prototype._updateNormal = function () {
        this._updatePos();
};

Player.prototype._updateOnSand = function () {
    if(!this._onSand())
    {
        this._transitionToNormal();
    }
    else
    {
        this._updatePos();
    }
};

Player.prototype._updateOnIce = function () {
    if(!this._onIce())
    {
        this._transitionToNormal();
    }
    else
    {
        //use ice interpolation for sliding pos
        //allow slight user control of pos
        this._updatePos();
    }
};

<<<<<<< HEAD
=======
Player.prototype._updateSlow = function () {
    this._updatePos();
};

Player.prototype._updateRot = function () {
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), 0.05);
        this.mSprite.getXform().setRotationVec(this.getCurrentFrontDir());
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), -0.05);
        this.mSprite.getXform().setRotationVec(this.getCurrentFrontDir());
    }
};

Player.prototype._updateFlashLight = function(){
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    this.mFlashLight.setPosition(x, y);
    this.mFlashLight.setMagnitude();
};

>>>>>>> master
Player.prototype._updatePos = function () {

    if (this.mSpeed !== 0) {
        
        var direction = vec2.fromValues(0,0);
        
        //For testing transtion to slow state
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Q))
        {
            //this.mSpeed = 15/60;
            this._transitionToSlow();
        }
        else{
            this._transitionToNormal();
        }
        
        var horiz = 0;
        var vert = 0;
        var buttonPressed = false;
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
        {
            buttonPressed = true;
            vert = 1;
            vec2.add(direction, direction, vec2.fromValues(0,1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
        {
            buttonPressed = true;
            vert = -1;
            vec2.add(direction, direction, vec2.fromValues(0,-1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
        {
            buttonPressed = true;
            horiz = -1;
            vec2.add(direction, direction, vec2.fromValues(-1,0));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
        {
            buttonPressed = true;
            horiz = 1;
            vec2.add(direction, direction, vec2.fromValues(1,0));
        }
        
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H))
        {
            this.mFlashLight.toggle();
        }
        
        if(buttonPressed){
            this.mFlashLight.mVerticalFactor = vert;
            this.mFlashLight.mHorizontalFactor = horiz;
        }
        
        vec2.normalize(direction,direction);
        vec2.scale(direction,direction,this.mSpeed);
        this.getXform().incXPosBy(direction[0]);
        this.getXform().incYPosBy(direction[1]);
        this.setCurrentFrontDir(direction);
        this._updateFlashLight();
    }
};