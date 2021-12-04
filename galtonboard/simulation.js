import {timer} from "https://cdn.skypack.dev/d3-timer"

let rnorm = ()=>{ return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); };

let balls = [];
let boxs = [];
let dt = 0.01;
let prevt = 0;

let ballnodes = d3.select("g.chart").selectAll("circle")
let boxnodes = d3.select("g.chart").selectAll("rect")

reset();

let stepper = timer(step_wrapper);

function reset(){
  balls = [];
  boxs = [];
  
  for (let i=0; i<8; i++){
    for ( let j=-10; j<=10; j++){
      let xoff = (i%2)==0? 15: 0;
      balls.push({ "fx":j*30+xoff, "fy":-180+0.87*30*i, "r":5  });
    }
  }
  
  
  boxs.push({ "x":0, "y":220, "sx":640, "sy":20 });
  
  for (let i=-9; i<=8; i++){
    boxs.push({ "x":i*30 +15, "y":120, "sx":15, "sy":180 });
    balls.push({ "fx":i*30 + 15, "fy":120-90, "r":7.5  });
  }
  
  boxnodes.data(boxs)
    .join("rect")
    .attr("x", d=>{return d.x-d.sx/2;} )
    .attr("y", d=>{return d.y-d.sy/2;} )
    .attr("width", d=>{return d.sx;} )
    .attr("height", d=>{return d.sy;} );
  
  
  console.log("particles initialized")
}

function step_wrapper(nowt){
  try{
    step(nowt)
    
  } catch(err){
    console.log("simulation stopped by following error!\n"+ err);
    stepper.stop();
  }
}

function step(nowt){
  if ( Math.floor(nowt/1000) > Math.floor(prevt/1000) ){
    add();
  }
  
  for (let i =0; i<balls.length; i++ ){
    balls[i].x += dt* balls[i].vx;
    balls[i].y += dt* balls[i].vy;
  }
  
  ballsgravity();
  
  ballsfixedbody();
  ballboxcollider();
  ballscollider();
  ballsfixedbody();
  
  ballnodes = ballnodes
    .data(balls)
    .join("circle")
    .attr("r", d=>{return d.r} )
    .attr("cx", d=>{return d.x;} )
    .attr("cy", d=>{return d.y;} )
    .style("fill", d=>{
        if ( "fx" in d ) {return "black"}
        else{ return "orange"}
    })
    .style("stroke", d=>{
        if ( "fx" in d ) {return false}
        else{ return "black"}
    })

  
  prevt = nowt;
}

function add(){
    let it = { 
      "x":0.0, 
      "y":-220,
      "vx": rnorm()*30,
      "vy": rnorm()*30,
      "r":5
    };
    balls.push(it);
}

function ballscollider(){
    for (let i =0; i<balls.length; i++ ){
    for (let j =0; j<balls.length; j++ ){
      if (i == j) continue;
      let source = balls[i];
      let target = balls[j];
      let dx = target.x - source.x;
      let dy = target.y - source.y;
      let rnow = Math.sqrt( dx*dx + dy*dy );
      let rval = target.r + source.r;
      if ( rnow >= rval ) continue;
      let nx = dx/rnow, ny = dy/rnow;
      let scale = (rval-rnow) * 1;
      target.x += nx*scale;
      target.y += ny*scale;
      source.x -= nx*scale;
      source.y -= ny*scale;
      let ndotvi = source.vx*nx + source.vy*ny;
      let ndotvj = target.vx*nx + target.vy*ny;
      let boundscale = 1.5;
      source.vx -= boundscale* nx*ndotvi;
      source.vy -= boundscale* ny*ndotvi;
      target.vx -= boundscale* nx*ndotvj;
      target.vy -= boundscale* ny*ndotvj;      

    }}
}

function ballsfixedbody(){
  for (let i =0; i<balls.length; i++ ){
    let target = balls[i];
    if ( "fx" in target ){
      target.x = target.fx;
      target.vx = 0;
    }
    if ( "fy" in target ){
      target.y = target.fy;
      target.vy = 0;
    }    
  }
}

function ballsgravity(){
  for (let i =0; i<balls.length; i++ ){
    let target = balls[i];
    balls[i].vy += dt* 500.0;
  }
}

function ballboxcollider(){
    for (let i =0; i<balls.length; i++ ){
    for (let j =0; j<boxs.length; j++ ){
      let ball = balls[i];
      let box = boxs[j];
      let b1x= box.x - box.sx/2, b1y = box.y - box.sy/2;
      let b2x= box.x + box.sx/2, b2y = box.y + box.sy/2;
      let cx = ball.x, cy = ball.y, cr = ball.r;
      
      if ( b1y-cr<cy && cy<b1y && b1x<cx && cx<b2x ){
        ball.y = b1y-cr;
        ball.vy = - 0.5* ball.vy;
        ball.vx *= 0.99;
      }
      if ( b1x-cr<cx && cx<b1x && b1y<cy && cy<b2y ){
        ball.x = b1x-cr;
        ball.vx = - 0.5* ball.vx;
      }
      if ( b2x<cx && cx<b2x+cr && b1y<cy && cy<b2y ){
        ball.x = b2x+cr;
        ball.vx = - 0.5* ball.vx;
      }      
      
      
      
    }}
}

d3.select("button#reset").on("click", reset);
d3.select("button#add").on("click",add);
