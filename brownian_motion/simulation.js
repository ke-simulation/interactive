import {timer} from "https://cdn.skypack.dev/d3-timer"

d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 220)
        .attr("y2", 220)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", -160)
        .attr("y2", -160)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

d3.select("g.chart")
    .append("line")
        .attr("x1", -230)
        .attr("x2", -230)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

d3.select("g.chart")
    .append("line")
        .attr("x1",  150)
        .attr("x2",  150)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

let ptcl = [];
let time;
let N=21
let S=0.2
let ttemp=0.2
let cut=3*S
let margin=cut/4.0
let cutp2=cut*cut
let cutm=cut+margin
let cutmp2=cutm*cutm
let list = new Array(N*N)
let rmargin=0
let dt=0.001
let count=0
let prev_pos=[{x: 0.5, y:0.5}]

let max_sample_cnt_x = 0
let sample_x = new Array(25)
let pbc_cnt_x = 0

let max_sample_cnt_y = 0
let sample_y = new Array(25)
let pbc_cnt_y = 0

function repos_x(){

    let origin_x = ptcl[0].x
    for(let a=0; a<N*N; a++){
        ptcl[a].x-=origin_x-0.5
        if     (ptcl[a].x<0)    ptcl[a].x+=1.0
        else if(ptcl[a].x>=1.0) ptcl[a].x-=1.0
    }

    prev_pos.x=ptcl[0].x
    pbc_cnt_x = 0
            
    d3.select("g.chart").selectAll("line").remove()
    d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 220)
        .attr("y2", 220)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", -160)
        .attr("y2", -160)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1", -230)
        .attr("x2", -230)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1",  150)
        .attr("x2",  150)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")
}


function repos_y(){

    let origin_y = ptcl[0].y
    for(let a=0; a<N*N; a++){
        ptcl[a].y-=origin_y-0.5
        if     (ptcl[a].y<0)    ptcl[a].y+=1.0
        else if(ptcl[a].y>=1.0) ptcl[a].y-=1.0
    }

    prev_pos.y=ptcl[0].y
    pbc_cnt_y = 0
            
    d3.select("g.chart").selectAll("line").remove()
    d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 220)
        .attr("y2", 220)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", -160)
        .attr("y2", -160)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1", -230)
        .attr("x2", -230)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

    d3.select("g.chart")
    .append("line")
        .attr("x1",  150)
        .attr("x2",  150)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")
}


function sampling(){

//    console.log("Alpha")
    if(pbc_cnt_x==0){
        let pos = Math.floor(ptcl[0].x*25)
        sample_x[pos]+=1
        if(max_sample_cnt_x<sample_x[pos]){
            max_sample_cnt_x = sample_x[pos]
        }
  //      console.log("Bravo")
    }
    if(pbc_cnt_y==0){
        let pos = Math.floor(ptcl[0].y*25)
        sample_y[pos]+=1
        if(max_sample_cnt_y<sample_y[pos]){
            max_sample_cnt_y = sample_y[pos]
        }
    //    console.log("Charlie")
    }

    d3.select("g.chart").selectAll("rect").remove()
    d3.select("g.chart")
    .append("rect")
        .attr("x", -230)
        .attr("y", -160)
        .attr("width", 380)
        .attr("height", 380)
        .attr("fill","#00000000")
        .attr("stroke-width", 1)
        .attr("stroke", "#000000ff")
 
    for(let a=0; a<sample_x.length; a++){
        d3.select("g.chart")
        .append("rect")
            .attr("x", a/25*380-230)
            .attr("y", -160-sample_x[a]/max_sample_cnt_x*80)
            .attr("width", 380/25)
            .attr("height", sample_x[a]/max_sample_cnt_x*80)
            .attr("fill","#bb0000ff")
            .attr("stroke-width", 2)
            .attr("stroke", "#000000ff")
        
        d3.select("g.chart")
        .append("rect")
            .attr("x", 150)
            .attr("y", a/25*380-160)
            .attr("width", sample_y[a]/max_sample_cnt_y*80)
            .attr("height", 380/25)
            .attr("fill","#00bb00ff")
            .attr("stroke-width", 2)
            .attr("stroke", "#000000ff")

    }/*
        
    let orig_pos_y = 0
        .data(sample_y)
        .enter()
        .append("rect")
        .attr("x", 150)
        .attr("y", d=>{
            orig_pos_y+=1
            return orig_pos_y/25*380-160
        })
        .attr("width", d=>{return d/max_sample_cnt_y*80;})
        .attr("height", 380/25)
        .attr("fill","#00000000")
        .attr("stroke-width", 1)
        .attr("stroke", "#000000ff")
    */
}

