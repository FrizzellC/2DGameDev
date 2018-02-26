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

var r0,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20;
var h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16,h17,h18,h19,h20,h21,h22,h23,h24; 

var connectedRoutes = [
  [r0, [h0, h1, h4, h2]],
  [r1, [h0, h5, r8]],
  [r2, [h3, h5, h6]],
  [r3, [h2, h7, h23]],
  [r4, [h6, h7, h8]],
  [r5, [h8, h9]],
  [r6, [h9, r20]],
  [r7, [r20, r8]],
  [r8, [r7, r1]],
  [r9, [h10, h11, h12]],
  [r10, [h11, h13]],
  [r11, [h12, h13, h14, h16]],
  [r12, [h13, h16, r13]],
  [r13, [r12, r14]],
  [r14, [r13, r15, h24]],
  [r15, [r14]],
  [r16, [h24, h21]],
  [r17, [h19, h21, h23]],
  [r18, [h17, h19]],
  [r19, [h4, h17, h22]],
  [r20, [r7, r6]], 
  [h0, [r1, r0]],
  [h1, [r10, r0]],
  [h2, [h3, r0, r3]],
  [h3, [h2, r2]],
  [h4, [r0, r19]],
  [h5, [r1, r2]],
  [h6, [r2, r4]],
  [h7, [r3, r4]],
  [h8, [r4, r5]],
  [h9, [r5, r6]],
  [h10, [r7, r9]],
  [h11, [r9, r10]],
  [h12, [r9, r11]],
  [h13, [h14, h15, h22]],
  [h14, [h13, r11]],
  [h15, [r11, h13]],
  [h16, [r11, r12]],
  [h17, [r18, r19]],
  [h18, [r18, r14]],
  [h19, [r17, r18]],
  [h20, [r14]],
  [h21, [r16, r17]],
  [h22, [h13, r19]],
  [h23, [r3, r17]],
  [h24, [r14, r16]]    //h24 is the one not numbered, between r14 and r16
];