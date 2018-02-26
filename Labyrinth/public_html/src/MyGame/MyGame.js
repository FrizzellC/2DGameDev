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
    this.mConstColorShader = null;
    this.kParticleTexture = "assets/particle.png";
    this.spriteSheet = "assets/minion_sprite.png";
    
    this.mRedSq = null;
    this.renderableObj = null;
    this.mCollectible = null;
    
    this.mCam = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.spriteSheet);
      
};

MyGame.prototype.unloadScene = function () {
    
};

MyGame.prototype.initialize = function () {
    
    this.mConstColorShader = new SimpleShader(
    "src/GLSLShaders/SimpleVS.glsl",   // Path to the VertexShader 
    "src/GLSLShaders/SimpleFS.glsl");  // Path to the Simple FragmentShader   
    
    this.mCam = new Camera(
        vec2.fromValues(0, 0),  // position of the camera
        100,                      // width of camera
        [0, 0, 800, 600],        // viewport (orgX, orgY, width, height)
    );
    this.mCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    //For testing renderables in collectible object
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([0, 0, 0, 0]);
    this.mRedSq.getXform().setPosition(0, 0);
    this.mRedSq.getXform().setSize(10, 10);
    
    //For testing sprite renderables in collectible object
    this.renderableObj = new SpriteRenderable(this.spriteSheet);
    this.renderableObj.setColor([1, 1, 1, 0]);    
    this.renderableObj.getXform().setPosition(0, 0);    
    this.renderableObj.getXform().setSize(12,18);
    this.renderableObj.setElementPixelPositions(0, 120, 0, 180);
    
    
    this.mCollectible = new Collectible();
    this.mCollectible.setRenderable(this.renderableObj);
    
    this.mAllParticles = new ParticleGameObjectSet();
   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCam.setupViewProjection();
    
    this.mCollectible.draw(this.mCam);
    
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
  
    this.mCollectible.update();     

    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mCollectible.disintigrateModeOn();
    }
    

};