function initialize(){
    
    d3.select("g.chart")
    .append("rect")
        .attr("x", -230)
        .attr("y", -160)
        .attr("width", 380)
        .attr("height", 380)
        .attr("fill","#00000000")
        .attr("stroke-width", 1)
        .attr("stroke", "#000000ff")



    for(let a=0; a<N; a++){
        for(let b=0; b<N; b++){ 
            if(a==0 && b==0){
                ptcl.push({x: a/N, y: b/N, vx: 0., vy: 0., fx: 0., fy: 0., t: 1, m: 3, s: S});
            }else{
                ptcl.push({x: a/N, y: b/N, vx: (Math.random()-0.5)/10, vy: (Math.random()-0.5)/10, fx: 0., fy: 0., t: 0, m: 1, s: S/5});
            }
        }
    }
    
    for(let a=0; a<25; a++){
        sample_x[a] = 0
        sample_y[a] = 0
    }

    //calc_force()
    make_list()
}



function update(){

    d3.select("g.chart").selectAll("circle").remove()
    d3.select("g.chart")
        .selectAll("circle")
        .data(ptcl)
        .enter()
        .append("circle")
            .attr("cx", d=>{return d.x*380-230;})
            .attr("cy", d=>{return d.y*380-160;})
            .attr("r",  d=>{return d.s*100;})
            .attr("fill", d=>{return d.t ? (d.t==1 ? "#0000b0ff" : "#ff1b00aa") : "#005affff"})
            .attr("stroke", d=>{return d.t ? "#000000ff" : "#00000000"})

}

function calc_force(){
    
    for(let a=0; a<N*N; a++){
        ptcl[a].fx=0
        ptcl[a].fy=0
    }

    for(let a=0; a<N*N; a++){
        for(let b=a+1; b<N*N; b++){
            let dx=(ptcl[b].x-ptcl[a].x)
            if     (dx<-0.5) dx+=1
            else if(dx>=0.5) dx-=1
            
            let dy=(ptcl[b].y-ptcl[a].y)
            if     (dy<-0.5) dy+=1
            else if(dy>=0.5) dy-=1

            let distp2=dx*dx+dy*dy
            if(distp2<0.01){
                let sig=(ptcl[a].s+ptcl[b].s)*0.5
                let sigp2=sig*sig
                let val=sigp2*sigp2*sig/(distp2*distp2*distp2)
                ptcl[a].fx-=dx*val
                ptcl[a].fy-=dy*val
                ptcl[b].fx+=dx*val
                ptcl[b].fy+=dy*val
            }
        }
    }
}


function calc_force_from_list(){
   
    //console.log("cffl")

    for(let a=0; a<N*N; a++){
        ptcl[a].fx=0
        ptcl[a].fy=0

        for(let b=0; b<list[a].length; b++){
            
            let dx=(ptcl[list[a][b]].x-ptcl[a].x)
            if     (dx<-0.5) dx+=1
            else if(dx>=0.5) dx-=1
            
            let dy=(ptcl[list[a][b]].y-ptcl[a].y)
            if     (dy<-0.5) dy+=1
            else if(dy>=0.5) dy-=1

            let distp2=dx*dx+dy*dy
            if(distp2<0.01){
                let sig=(ptcl[a].s+ptcl[list[a][b]].s)*0.5
                let sigp2=sig*sig
                let val=sigp2*sigp2*sig/(distp2*distp2*distp2)
                ptcl[a].fx-=dx*val
                ptcl[a].fy-=dy*val
            }
        }
    }
}

