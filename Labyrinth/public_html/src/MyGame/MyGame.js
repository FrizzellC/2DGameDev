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

function MyGame() {
    this.mHero = null;
    this.mEnemy = null;
    this.mMainView = null;
    
    this.mMap = null;
    this.mBounds = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
      
};

MyGame.prototype.unloadScene = function () {
    
};

MyGame.prototype.initialize = function () {
    this.mHero = new Player(vec2.fromValues(0, 0));
    this.mEnemy = new Enemy(vec2.fromValues(-25, -25));
    this.mMainView = new MainView();
    
    this.mMap = new RoomBoundingObj();
    this.mBounds = new BoundController(this.mHero, this.mMap.getRooms(), this.mMap.getHallways());
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mMainView.setup();
    
    this.mHero.draw(this.mMainView.getCam());
    this.mEnemy.draw(this.mMainView.getCam());
    //this.mMap.draw(this.mMainView.getCam());
};


// anything from this function!
MyGame.prototype.update = function () {
    this.mHero.update();
    this.mEnemy.update(this.mHero);
    this.mBounds.update();

    this.mMainView.update(this.mHero);
};