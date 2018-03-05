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
    GameObject.prototype.update.call(this);
};


Enemy.prototype._updatePatrol = function (hero) {
    var dist = vec2.distance(this.mSprite.getXform().getPosition(), hero.getXform().getPosition());
    if(dist < this.kPatrolThreshold)
    {
        this.transitionToAlert();
    }
    else
    {
        this.mTargetPos = this._getNextPatrolNode();
        this.rotateObjPointTo(this.mTargetPos, this.mRotater);
        this._updatePos();
    }
};

Enemy.prototype._updateChase = function (hero) {
    var touchPos = vec2.create();
    var dist = vec2.distance(hero.getXform().getPosition(), this.mSprite.getXform().getPosition());
    if(GameObject.prototype.pixelTouches.call(this, hero, touchPos))
    {
        this.transitionToCatch();
    }
    else if(dist > this.kChaseThreshold)
    {
        this.transitionToPatrol();
    }
    else
    {
        this.mTargetPos = hero.getXform().getPosition();
        this.rotateObjPointTo(this.mTargetPos, this.mRotater);
        this._updatePos();
    }
};

Enemy.prototype._updateAlert = function () {
    if(this.mShakePos.shakeDone())
    {
        this.transitionToChase();
    }
    else
    {
        var offset = this.mShakePos.getShakeResults();
        vec2.add(this.mSprite.getXform().getPosition(), this.mStartPos, offset);
    }
};

Enemy.prototype._updateCatch = function () {
    gEngine.GameLoop.stop();
};

Enemy.prototype._updatePos = function () {
    if(this.mSpeed !== 0)
    {
        var pos = this.mSprite.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
    }
};