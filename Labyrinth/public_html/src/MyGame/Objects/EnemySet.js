/*
 * File: EnemySet.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EnemySet(rooms, sprite) {    
    GameObjectSet.call(this);
    var pos = [];
    var enemy = null;
    
    pos[0] = vec2.clone(rooms[19].getXform().getPosition());
    pos[1] = vec2.clone(rooms[3].getXform().getPosition());
    pos[2] = vec2.clone(rooms[0].getXform().getPosition());
    enemy = new Enemy(pos, sprite);
    this.addToSet(enemy);
    
    pos[0] = vec2.clone(rooms[10].getXform().getPosition());
    pos[1] = vec2.clone(rooms[11].getXform().getPosition());
    pos[2] = vec2.clone(rooms[12].getXform().getPosition());
    enemy = new Enemy(pos, sprite);
    this.addToSet(enemy);
    
    pos[0] = vec2.clone(rooms[1].getXform().getPosition());
    pos[1] = vec2.clone(rooms[4].getXform().getPosition());
    pos[2] = vec2.clone(rooms[5].getXform().getPosition());
    pos[2] = vec2.clone(rooms[7].getXform().getPosition());
    enemy = new Enemy(pos, sprite);
    this.addToSet(enemy);
}
gEngine.Core.inheritPrototype(EnemySet, GameObjectSet);

EnemySet.prototype.update = function (hero) {
    for (var i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update(hero);
    }
};

EnemySet.prototype.transitionToCatch = function () {
    for(var i = 0; i < this.size(); ++i)
    {
        this.getObjectAt(i).transitionToCatch();
    }
};

EnemySet.prototype.transitionToPatrol = function () {
    for(var i = 0; i < this.size(); ++i)
    {
        this.getObjectAt(i).transitionToPatrol();
    }
};

EnemySet.prototype.transitionToAlert = function () {
    for(var i = 0; i < this.size(); ++i)
    {
        this.getObjectAt(i).transitionToAlert();
    }
};

EnemySet.prototype.transitionToChase = function () {
    for(var i = 0; i < this.size(); ++i)
    {
        this.getObjectAt(i).transitionToChase();
    }
};