function repos(){
    
    let periodic=false
    ptcl[0].x+=ptcl[0].vx*dt
    if (ptcl[0].x<0){
        ptcl[0].x+=1.0
        periodic=true
        pbc_cnt_x-=1
    }
    else if(ptcl[0].x>=1.0){
        ptcl[0].x-=1.0
        periodic=true
        pbc_cnt_x+=1
    }
    
    ptcl[0].y+=ptcl[0].vy*dt
    if (ptcl[0].y<0){
        ptcl[0].y+=1.0
        periodic=true
        pbc_cnt_y-=1
    }
    else if(ptcl[0].y>=1.0){
        ptcl[0].y-=1.0
        periodic=true
        pbc_cnt_y+=1
    }
    if(periodic){
        prev_pos.x=ptcl[0].x
        prev_pos.y=ptcl[0].y
    }

    for(let a=1; a<N*N; a++){
        ptcl[a].x+=ptcl[a].vx*dt
        if     (ptcl[a].x<0)    ptcl[a].x+=1.0
        else if(ptcl[a].x>=1.0) ptcl[a].x-=1.0
        
        ptcl[a].y+=ptcl[a].vy*dt
        if     (ptcl[a].y<0)    ptcl[a].y+=1.0
        else if(ptcl[a].y>=1.0) ptcl[a].y-=1.0
    }
}

function revelo_half(){
    
    for(let a=0; a<N*N; a++){
        ptcl[a].vx+=0.5*ptcl[a].fx/ptcl[a].m*dt
        ptcl[a].vy+=0.5*ptcl[a].fy/ptcl[a].m*dt
    }
}

function velocity_scale(){
    
    let sum_velo=0
    for(let a=0; a<N*N; a++){
        sum_velo+=ptcl[a].m*(ptcl[a].vx*ptcl[a].vx+ptcl[a].vy*ptcl[a].vy)
    }
    let scale=Math.sqrt(ttemp*3*N*N/sum_velo)

    let sum_velo_x=0
    let sum_velo_y=0
    for(let a=0; a<N*N; a++){
        ptcl[a].vx*=scale
        ptcl[a].vy*=scale
        sum_velo_x+=ptcl[a].m*ptcl[a].vx
        sum_velo_y+=ptcl[a].m*ptcl[a].vy
    }
    sum_velo_x/=N*N
    sum_velo_y/=N*N
    for(let a=0; a<N*N; a++){
        ptcl[a].vx-=sum_velo_x/ptcl[a].m
        ptcl[a].vy-=sum_velo_y/ptcl[a].m
    }
    
}

function check_list(){
    
    let max_velo=0 
    for(let a=0; a<N*N; a++){
        let v = Math.sqrt(ptcl[a].vx*ptcl[a].vx+ptcl[a].vy*ptcl[a].vy)
        if(max_velo<v) max_velo = v
    }

    rmargin-=max_velo*dt
    
    if(rmargin<0.0) return true
    else            return false
}

