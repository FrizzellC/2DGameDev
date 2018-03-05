/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, LightRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Background(texture) {
    LightRenderable.call(this, texture);
    this.setColor([1, 1, 1, 0]);
    this.getXform().setPosition(0, 0);
    this.getXform().setSize(400, 200);
};
gEngine.Core.inheritPrototype(Background, LightRenderable);