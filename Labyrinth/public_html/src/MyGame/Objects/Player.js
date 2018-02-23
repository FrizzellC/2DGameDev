/*
 * File: Player.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Player.ePlayerState = Object.freeze({
    Normal: 0,
    Boost: 1, 
    Shoot: 2
});

function Player(pos) {
    this.mCurrentState = null;
    this.mSpeed = null;
    this._transitionToNormal();
    this.mSprite = new Renderable();
    this.mSprite.getXform().setPosition(pos[0], pos[1]);
    this.mSprite.getXform().setSize(5, 5);
    this.mSprite.setColor([0, 1, 0, 1]);
    GameObject.call(this, this.mSprite);
    
    // Shake helpers
    this.mStartPos = null;
    this.mShakePos = null;
    
    // Power up helpers
    this.mPowerStart = null;
    this.kPowerLength = 5; //seconds
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype._transitionToNormal = function () {
    this.mSpeed = 30 / 60;
    this.mCurrentState = Player.ePlayerState.Normal;
};

Player.prototype._transitionToBoost = function () {
    this.mSpeed = 45 / 60;
    this.mPowerStart = Date.getTime();
    this.mCurrentState = Player.ePlayerState.Boost;
};

Player.prototype._transitionToShoot = function () {
    this.mSpeed = 30 / 60;
    this.mPowerStart = Date.getTime();
    this.mCurrentState = Player.ePlayerState.Shoot;
};