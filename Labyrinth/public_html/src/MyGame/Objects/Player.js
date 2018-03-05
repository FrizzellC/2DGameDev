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
    OnIce: 1, 
    OnSand: 2
});

function Player(pos, sprite, map) {
    this.mCurrentState = null;
    this.mSpeed = null;
    this._transitionToNormal();
    this.mSprite = new SpriteRenderable(sprite);
    this.mSprite.getXform().setPosition(pos[0], pos[1]);
    this.mSprite.getXform().setSize(5, 5);
    this.mSprite.setColor([1, 1, 1, 0]);
    
    // Shake helpers
    this.mStartPos = null;
    this.mShakePos = null;
    
    // Map Interaction
    this.mMap = map;
    
    this.mFlashLight = new FlashLight();
    
    GameObject.call(this, this.mSprite);
}
gEngine.Core.inheritPrototype(Player, GameObject);

Player.prototype._transitionToNormal = function () {
    this.mSpeed = 30 / 60;
    this.mCurrentState = Player.ePlayerState.Normal;
};

Player.prototype._transitionToOnSand = function () {
    this.mSpeed = 15 / 60;
    this.mCurrentState = Player.ePlayerState.OnSand;
};

Player.prototype._transitionToOnIce = function () {
    this.mSpeed = 5 / 60;
    this.mCurrentState = Player.ePlayerState.OnIce;
};

Player.prototype._onSand = function () {
    return this.mMap.isOnSand();
};

Player.prototype._onIce = function () {
    return this.mMap.isOnIce();
};

//code for slowing down player in "high-friction" area
Player.prototype._transitionToSlow = function () {
    this.mSpeed = 15 / 60;
    this.mCurrentState = Player.ePlayerState.Slow;
};

Player.prototype.getSprite = function () {
    return this.mSprite;
};