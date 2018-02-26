/*
 * File: LoseScene.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LoseScene() {
    
    this.mCamera = null;
    this.mEndGameMessage = null;
}
gEngine.Core.inheritPrototype(LoseScene, Scene);

LoseScene.prototype.loadScene = function () {
    
};

LoseScene.prototype.unloadScene = function () {
  
    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

LoseScene.prototype.initialize = function () {


    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),  // position of the camera
        100,                      // width of camera
        [0, 0, 800, 600],        // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);


    this.mEndGameMessage = new FontRenderable("YOU LOSE");
    this.mEndGameMessage.setColor([0, 0, 0, 1]);
    this.mEndGameMessage.getXform().setPosition((this.mCamera.getWCWidth() /2) - 10,
                                                this.mCamera.getWCHeight() /2);
    //this.mEndGameMessage.getXform().setPosition(5,5);
    this.mEndGameMessage.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    this.mEndGameMessage.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LoseScene.prototype.update = function () {

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        gEngine.GameLoop.stop();
    }
    
};