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
    this.mCollectibleSet = null;
    
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
    this.mRedSq = new SpriteRenderable(this.spriteSheet);
    this.mRedSq.setColor([1, 1, 1, 0]);    
    this.mRedSq.getXform().setPosition(25, 0);    
    this.mRedSq.getXform().setSize(6,9);
    this.mRedSq.setElementPixelPositions(0, 120, 0, 180);
    this.mRedSq = new GameObject(this.mRedSq);
    
    //For testing sprite renderables in collectible object
    this.renderableObj = new SpriteRenderable(this.spriteSheet);
    this.renderableObj.setColor([1, 1, 1, 0]);    
    this.renderableObj.getXform().setPosition(0, 0);    
    this.renderableObj.getXform().setSize(6,9);
    this.renderableObj.setElementPixelPositions(0, 120, 0, 180);
    
    
    this.mCollectible = new Collectible();
    this.mCollectible.setRenderable(this.renderableObj);
    
    this.mCollectibleSet = new CollectibleSet();
    
    for(var i = 0; i < 3; i++){
        var newRenderable = new SpriteRenderable(this.spriteSheet);
        newRenderable.setColor([1, 1, 1, 0]);    
        newRenderable.getXform().setPosition(0 - (i*10), 0);    
        newRenderable.getXform().setSize(6,9);
        newRenderable.setElementPixelPositions(0, 120, 0, 180);
        var newCollectible = new Collectible();
        newCollectible.setRenderable(newRenderable);
        this.mCollectibleSet.addCollectible(newCollectible);
    }
    
    this.mAllParticles = new ParticleGameObjectSet();
   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCam.setupViewProjection();
    
    this.mCollectibleSet.draw(this.mCam);
    
    this.mRedSq.draw(this.mCam);
    
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
  

    
    this.mCollectibleSet.collectibleTouches(this.mRedSq);
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mCollectibleSet.mSet[0].disintigrate();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        var xPos = this.mRedSq.getXform().getXPos();
        this.mRedSq.getXform().setXPos(xPos - 1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        var xPos = this.mRedSq.getXform().getXPos();
        this.mRedSq.getXform().setXPos(xPos + 1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        var yPos = this.mRedSq.getXform().getYPos();
        this.mRedSq.getXform().setYPos(yPos + 1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        var yPos = this.mRedSq.getXform().getYPos();
        this.mRedSq.getXform().setYPos(yPos - 1);
    }
    
    this.mCollectibleSet.update();    

};