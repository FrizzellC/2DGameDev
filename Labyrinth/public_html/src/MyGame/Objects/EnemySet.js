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
    for(var i = 0; i < rooms.length; ++i)
    {
        
        if(i % 8 === 0)
        {
            var enemy = new Enemy(pos, sprite);
            this.addToSet(enemy);
            pos = [];
        }
        else if(i % 2 === 0)
        {
            pos[pos.length] = rooms[i].getXform().getPosition();
            var offset = vec2.fromValues(Math.random() * 40 - 20, Math.random() * 40 - 20);
            vec2.add(pos[pos.length - 1], pos[pos.length - 1], offset);
        }
    }
}
gEngine.Core.inheritPrototype(EnemySet, GameObjectSet);

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