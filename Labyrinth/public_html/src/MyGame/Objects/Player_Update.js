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

Player.prototype._updatePos = function () {

    if (this.mSpeed !== 0) {
        
        var direction = vec2.fromValues(0,0);
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
        {
            vec2.add(direction, direction, vec2.fromValues(0,1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
        {
            vec2.add(direction, direction, vec2.fromValues(0,-1));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
        {
            vec2.add(direction, direction, vec2.fromValues(-1,0));
        }
        
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
        {
            vec2.add(direction, direction, vec2.fromValues(1,0));
        }
        
        vec2.normalize(direction,direction);
        vec2.scale(direction,direction,this.mSpeed);
        this.getXform().incXPosBy(direction[0]);
        this.getXform().incYPosBy(direction[1]);
        this.setCurrentFrontDir(direction);
    }
};