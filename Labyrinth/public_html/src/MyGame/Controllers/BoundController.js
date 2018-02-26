/*
 * File: BoundController.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BoundController(hero, rooms, hallways) {
    this.mHero = hero;
    this.mRooms = rooms;
    this.mHallways = hallways;
}

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BoundController.prototype.update = function () {
    var room = null;
    var hallway = null;
    // figure out which room hero is in
    for(var i = 0; i < this.mRooms.length; ++i)
    {
        if(this.mHero.getBBox().intersectsBound(this.mRooms[i].getBBox()))
        {
            room = i;
            break;
        }
    }
    // if in a room (at least partially)
    if(room !== null)
    {
        // Check if outside room bounds
        var status = this.mRooms[room].getBBox().boundCollideStatus(this.mHero.getBBox());
        if(status !== 16)
        {
            // check if also intersecting a hallway
            for(var j = 0; j < this.mHallways[room].length; ++j)
            {
                if(this.mHero.getBBox().intersectsBound(this.mHallways[room][j].getBBox()))
                {
                    hallway = j;
                    break;
                }
            }
            // if intersecting room and hallway, make sure hero isn't stuck on corner
            if(hallway !== null)
            {
                var hallStatus = this.mHallways[room][hallway].getBBox().boundCollideStatus(this.mHero.getBBox());
                // return if hero is only intersecting opposite bounds of room and hallway
                // that means hero is transitioning from one to other
                if(status + hallStatus === 3 || status + hallStatus === 12)
                    return;
                //Otherwise hero should be pushed into room or hallway
                else
                {
                   // Push in either room or hallway
                    var dir = this.mHero.getCurrentFrontDir();
                    // if moving out of room, but can't, push in room
                    if((status & 1 === 1 && dir[0] < 0) ||
                       (status & 2 === 2 && dir[0] > 0) ||
                       (status & 4 === 4 && dir[1] > 0) ||
                       (status & 8 === 8 && dir[1] < 0))
                    {
                        this._pushInsideObject(this.mRooms[room]);
                    }
                    else
                    {
                        this._pushInsideObject(this.mHallways[room][hallway]);
                    }
                }
            }
            // if just outside room, push back in
            else
            {
                this._pushInsideObject(this.mRooms[room]);
            }
        }
    }
    // if oustide of rooms, has to be in hallway
    else
    {
        // figure out which hallway
        for(var i = 0; i < this.mRooms.length; ++i)
        {
            for(var j = 0; j < this.mHallways[i].length; ++j)
            {
                if(this.mHero.getBBox().intersectsBound(this.mHallways[i][j].getBBox()))
                {
                    room = i;
                    hallway = j;
                    break;
                }
            }
            if(hallway !== null)
                break;
        }
        // Bound inside of hallway
        this._pushInsideObject(this.mHallways[room][hallway]);
    }
};

BoundController.prototype._pushInsideObject = function (obj) {
    var status = obj.getBBox().boundCollideStatus(this.mHero.getBBox());
    // if intersecting left
    if(status & 1 === 1)
    {
        var xDelta = obj.getBBox().minX() - this.mHero.getBBox().minX();
        this.mHero.getXform().incXPosBy(xDelta);
    }
    //if intersecting right
    if(status & 2 === 2)
    {
        var xDelta = obj.getBBox().maxX() - this.mHero.getBBox().maxX();
        this.mHero.getXform().incXPosBy(xDelta);
    }
    //if intersecting top
    if(status & 4 === 4)
    {
        var yDelta = obj.getBBox().maxY() - this.mHero.getBBox().maxY();
        this.mHero.getXform().incYPosBy(yDelta);
    }
    //if intersecting bottom
    if(status & 8 === 8)
    {
        var yDelta = obj.getBBox().minY() - this.mHero.getBBox().minY();
        this.mHero.getXform().incYPosBy(yDelta);
    }
};