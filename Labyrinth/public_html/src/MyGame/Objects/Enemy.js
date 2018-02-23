/*
 * File: Enemy.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Enemy.eEnemyState = Object.freeze({
    Patrol: 0,
    Chase: 1, 
    Alert: 2,
    Catch: 3
});

function Enemy(pos) {
    this.mTargetPos = pos;
    this.mSpeed = null;       //Units per frame
    this.mCurrentState = null;
    this._transitionToPatrol();
    this.mSprite = new Renderable();
    this.mSprite.getXform().setPosition(pos[0], pos[1]);
    this.mSprite.getXform().setSize(5, 5);
    this.mSprite.setColor([1, 0, 0, 1]);
    GameObject.call(this, this.mSprite);
    
    // Shake helpers
    this.mStartPos = null;
    this.mShakePos = null;
    
    // Patrol/Chase threshold
    this.kChaseThreshold = 30;
    this.kPatrolThreshold = 20;
    
    // Rotation interpolator
    this.mRotater = new InterpolateVec2(this.getCurrentFrontDir(), 60, .05);
}
gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype._transitionToCatch = function () {
    this.mSpeed = 0;
    this.mCurrentState = Enemy.eEnemyState.Catch;
};

Enemy.prototype._transitionToPatrol = function () {
    this.mSpeed = 10 / 60;
    this.mCurrentState = Enemy.eEnemyState.Patrol;
};

Enemy.prototype._transitionToAlert = function () {
    this.mSpeed = 0;
    this.mCurrentState = Enemy.eEnemyState.Alert;
    this.mStartPos = this.mSprite.getXform().getPosition();
    this.mShakePos = new ShakePosition(.5, .5, 20, 60);
};

Enemy.prototype._transitionToChase = function () {
    this.mSpeed = 15 / 60;
    this.mCurrentState = Enemy.eEnemyState.Chase;
};

Enemy.prototype._getNextChaseNode = function () {
    if(vec2.distance(this.mSprite.getXform().getPosition(), this.mTargetPos) < 1)
    {
        // find next node along shortest path to hero
    }
};

Enemy.prototype._getNextPatrolNode = function () {
    if(vec2.distance(this.mSprite.getXform().getPosition(), this.mTargetPos) < 1)
    {
        // find next node to patrol towards
    }
};