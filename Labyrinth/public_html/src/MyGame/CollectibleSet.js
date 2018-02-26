/* 
 * How to use:
 * 1. Instantiate CollectibleSet obj when game scene initializes.
 * 2. Add Collectible objects to using addCollectible.
 * 3. Set update() and draw() in their respective functions in game scene.
 * 4. Set it so when a certain object touches a Collectible, 
 *      collectibleTouches is called.
 */


function CollectibleSet(){
    this.mSet = new Array();
    
    this.reductionModeIsOn = false;
}

CollectibleSet.prototype.addCollectible = function(CollectibleObject){
    this.mSet.push(CollectibleObject);
};

CollectibleSet.prototype.update = function(){
    for(var i = 0; i < this.mSet.length; i++){
        this.mSet[i].update();
    }
    
    if(this.reductionModeIsOn){
        this.removeCollectible();
    }
};

CollectibleSet.prototype.draw = function(camera){
    for(var i = 0; i < this.mSet.length; i++){
        this.mSet[i].draw(camera);
    }
};

CollectibleSet.prototype.collectibleTouches = function(GameObject){
    for(var i = 0; i < this.mSet.length; i++){
        if(this.mSet[i].isTouching(GameObject)){
            this.mSet[i].isDisintigrating = true;
            this.mSet[i].disintigrate();
            this.reductionModeIsOn = true;
        }
    }
    return false;  
};

//Only use within this class. For removing
//collectible when collectibleTouches is true.
CollectibleSet.prototype.removeCollectible = function(){
    var newSet = new Array();
    for(var i = 0; i < this.mSet.length; i++){
        if(!this.mSet[i].toBeDeleted){
            newSet.push(this.mSet[i]);
            this.reductionModeIsOn = false;
        }
    }
    this.mSet = newSet;
};