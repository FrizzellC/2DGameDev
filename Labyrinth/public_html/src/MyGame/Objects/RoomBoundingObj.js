/*
 * File: RoomBoundingObj.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function RoomBoundingObj() {
    var r0,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20;
    var h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16,h17,h18,h19,h20,h21,h22,h23,h24; 
    
    // Initialize varaibles here
    
    this.mRooms = [
      r0,
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
      r9,
      r10,
      r11,
      r12,
      r13,
      r14,
      r15,
      r16,
      r17,
      r18,
      r19,
      r20, 
      h0,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      h7,
      h8,
      h9,
      h10,
      h11,
      h12,
      h13,
      h14,
      h15,
      h16,
      h17,
      h18,
      h19,
      h20,
      h21,
      h22,
      h23,
      h24    //h24 is the one not numbered, between r14 and r16
    ];

    this.mHallways = [
        [h0, h1, h4, h2],
        [h0, h5, r8],
        [h3, h5, h6],
        [h2, h7, h23],
        [h6, h7, h8],
        [h8, h9],
        [h9, r20],
        [r20, r8],
        [r7, r1],
        [h10, h11, h12],
        [h11, h13],
        [h12, h13, h14, h16],
        [h13, h16, r13],
        [r12, r14],
        [r13, r15, h24],
        [r14],
        [h24, h21],
        [h19, h21, h23],
        [h17, h19],
        [h4, h17, h22],
        [r7, r6], 
        [r1, r0],
        [r10, r0],
        [h3, r0, r3],
        [h2, r2],
        [r0, r19],
        [r1, r2],
        [r2, r4],
        [r3, r4],
        [r4, r5],
        [r5, r6],
        [r7, r9],
        [r9, r10],
        [r9, r11],
        [h14, h15, h22],
        [h13, r11],
        [r11, h13],
        [r11, r12],
        [r18, r19],
        [r18, r14],
        [r17, r18],
        [r14],
        [r16, r17],
        [h13, r19],
        [r3, r17],
        [r14, r16]
    ];
};

RoomBoundingObj.prototype.draw = function (cam) {
    for(var i = 0; i < this.mRooms.length; ++i)
    {
        this.mRooms[i].draw(cam);
    }
};

RoomBoundingObj.prototype.getRooms = function () {
    return this.mRooms;
};

RoomBoundingObj.prototype.getHallways = function () {
    return this.mHallways;
};