function make_list(){
    
    console.log("make_list")
    for(let a=0; a<N*N; a++){
        list[a]=[]
        ptcl[a].fx=0
        ptcl[a].fy=0
    }

    for(let a=0; a<N*N; a++){
        for(let b=a+1; b<N*N; b++){
            let dx=(ptcl[b].x-ptcl[a].x)
            if     (dx<-0.5) dx+=1
            else if(dx>=0.5) dx-=1
            
            let dy=(ptcl[b].y-ptcl[a].y)
            if     (dy<-0.5) dy+=1
            else if(dy>=0.5) dy-=1

            let distp2=dx*dx+dy*dy
            if(distp2<cutmp2){
                list[a].push(b)
                list[b].push(a)

                if(distp2<cutp2){
                    let sig=(ptcl[a].s+ptcl[b].s)*0.5
                    let sigp2=sig*sig
                    let val=sigp2*sigp2*sig/(distp2*distp2*distp2)
                    ptcl[a].fx-=dx*val
                    ptcl[a].fy-=dy*val
                    ptcl[b].fx+=dx*val
                    ptcl[b].fy+=dy*val
                }
            }
        }
    }

    rmargin = margin
}


let equilibrium =true
function evolve(nowt){
    time = nowt
    
    revelo_half()
    repos()

    if(check_list()) make_list()
    else             calc_force_from_list()
    //calc_force()
    revelo_half()

    if(equilibrium){
    //if(count<10){
        let origin_x = ptcl[0].x
        let origin_y = ptcl[0].y
        for(let a=0; a<N*N; a++){
            ptcl[a].x-=origin_x-0.5
            ptcl[a].y-=origin_y-0.5
            if     (ptcl[a].x<0)    ptcl[a].x+=1.0
            else if(ptcl[a].x>=1.0) ptcl[a].x-=1.0
            if     (ptcl[a].y<0)    ptcl[a].y+=1.0
            else if(ptcl[a].y>=1.0) ptcl[a].y-=1.0
        }

        prev_pos.x=ptcl[0].x
        prev_pos.y=ptcl[0].y

        velocity_scale()

        if(count==2000){
            pbc_cnt_x = 0
            pbc_cnt_y = 0
            equilibrium = false
            count = 0
        }
    }else{

        ptcl[0].t=2

        if(count%30==0){
            d3.select("g.chart")
            .append("line")
                .attr("x1",  prev_pos.x*380-230)
                .attr("y1",  prev_pos.y*380-160)
                .attr("x2",  ptcl[0].x*380-230)
                .attr("y2",  ptcl[0].y*380-160)
                .attr("stroke-width", 1)
                .attr("stroke","#000000ff")
            prev_pos.x=ptcl[0].x
            prev_pos.y=ptcl[0].y
    
            if(count>=10000){
                velocity_scale()
                repos_x()
                repos_y()
                count=0
            }
        }
        sampling()
    }
//    console.log(count)
    update()
        
    count+=1

}


function step_wrapper(nowt){
  
  try{
    evolve(nowt)
    
  } catch(err){
    console.log("simulation stopped by following error!\n"+ err);
    stepper.stop();
  }
}





initialize()
let stepper = timer(step_wrapper);


//update()

d3.select("button#random1").on("click", e=>{ 
    ttemp+=0.1
});
/*
d3.select("button#random10").on("click", e=>{
    
    for(let i=0; i <10; i++){
        
        let x = Math.random()*460;
        let y = Math.random()*460;

        nof_points+=1
        if(y==460){
            circle_out+=1
        }else if(x*x+(460.0-y)*(460.0-y)<=460.0*460.0){
            circle_in+=1
        }else{
            circle_out+=1
        }

        add_plot(x,y);
    }
    
    c_pi=4*circle_in/nof_points;
    
    update();
});


d3.select("button#random50").on("click", e=>{
    
    for(let i=0; i <50; i++){
        
        let x = Math.random()*460;
        let y = Math.random()*460;

        nof_points+=1
        if(y==460){
            circle_out+=1
        }else if(x*x+(460.0-y)*(460.0-y)<=460.0*460.0){
            circle_in+=1
        }else{
            circle_out+=1
        }

        add_plot(x,y);
    }
    
    c_pi=4*circle_in/nof_points;
    
    update();
});

d3.select("button#reset").on("click", e=>{
    
    dat= []
    
    nof_points=0;
    circle_in=0;
    circle_out=0;

    update();
});
*/
