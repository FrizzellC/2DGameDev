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

//TESTING TESTING 123

function MyGame() {
    this.mHero = null;
    this.mEnemy = null;
    this.mCam = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
      
};

MyGame.prototype.unloadScene = function () {
    
};

MyGame.prototype.initialize = function () {
    this.mHero = new Player(vec2.fromValues(0, 0));
    this.mEnemy = new Enemy(vec2.fromValues(-25, -25));
    this.mCam = new Camera(
        vec2.fromValues(0, 0),  // position of the camera
        100,                      // width of camera
        [0, 0, 1000, 700],        // viewport (orgX, orgY, width, height)
        2
    );
    this.mCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCam.setupViewProjection();
    
    this.mHero.draw(this.mCam);
    this.mEnemy.draw(this.mCam);
    
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mHero.update();
    this.mEnemy.update(this.mHero);
};