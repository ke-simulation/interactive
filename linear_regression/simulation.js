import {timer} from "https://cdn.skypack.dev/d3-timer"

let randn = ()=>{ return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); };
let stepper = timer(step_wrapper);

let screen = d3.select(".svg_main");
let chart = d3.select("g.chart");

let dat = [];
let cid = 0;

update();

function step_wrapper(nowt){
  try{
    step(nowt)
    
  } catch(err){
    console.log("simulation stopped by following error!\n"+ err);
    stepper.stop();
  }
}

function step(){
  //console.log("step")
}

function check_collision(x,y){
  for (let i=0;i<dat.length;i++){
    let d = dat[i], px=d.x, py=d.y;
    let r2= (px-x)*(px-x) + (py-y)*(py-y);
    if (r2<10*10){
      return i;
    }
  }
  return -1;
}

screen.on("click", (e)=>{
  console.log("?")
  let mpos = d3.pointer(e), px=mpos[0], py=mpos[1];
  let collide_id = check_collision(px,py);
  if ( collide_id >= 0 ){
    dat.splice(collide_id,1);
  }else{
    add_plot(px,py)
  }
  
  cid +=1;
  update();
})

function add_plot(x,y){
  dat.push( {"x":x, "y":y, "id":cid} );
  cid += 1
}

function update(){

  chart
    .selectAll("circle.plot")
    .data(dat, d=>{return d.id;} )
    .join(
      s=>{
        return s.append("circle")
        .classed("plot",true)
        .attr("cx", d=>{return d.x;})
        .attr("cy", d=>{return d.y;})
        .transition()
        .attr("r",8);
      },
      s=>{},
      s=>{
        s.transition()
        .attr("r",0)
        .transition()
        .remove();
      }
    )

  let sx=0, sy=0, sxx=0, syy=0, sxy=0, N=dat.length;
  for (let i=0;i<N;i++){
    let d = dat[i];
    sx += d.x;
    sy += d.y;
    sxx += d.x*d.x;
    syy += d.y*d.y;
    sxy += d.x*d.y;
  }
  console.log([sx,sy,sxx,syy,sxy])
  let a = (N*sxy - sx*sy)/(N*sxx-sx*sx + 0.0001);
  let b = (sy-a*sx)/(N+0.0001);

  let pred_data=[ {"a":a, "b":b} ];
  console.log(pred_data[0])
  
  chart
    .selectAll("line.predict")
    .data(pred_data)
    .join("line").classed("predict",true)
    .transition()
    .attr("x1",0)
    .attr("x2",640)
    .attr("y1", d=>{return d.b} )
    .attr("y2", d=>{return 640*d.a+d.b} );

}

d3.select("button#reset").on("click", e=>{
  dat = [];
  update();
});

d3.select("button#random").on("click", e=>{
  dat = [];

  let x1 = Math.random()*640;
  let x2 = Math.random()*640;
  let y1 = Math.random()*480;
  let y2 = Math.random()*480;
  
  let a = (y2-y1)/(x2-x1);
  let b = (y1-a*x1);

  for(let i=0;i<13;i++){
    let x = Math.random()*640;
    let y = a*x+b + randn()*100;

    if ( y<10 || y>470){continue;}
    add_plot(x,y);
  }

  update();
});
