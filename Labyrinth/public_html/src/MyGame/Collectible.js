/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Collectible(){
    this.mRenderable = null;
    
    this.isDisintigrating = false;
    
    this.particles = new ParticleGameObjectSet();
}

Collectible.prototype.getXform = function(){
    return this.mRenderable.getXform();
};

Collectible.prototype.setRenderable = function(renderable){
    this.mRenderable = renderable;
};

Collectible.prototype.update = function(){
    if(this.isDisintigrating){
        this.particles.update();
    }
};

Collectible.prototype.pixelTouches = function(otherObj){
    
};

Collectible.prototype.disintigrateModeOn = function(){
    this.isDisintigrating = true;
    this.disintigrate();    
    this.mRenderable = null;
};

Collectible.prototype.disintigrate = function(){
    var collisionPt = [this.getXform().getXPos(), this.getXform().getYPos()];
    this.particles.addEmitterAt(collisionPt, 200, this.createParticle(collisionPt[0], collisionPt[1]));
};

Collectible.prototype.draw = function(camera){
    if(this.isDisintigrating){
        this.particles.draw(camera);
        return;
    }
    this.mRenderable.draw(camera);    
};

//Borrowed from github particles example
Collectible.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    //var fx = 10 * Math.random() - 20 * Math.random();
    //var fy = 10 * Math.random();
    //p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
};