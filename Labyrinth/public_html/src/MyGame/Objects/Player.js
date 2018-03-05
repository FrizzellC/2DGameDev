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
    this.mIceLerp = null;
    
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
    var pos = vec2.create();
    vec2.scaleAndAdd(pos, this.getXform().getPosition(), this.mCurrentFrontDir, 30);
    this.mIceLerp = new InterpolateVec2(this.mSprite.getXform().getPosition(), 60, .1);
    this.mIceLerp.setFinalValue(pos);
};

Player.prototype._onSand = function () {
    return this.mMap.isOnSand();
};

Player.prototype._onIce = function () {
    return this.mMap.isOnIce();
};

Player.prototype.getSprite = function () {
    return this.mSprite;
};

Player.prototype.getLowerBounds = function () {
    var xform = this.getXform();
    var offset = vec2.fromValues(0, xform.getHeight() / 4);
    vec2.sub(offset, xform.getPosition(), offset);
    var b = new BoundingBox(offset, xform.getWidth(), xform.getHeight() / 2);
    return b;
};