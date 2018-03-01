/*
 * File: HelpViewManager.js 
 * This object is in charge of displaying score, and game tips.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


function HelpViewManager(collectibleSet, sprite) {
    
    //Starting Time
    this.mTimeLimit = 90; //Measured in seconds
    this.mTimeLeft = this.mTimeLimit * 60;
    
    this.collectibles = collectibleSet;
    this.mItemsCollected = [];
    this.mCollectibleSprite = sprite;
    
    this.mItemsNeededToWin = this.collectibles.size();
    this.mNumItemsCollected = this.collectibles.getItemsRemoved();
    
    
    this.mCamera = new Camera(
        vec2.fromValues(25, 25), // position of the camera
        50,                       // width of camera
        [1000, 400, 200, 200]           // viewport (orgX, orgY, width, height)
    );
    
    this.mCamera.setBackgroundColor([0.8, 0.8, 1, 1]);
    
    
    this.mTimerMsg = new FontRenderable("Time Remaining: ##:##");
    this.mTimerMsg.setColor([0, 0, 0, 1]);
    this.mTimerMsg.getXform().setPosition(1, this.mCamera.getWCHeight() - 3);
    this.mTimerMsg.setTextHeight(3);
    
    this.mTipMsg = new FontRenderable("   Tip: Use WASD to move!");
    this.mTipMsg.setColor([0, 0, 0, 1]);
    this.mTipMsg.getXform().setPosition(1, this.mCamera.getWCHeight() / 1.5);
    this.mTipMsg.setTextHeight(3);
    
    this.mScoreMsg = new FontRenderable("      Items Collected");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(1, this.mCamera.getWCHeight() / 3);
    this.mScoreMsg.setTextHeight(3);
    
}

HelpViewManager.prototype.addCollectedItem = function() {
    var nItem = new SpriteRenderable(this.mCollectibleSprite);
    var nItemSize = 5;
    var offset = 5;
    // We set the position so that it's always below our score text, and always
    // spaced according to how many items we have.
    nItem.getXform().setPosition(offset + ((nItemSize + offset) * this.mItemsCollected.length), 
                                this.mScoreMsg.getXform().getYPos() / 2);
    nItem.getXform().setSize(nItemSize, nItemSize);
    this.mItemsCollected.push(nItem);
    
//    var initX = (this.mCamera.getWCWidth() / 2) - ((nItemSize + offset) * this.mItemsCollected.length);
//    var initY = this.mScoreMsg.getXform().getYPos() / 2;
//    
//    var i;
//    for (i = 0; i < this.mItemsCollected.length; i++) {
//        
//        this.mItemsCollected[i].getXform().setXPos(initX + (nItemSize + offset) * this.mItemsCollected.length);
//        
//    }
    
};

HelpViewManager.prototype.update = function () {
    var timerMsg;
    this.mTimeLeft -= 1;
    
    if (this.mTimeLeft >= 0) {
        timerMsg = "Time Remaining: " + (this.mTimeLeft / 60).toPrecision(3) +
                " seconds";
    } else {
        timerMsg = "Time Remaining: None";
    }
    
    if (this.mNumItemsCollected < this.collectibles.getItemsRemoved()) {
        this.mNumItemsCollected++;
        this.addCollectedItem();
    }
    
    this.mTimerMsg.setText(timerMsg);
};

HelpViewManager.prototype.draw = function () {
    this.mCamera.setupViewProjection();
    this.mTimerMsg.draw(this.mCamera);
    this.mTipMsg.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
    
    var i;
    for(i = 0; i < this.mItemsCollected.length; i++) {
        this.mItemsCollected[i].draw(this.mCamera);
    }
};

HelpViewManager.prototype.allItemsCollected = function () {
    if (this.mItemsCollected.length === this.mItemsNeededToWin) {
        return true;
    } else {
        return false;
    }
};