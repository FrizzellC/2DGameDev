/*
 * File: HelpViewManager.js 
 * This object is in charge of displaying score, and game tips.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */


function HelpViewManager(collectibleSet, sprite, spriteHolder) {
    
    //Starting Time
    this.mTimeLimit = 90; //Measured in seconds
    this.mTimeLeft = this.mTimeLimit * 60;
    
    this.collectibles = collectibleSet;
    this.mItemsToCollect = [];
    this.mItemsCollected = [];
    this.mCollectibleSprite = sprite;
    this.mCollectibleHolder = spriteHolder;
    
    //For collectible display
    this.mCollectibleSize = 4;
    this.mCollectibleOffset = 2;
    this.mInitCollectibleX;
    
    this.mItemsNeededToWin = this.collectibles.size();
    this.mNumItemsCollected = this.collectibles.getItemsRemoved();
    
    
    this.mCamera = new Camera(
        vec2.fromValues(25, 25), // position of the camera
        50,                       // width of camera
        [1200, 200, 400, 400]           // viewport (orgX, orgY, width, height)
    );
    
    this.mCamera.setBackgroundColor([0.8, 1, 1, 1]);
    
    //This variable will contain all the text items below.
    this.mText = [];
    this.mGameTips = ["Use WASD to move!",
                      "Collect all the Zs!",
                      "Don't touch clouds!",
                      "Blue means slippery!"
                      ];
    this.mTipChanged = false;
    
    
    this.mGameTipIndex = 0;
    
    this.mTimeRemainingTxt = new FontRenderable("TIME REMAINING:");
    this.mTimeRemainingTxt.setColor([0, 0, 0, 1]);
    this.mTimeRemainingTxt.getXform().setPosition(5, this.mCamera.getWCHeight() - 3);
    this.mTimeRemainingTxt.setTextHeight(5);
    this.mText.push(this.mTimeRemainingTxt);
    
    this.mTimerMsg = new FontRenderable("[time left here]");
    this.mTimerMsg.setColor([0, 0, 0, 1]);
    this.mTimerMsg.getXform().setPosition(15, this.mCamera.getWCHeight() - 10);
    this.mTimerMsg.setTextHeight(4);
    this.mText.push(this.mTimerMsg);
    
    this.mTipMsg = new FontRenderable("   Tip: Use WASD to move!");
    this.mTipMsg.setColor([0, 0, 0, 1]);
    this.mTipMsg.getXform().setPosition(0.5, this.mCamera.getWCHeight() / 1.8);
    this.mTipMsg.setTextHeight(3);
    this.mText.push(this.mTipMsg);
    
    this.mScoreMsg = new FontRenderable("        Zs Collected");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(1, this.mCamera.getWCHeight() / 3);
    this.mScoreMsg.setTextHeight(3);
    this.mText.push(this.mScoreMsg);
    
    this.mInitCollectibleX = ((this.mCamera.getWCWidth() / (this.collectibles.size() + (this.mCollectibleSize * 2) + this.mCollectibleOffset)) - this.mCollectibleOffset);
    this.generateItemsToCollect();
    
}

HelpViewManager.prototype.addCollectedItem = function() {
    var nItem = new SpriteRenderable(this.mCollectibleSprite);
    var nItemSize = this.mCollectibleSize;
    var offset = 2;
    this.mInitCollectibleX += nItemSize + offset;
    var nItemXPos = this.mInitCollectibleX;
    // We set the position so that it's always below our score text, and always
    // spaced according to how many items we have.
    nItem.getXform().setPosition(nItemXPos, 
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

HelpViewManager.prototype.generateItemsToCollect = function() {
    var nZSize = this.mCollectibleSize;
    var offset = this.mCollectibleOffset;
    var initXPos = ((this.mCamera.getWCWidth() / (this.collectibles.size() + (nZSize * 2) + offset)) - offset);
    
    var i;
    for (i = 0; i < this.collectibles.size(); i++) {
        var nZ = new SpriteRenderable(this.mCollectibleHolder);
        
        initXPos += nZSize + offset;
        nZ.getXform().setPosition(initXPos,this.mScoreMsg.getXform().getYPos() / 2);
        
        nZ.getXform().setSize(nZSize, nZSize);
        this.mItemsToCollect.push(nZ);
    }
    
};

HelpViewManager.prototype.generateNextTip = function () {
    if ((Math.round(this.mTimeLeft / 60) % 10) === 0 && !this.mTipChanged) {
        
        this.mTipMsg.setText("TIP: " + this.mGameTips[this.mGameTipIndex]);
        this.mTipMsg.getXform().setXPos((this.mCamera.getWCWidth() / 2) - (this.mTipMsg.getXform().getWidth() / 2));
        
        this.mGameTipIndex++;
        if (this.mGameTipIndex >= this.mGameTips.length) {
            this.mGameTipsIndex = 0;
        }
        
        this.mTipChanged = true;
    } else if ((Math.round(this.mTimeLeft / 60) % 10) !== 0) {
        
        this.mTipChanged = false;
        
    }
};

HelpViewManager.prototype.update = function () {
    var timerMsg;
    this.mTimeLeft -= 1;
    
    if (this.mTimeLeft >= 0) {
        timerMsg = (Math.round(this.mTimeLeft / 60) + " seconds");
        this.mTimerMsg.setTextHeight(5 * (this.mTimeLeft / (this.mTimeLimit * 60)) + 0.01);
        this.mTimerMsg.getXform().setPosition((this.mCamera.getWCWidth() / 2) - (this.mTimerMsg.getXform().getWidth() / 2),this.mCamera.getWCHeight() - 10);
        this.mTimeRemainingTxt.setColor([1 - (this.mTimeLeft / (this.mTimeLimit * 60)),0,0,1]);
        this.mTimerMsg.setColor([1 - (this.mTimeLeft / (this.mTimeLimit * 60)),0,0,1]);
    } else {
        timerMsg = "None";
    }
    
    if (this.mNumItemsCollected < this.collectibles.getItemsRemoved()) {
        this.mNumItemsCollected++;
        this.addCollectedItem();
    }
    
    this.generateNextTip();
    
    
    this.mTimerMsg.setText(timerMsg);
};

HelpViewManager.prototype.draw = function () {
    this.mCamera.setupViewProjection();
//    this.mTimerMsg.draw(this.mCamera);
//    this.mTipMsg.draw(this.mCamera);
//    this.mScoreMsg.draw(this.mCamera);
    
    var k;
    for(k = 0; k < this.mItemsToCollect.length; k++) {
        this.mItemsToCollect[k].draw(this.mCamera);
    }
    
    var i;
    for(i = 0; i < this.mItemsCollected.length; i++) {
        this.mItemsCollected[i].draw(this.mCamera);
    }
    
    var j;
    for(j = 0; j < this.mText.length; j++) {
        this.mText[j].draw(this.mCamera);
    }
};



HelpViewManager.prototype.allItemsCollected = function () {
    if (this.mItemsCollected.length === this.mItemsNeededToWin) {
        return true;
    } else {
        return false;
    }
};

HelpViewManager.prototype.isTimeLeft = function () {
    if (this.mTimeLeft > 0) {
        return true;
    } else {
        return false;
    }
};