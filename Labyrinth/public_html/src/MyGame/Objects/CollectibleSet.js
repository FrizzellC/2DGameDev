/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/* 
 * How to use:
 * 1. Instantiate CollectibleSet obj when game scene initializes.
 * 2. Add Collectible objects to using addCollectible.
 * 3. Set update() and draw() in their respective functions in game scene.
 * 4. Set it so when a certain object touches a Collectible, 
 *      collectibleTouches is called.
 */

function CollectibleSet(rooms, texture){
    GameObjectSet.call(this);
    
    this.mItemsRemoved = 0;
    this.reductionModeIsOn = false;
    
    var pos = [];
    for(var i = 0; i < rooms.length; ++i)
    {
        if(i % 8 === 0)
        {
            pos = rooms[i].getXform().getPosition();
            var newCollectible = new Collectible(texture, pos);
            this.addToSet(newCollectible);
        }
    }
}
gEngine.Core.inheritPrototype(CollectibleSet, GameObjectSet);

CollectibleSet.prototype.update = function(){
    GameObjectSet.prototype.update.call(this);
    
    if(this.reductionModeIsOn){
        this.removeCollectible();
    }
};

CollectibleSet.prototype.collectibleTouches = function(GameObject){
    for(var i = 0; i < this.mSet.length; i++){
        if(this.mSet[i].isTouching(GameObject)){
            this.mSet[i].isDisintigrating = true;
            this.mSet[i].disintigrate();
            this.reductionModeIsOn = true;
            this.mItemsRemoved++;
        }
    }
    return false;  
};

//Only use within this class. For removing
//collectible when collectibleTouches is true.
CollectibleSet.prototype.removeCollectible = function(){
    for(var i = 0; i < this.mSet.length; i++){
        if(this.mSet[i].toBeDeleted){
            this.removeFromSet(this.getObjectAt(i));
        }
    }
    this.reductionModeIsOn = false;
};

//To see how many collectibles are left
CollectibleSet.prototype.getItemsRemoved = function(){
    return this.mItemsRemoved;
};

CollectibleSet.prototype.size = function(){
    return this.mSet.length;
};