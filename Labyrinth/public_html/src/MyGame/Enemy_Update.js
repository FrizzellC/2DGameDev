/*
 * File: Enemy.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, Enemy */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Enemy.prototype.update = function (hero) {
    switch(this.mCurrentState) {
        case Enemy.eEnemyState.Patrol:
            this._updatePatrol(hero);
            break;
        case Enemy.eEnemyState.Chase:
            this._updateChase(hero);
            break;
        case Enemy.eEnemyState.Alert:
            this._updateAlert();
            break;
        case Enemy.eEnemyState.Catch:
            this._updateCatch();
            break;
    }
};


Enemy.prototype._updatePatrol = function (hero) {
    var distance = vec2.distance(this.mSprite.getXform().getPosition(), hero.getXform().getPosition());
    if(distance < 30)
    {
        this._transitionToAlert();
    }
    else
    {
        this.mTargetPos = this._getNextPatrolNode();
        this.rotateObjPointTo(this.mTargetPos, 0.1);
        this._updatePos();
    }
};

Enemy.prototype._updateChase = function (hero) {
    var touchPos = vec2.create();
    if(GameObject.pixelTouches.call(this, hero, touchPos))
    {
        this._transitionToCatch();
    }
    else
    {
        this.mTargetPos = this._getNextChaseNode(hero.getXform.getPosition());
        this.rotateObjPointTo(this.mTargetPos, 0.1);
        this._updatePos();
    }
    
};

Enemy.prototype._updateAlert = function () {
    //Shake size quickly, then chase
};

Enemy.prototype._updateCatch = function () {
    //Something to indicate collision with hero, then game over
};

Enemy.prototype._updatePos = function () {
    if(this.mSpeed !== 0)
    {
        var pos = this.mSprite.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }
};