/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Background(texture) {
    this.mBackground = new TextureRenderable(texture);
    this.mBackground.setColor([1, 1, 1, 0]);
    this.mBackground.getXform().setPosition(0, 0);
    this.mBackground.getXform().setSize(400, 200);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Background.prototype.draw = function (cam) {
    this.mBackground.draw(cam);
};