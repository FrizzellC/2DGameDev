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
    this.kEnemySprite = "assets/Textures/TempBadCloud.png";
    this.kCollectibleSprite = "assets/Textures/TempCollectZ.png";
    this.kBackground = "assets/Textures/BG_RedLineDoc.png";
    
    this.mGameWon = false;
    
    this.mPlayer = null;
    this.mHelpViewManager = null;
    
    this.mCollectible = null;
    this.mCollectibleSet = null;
    
    this.mEnemies = null;
    this.mMainView = null;
    
    this.mMap = null;
    this.mBounds = null;
    
    this.mBackground = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.spriteSheet);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCollectibleSprite);
    gEngine.Textures.loadTexture(this.kEnemySprite);
    gEngine.Textures.loadTexture(this.kBackground);
      
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.spriteSheet);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCollectibleSprite);
    gEngine.Textures.unloadTexture(this.kEnemySprite);
    gEngine.Textures.unloadTexture(this.kBackground);
    
    var nextLevel;
    if (this.mGameWon) {
        nextLevel = new WinScene();
    } else {
        nextLevel = new LoseScene();
    }
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    
    //Initializing player
    this.mPlayer = new Player(vec2.fromValues(0,0), this.kHeroSprite);
    
    this.mAllParticles = new ParticleGameObjectSet();
   
    
    this.mMainView = new MainView();
    this.mMainView.setup();
    
    this.mMap = new RoomBoundingObj(this.mMainView.getCam());
    this.mBounds = new BoundController(this.mPlayer, this.mMap.getRooms(), this.mMap.getHallways());
    this.mBackground = new Background(this.kBackground);
    this.mEnemies = new EnemySet(this.mMap.getRooms(), this.kEnemySprite);
    this.mCollectibleSet = new CollectibleSet(this.mMap.getRooms(), this.kCollectibleSprite);
    this.mHelpViewManager = new HelpViewManager(this.mCollectibleSet, this.kCollectibleSprite);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mMainView.setup();
    
    this.mBackground.draw(this.mMainView.getCam());
    this.mMap.draw(this.mMainView.getCam());
    this.mCollectibleSet.draw(this.mMainView.getCam());
    
    this.mPlayer.draw(this.mMainView.getCam());
    this.mEnemies.draw(this.mMainView.getCam());
    
    this.mHelpViewManager.draw();
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    
    this.mCollectibleSet.collectibleTouches(this.mPlayer);
    
    this.mCollectibleSet.update();    

    this.mPlayer.update();
    this.mHelpViewManager.update();

    this.mEnemies.update(this.mPlayer);
    this.mBounds.update();

    this.mMainView.update(this.mPlayer);

    //Checking if we've collected all Z's
    if (this.mHelpViewManager.allItemsCollected()) {
        this.mGameWon = true;
    }

    //TODO remove later. For debugging purposes.
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        gEngine.GameLoop.stop();
    }

};