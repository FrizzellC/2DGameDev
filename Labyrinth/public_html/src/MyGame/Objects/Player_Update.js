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
    // if colliding with power up, transition
    //else
    {
    //    this._updateRot();
        this._updatePos();
    }
};

Player.prototype._updateBoost = function () {
    if(this._powerUpDone())
    {
        this._transitionToNormal();
    }
    else
    {
    //   this._updateRot();
        this._updatePos();
    }
};

Player.prototype._updateShoot = function () {
    if(this._powerUpDone())
    {
        this._transitionToNormal();
    }
    else
    {
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
        {
            // Shoot projectile
        }
        // this._updateRot();
        this._updatePos();
    }
};

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

Player.prototype._updatePos = function () {
//    if(this.mSpeed !== 0)
//    {
//        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
//        {
//            var pos = this.mSprite.getXform().getPosition();
//            vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
//        }
//        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
//        {
//            var pos = this.mSprite.getXform().getPosition();
//            var backDir = vec2.create();
//            vec2.negate(backDir, this.getCurrentFrontDir());
//            vec2.scaleAndAdd(pos, pos, backDir, this.mSpeed);
//        }
//    }
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