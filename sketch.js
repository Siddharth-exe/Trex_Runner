var t;
var g;
var c;
var o;
var on;
var og;
var gs = 0;
var s = 0;
var bgc = 0;

function preload(){
  t_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  g_i = loadImage("ground2.png");
  c_i = loadImage("cloud.png");
  o1_i = loadImage("obstacle1.png");
  o2_i = loadImage("obstacle2.png");
  o3_i = loadImage("obstacle3.png");
  o4_i = loadImage("obstacle4.png");
  o5_i = loadImage("obstacle5.png");
  o6_i = loadImage("obstacle6.png");
  tc_i = loadAnimation("trex_collided.png");
  go_i = loadImage("gameOver.png");
  r_i = loadImage("restart.png");
  j_s = loadSound("jump.mp3");
  d_s = loadSound("die.mp3");
  c_s = loadSound("checkPoint.mp3");
}

function controls(){
  if((keyDown("space") || keyDown("up") || keyDown("w")) && t.y>160){
    t.velocityY = -14
    j_s.play();
  }
}

function cr(){
  if(frameCount%150 === 0){
    c = createSprite(680, 20, 100, 5);
    c.addImage(c_i);
    c.scale = 0.6;
    c.velocityX = -4 - (s/100);
    c.y = Math.round(random(20,40));
    c.depth = t.depth
    t.depth = t.depth + 1;
    c.lifetime = 150;
    cg.add(c);
  }
}

function or(){
  if(frameCount%100 === 0){
    o = createSprite(680, 170, 10, 30);
    o.velocityX = -4 - (s/100);
    on = Math.round(random(1,6));
    switch(on){
      case 1: o.addImage(o1_i);
        o.scale = 0.7;
      break;
      case 2: o.addImage(o2_i);
        o.scale = 0.7;
      break;
      case 3: o.addImage(o3_i);
        o.scale = 0.6;
      break;
      case 4: o.addImage(o4_i);
        o.scale = 0.5;
      break;
      case 5: o.addImage(o5_i);
        o.scale = 0.5;
      break;
      case 6: o.addImage(o6_i);
        o.scale = 0.5;
      break;
      default: break;
    }
    o.lifetime = 400;
    og.add(o);
  }
}

function sc(){
  s = s + Math.round(getFrameRate()/60);
}

function res(){
  s = 0;
  t.changeAnimation("running", t_run);
  gs = 0;
  cg.destroyEach();
  og.destroyEach();
}

function setup(){
  createCanvas(680, 200);
  t = createSprite(50, 160, 20, 50);
  t.addAnimation("running", t_run);
  t.scale = 0.5
  t.addAnimation("collided", tc_i);
  g = createSprite(300, 180, 680, 5);
  g.addImage(g_i)
  i3dg = createSprite(300, 190, 680, 5);
  i3dg.visible = false;
  og = new Group();
  cg = new Group();
  
  go = createSprite(335, 80, 5, 15);
  go.addImage(go_i);
  go.scale = 0.75;
  
  r = createSprite(335, 120, 5, 15);
  r.addImage(r_i);
  r.scale = 0.5;
  
  edges = createEdgeSprites();
  
  t.setCollider("circle", 0, 0, 38);
}

function draw(){  
  background("white");
  if(gs === 0){
  controls();
  t.velocityY = t.velocityY + 1;
  
  g.velocityX = -4 - (s/100);
  
  if(g.x<0){
    g.x = g.width/2;
  }
    
  cr();
  or();
  sc();
    
  if(t.isTouching(og)){
    gs = gs + 1;
    d_s.play();
  }
  
  go.visible = false;
  r.visible = false;
  
  if(s%100 === 0 && s>0){
    c_s.play();
  }
  }
  
  if(gs === 1){
    t.velocityY = 0;
    t.changeAnimation("collided", tc_i);
    g.velocityX = 0;
    cg.setVelocityXEach(0);
    og.setVelocityXEach(0);
    cg.setLifetimeEach(-1);
    og.setLifetimeEach(-1);
    go.visible = true;
    r.visible = true;
    if(mousePressedOver(r) || keyDown("space")){
       res();
       }
  }
  
  t.collide(i3dg);
  t.collide(edges[2]);
  
  text("Score: "+ s, 500, 50);
  
  drawSprites();
}