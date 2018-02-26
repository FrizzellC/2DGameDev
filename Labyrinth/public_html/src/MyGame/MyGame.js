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
    this.kHeroSprite = "assets/Textures/TempHero.png";
    this.kCollectibleSprite = "assets/Textures/TempCollectZ.png";
    
    this.mPlayer = null;
    this.mHelpViewManager = null;
    
    this.mRedSq = null;
    this.renderableObj = null;
    this.mCollectible = null;
    this.mCollectibleSet = null;
    
    //this.mCam = null;

 //   this.mHero = null;
    this.mEnemy = null;
    this.mMainView = null;
    
    this.mMap = null;
    this.mBounds = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.spriteSheet);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCollectibleSprite);
      
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.spriteSheet);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCollectibleSprite);
};

MyGame.prototype.initialize = function () {
    
    this.mConstColorShader = new SimpleShader(
    "src/GLSLShaders/SimpleVS.glsl",   // Path to the VertexShader 
    "src/GLSLShaders/SimpleFS.glsl");  // Path to the Simple FragmentShader   
    
//    this.mCam = new Camera(
//        vec2.fromValues(0, 0),  // position of the camera
//        100,                      // width of camera
//        [0, 0, 800, 600],        // viewport (orgX, orgY, width, height)
//    );
//    this.mCam.setBackgroundColor([0.8, 0.8, 0.8, 1]);
   
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
        var newRenderable = new SpriteRenderable(this.kCollectibleSprite);
        newRenderable.setColor([1, 1, 1, 0]);    
        newRenderable.getXform().setPosition(0 - (i*10), 0);    
        newRenderable.getXform().setSize(3,3);
        //newRenderable.setElementPixelPositions(0, 120, 0, 180);
        var newCollectible = new Collectible();
        newCollectible.setRenderable(newRenderable);
        this.mCollectibleSet.addCollectible(newCollectible);
    }
    
           //Initializing player
    this.mPlayer = new Player(vec2.fromValues(0,0), this.kHeroSprite);
    this.mHelpViewManager = new HelpViewManager(this.mCollectibleSet, this.kCollectibleSprite);
    
    this.mAllParticles = new ParticleGameObjectSet();
   

    //this.mHero = new Player(vec2.fromValues(0, 0));
    this.mEnemy = new Enemy(vec2.fromValues(-25, -25));
    this.mMainView = new MainView();
    
    this.mMap = new RoomBoundingObj();
    this.mBounds = new BoundController(this.mPlayer, this.mMap.getRooms(), this.mMap.getHallways());

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    

    //this.mCam.setupViewProjection();
 

    this.mMainView.setup();
   
    this.mCollectibleSet.draw(this.mMainView.getCam());
    
    //this.mRedSq.draw(this.mCam);
    this.mPlayer.draw(this.mMainView.getCam());
    this.mHelpViewManager.draw();
    
    this.mEnemy.draw(this.mMainView.getCam());
    //this.mMap.draw(this.mMainView.getCam());
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
  

    
    this.mCollectibleSet.collectibleTouches(this.mPlayer.getSprite());
    
    this.mCollectibleSet.update();    

    this.mPlayer.update();
    this.mHelpViewManager.update();

    this.mEnemy.update(this.mPlayer);
    //this.mBounds.update();

    this.mMainView.update(this.mPlayer);

};