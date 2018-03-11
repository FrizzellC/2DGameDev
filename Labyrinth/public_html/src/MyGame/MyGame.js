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
    this.kParticleTexture = "assets/particle.png";
    this.kHeroSprite = "assets/Textures/TempHero.png";
    this.kEnemySprite = "assets/Textures/LabyrinthSprites.png";
    this.kCollectibleSprite = "assets/Textures/TempCollectZ.png";
    this.kBackground = "assets/Textures/bgLabrynth.png";
    this.kZHolder = "assets/Textures/TempCollectZHolder.png";
    this.kMiniMapBackground = "assets/Textures/bgLabrynth.png";
    this.kMiniHeroSprite = "assets/Textures/TempHeroHead.png";
    this.kBGAudio = "assets/audio/background.mp3";
    
    this.mPlayer = null;
    this.mHelpViewManager = null;
    this.mMiniMapManager = null;
    
    this.mCollectible = null;
    this.mCollectibleSet = null;
    
    this.mPassage1 = null;
    this.mPassage2 = null;
    
    this.mEnemies = null;
    this.mMainView = null;
    
    this.mMap = null;
    this.mBounds = null;
    
    this.mBackground = null;
    this.mHeroAmbush = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCollectibleSprite);
    gEngine.Textures.loadTexture(this.kEnemySprite);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kZHolder);
    gEngine.Textures.loadTexture(this.kMiniMapBackground);
    gEngine.Textures.loadTexture(this.kMiniHeroSprite);
    
    gEngine.AudioClips.loadAudio(this.kBGAudio);      
};

MyGame.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGAudio);
    
    var nextLevel;
    if (this.isGameWon()) {
        nextLevel = new WinScene();
    } else {
        nextLevel = new LoseScene();
    }
    
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCollectibleSprite);
    gEngine.Textures.unloadTexture(this.kEnemySprite);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kZHolder);
    gEngine.Textures.unloadTexture(this.kMiniMapBackground);
    gEngine.Textures.unloadTexture(this.kMiniHeroSprite);
    
    
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    this.mPlayer = new Player(vec2.fromValues(0,0), this.kEnemySprite, new MapInteraction());   
    this.mMainView = new MainView();    
    this.mMap = new RoomBoundingObj();
    this.mBounds = new BoundController(this.mPlayer, this.mMap.getRooms(), this.mMap.getHallways());
    this.mBackground = new Background(this.kBackground);
    this.mEnemies = new EnemySet(this.mMap.getRooms(), this.kEnemySprite);
    this.mCollectibleSet = new CollectibleSet(this.mMap.getRooms(), this.kCollectibleSprite);
    this.mHelpViewManager = new HelpViewManager(this.mCollectibleSet, this.kCollectibleSprite, this.kZHolder);
    this.mMiniMapManager = new MiniMapManager(this.mPlayer, this.mCollectibleSet, this.kMiniHeroSprite, this.kCollectibleSprite, this.kMiniMapBackground);
    this.mHeroAmbush = false;
    this.mPassage1 = new PassageController(this.mPlayer, [-159,75,-124,73],[8,86,12,76] );
    this.mPassage2 = new PassageController(this.mPlayer, [-160,44,-150,38], [-160,20,-150,17]);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBGAudio);

    for(var i = 0; i < this.mCollectibleSet.size(); i++){
        this.mBackground.addLight(this.mCollectibleSet.mSet[i].mLight);
    }
    this.mBackground.addLight(this.mPlayer.mFlashLight.mLight);
    this.mEnemies.addLight(this.mPlayer.mFlashLight.mLight);
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
    this.mMiniMapManager.draw();
};


// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {    
    this.mCollectibleSet.collectibleTouches(this.mPlayer);
    this.mCollectibleSet.update();    

    this.mPlayer.update();
    this.mHelpViewManager.update();
    this.mMiniMapManager.update();

    this.mEnemies.update(this.mPlayer);
    this.mBounds.update();

    this.mMainView.update(this.mPlayer);
    
    this.mPassage1.update();
    this.mPassage2.update();

    //TODO remove later. For debugging purposes.
    if (this.isGameLost()) {
        gEngine.GameLoop.stop();
    } else if(this.isGameWon())
    {
        gEngine.GameLoop.stop();
    }
    
    //TODO remove later. For debugging purposes.
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.B))
    {
        console.log(this.mPlayer.getXform().getPosition());
    }
    this.isWithinBedroom();
    this.updateHeroAmbush();
};

// Check if the player has met win conditions
MyGame.prototype.isGameWon = function () {
    
    
    
    if (this.mHelpViewManager.allItemsCollected() &&
        this.isWithinBedroom()) {
        
        return true;
    } else {
        return false;
    }
};

// Check if the player has met win conditions
MyGame.prototype.isGameLost = function () {
    
    
    
    if (!this.mHelpViewManager.isTimeLeft()) {
        
        return true;
    } else {
        return false;
    }
};

// Check if the player is in the correct room
MyGame.prototype.isWithinBedroom = function () {
    if (Math.abs(this.mPlayer.getXform().getXPos()) < (this.mMap.getRooms()[0].getXform().getWidth() / 2) &&
        Math.abs(this.mPlayer.getXform().getYPos()) < (this.mMap.getRooms()[0].getXform().getHeight() / 2)) {// 504 , 278
        
        return true;
    } else {
        return false;
    }
};

MyGame.prototype.updateHeroAmbush = function () {
    var pos = this.mPlayer.getXform().getPosition();
    var playerNearby = this.mCollectibleSet.isPlayerNearby(pos);
    if(!this.mHeroAmbush && playerNearby)
    {
        this.mEnemies.transitionToChase(this.mPlayer, true);
        this.mHeroAmbush = true;
    }
    else if(this.mHeroAmbush && !playerNearby)
    {
        this.mEnemies.transitionToChase(this.mPlayer, false);
        this.mHeroAmbush = false;
    }
};