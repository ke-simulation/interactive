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
//let N=17
let N=15
let S=0.3
let ttemp=0.2
let cut=2*S
let margin=cut/4.0
let cutp2=cut*cut
let cutm=cut+margin
let cutmp2=cutm*cutm
let list = new Array(N*N)
let rmargin=0
let dt=0.001
let count=0
let prev_pos=[{x: 0.5, y:0.5}]

let bin = 31

let padded_sample_pos = []
let padded_sampling = false

let max_sample_cnt_x = 0
let sample_x = new Array(bin)
let pbc_cnt_x = 0

let max_sample_cnt_y = 0
let sample_y = new Array(bin)
let pbc_cnt_y = 0

let samp_step = 500
let spd = 3

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
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 30)
        .attr("y2", 30)
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

    d3.select("g.chart")
    .append("line")
        .attr("x1",  -40)
        .attr("x2",  -40)
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
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 30)
        .attr("y2", 30)
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

    d3.select("g.chart")
    .append("line")
        .attr("x1",  -40)
        .attr("x2",  -40)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

}


function sampling(xypos){
    //console.log(xypos.x, xypos.y)
    if(padded_sampling || pbc_cnt_x==0){
        let pos = Math.floor(xypos.x*bin)
        sample_x[pos]+=1
        if(max_sample_cnt_x<sample_x[pos]){
            max_sample_cnt_x = sample_x[pos]
        }
    }
    if(padded_sampling || pbc_cnt_y==0){
        let pos = Math.floor(xypos.y*bin)
        sample_y[pos]+=1
        if(max_sample_cnt_y<sample_y[pos]){
            max_sample_cnt_y = sample_y[pos]
        }
    }
}

function sampling_draw(){

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
            .attr("x", a/bin*380-230)
            .attr("y", -160-sample_x[a]/max_sample_cnt_x*80)
            .attr("width", 380/bin)
            .attr("height", sample_x[a]/max_sample_cnt_x*80)
            .attr("fill","#bb0000ff")
            .attr("stroke-width", 2)
            .attr("stroke", "#000000ff")
        
        d3.select("g.chart")
        .append("rect")
            .attr("x", 150)
            .attr("y", a/bin*380-160)
            .attr("width", sample_y[a]/max_sample_cnt_y*80)
            .attr("height", 380/bin)
            .attr("fill","#00bb00ff")
            .attr("stroke-width", 2)
            .attr("stroke", "#000000ff")
    }
}

function initialize(){
 
    d3.select("g.chart").selectAll("circle").remove()
    ptcl=[]

    samp_step = 500
    padded_sample_pos = []
    padded_sampling = false
    spd = 3
   
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
    
    for(let a=0; a<bin; a++){
        sample_x[a] = 0
        sample_y[a] = 0
    }

    erase()
    //calc_force()
    make_list()
}



let prev_ps_pos = {x: 0.5, y: 0.5}
function update(){

    d3.select("g.chart").selectAll("circle").remove()
    ptcl.push({x: prev_ps_pos.x, y: prev_ps_pos.y, s: S, t: 3})

    d3.select("g.chart")
        .selectAll("circle")
        .data(ptcl)
        .enter()
        .append("circle")
            .attr("cx", d=>{return d.x*380-230;})
            .attr("cy", d=>{return d.y*380-160;})
            .attr("r",  d=>{return d.s*100;})
            .attr("fill", d=>{
                if     (d.t==0) return "#005affff"
                else if(d.t==1) return "#0000b0ff"
                else if(d.t==2) return "#ff3b0077"
                else            return "#00000000" 
            })
            .attr("stroke.width", d=>{
                if     (d.t==0) return 0
                else if(d.t==1) return 50
                else if(d.t==2) return 50
                else            return 50
            })
            .attr("stroke", d=>{
                return d.t ? (d.t==3 ? "#00000077" : "#000000ff") : "#00000000"
            })


    ptcl.pop()
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
        if(count%spd==0){
            update()
        }
        if(count==1000){
            pbc_cnt_x = 0
            pbc_cnt_y = 0
            equilibrium = false
            count = 0
        }
    }else{

        ptcl[0].t=2
        if(count%spd==0){
//                .attr("r",  d=>{return d.s*100;})
//                .attr("fill", d=>{return d.t ? (d.t==1 ? "#0000b0ff" : "#ff1b00aa") : "#005affff"})
//                .attr("stroke", d=>{return d.t ? "#000000ff" : "#00000000"})

            update()
        }
        if(count%10==0){
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
        }
        if(padded_sampling){
            if(count%100==0){
                if(padded_sample_pos.length == samp_step/100){
                    if(padded_sampling){
                        sampling({x: ptcl[0].x+pbc_cnt_x-padded_sample_pos[0].x+0.5, y: ptcl[0].y+pbc_cnt_y-padded_sample_pos[0].y+0.5})
                        prev_ps_pos = {x: padded_sample_pos[0].npx, y: padded_sample_pos[0].npy}
                        sampling_draw()
                    }
                    padded_sample_pos.shift()
                }

                console.log(padded_sample_pos)
                padded_sample_pos.push({x: ptcl[0].x+pbc_cnt_x, y: ptcl[0].y+pbc_cnt_y, npx: ptcl[0].x, npy: ptcl[0].y})
            }
        }else{
            if(count>=samp_step){
                sampling({x: ptcl[0].x+pbc_cnt_x, y: ptcl[0].y+pbc_cnt_y})
                sampling_draw()
                velocity_scale()
                repos_x()
                repos_y()
                count=0
            }
        }
    }
        
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


function erase(){

    max_sample_cnt_x = 0
    for(let a=0; a<bin; a++){
        sample_x[a]=0
    }
    pbc_cnt_x = 0

    max_sample_cnt_y = 0
    for(let a=0; a<bin; a++){
        sample_y[a]=0
    }
    pbc_cnt_y = 0
    sampling_draw()
    repos_x()
    repos_y()
    
    padded_sample_pos=[]
    padded_sample_pos.push({x: 0.5, y: 0.5, npx: 0.5, npy: 0.5})
    prev_ps_pos = {x: 0.5, y: 0.5}

    if(!equilibrium){
        count=0
    }
    console.log(samp_step)
}

d3.select("button#ssp").on("click", e=>{ 
    samp_step+=100
    padded_sample_pos=[]
    padded_sample_pos.push({x: 0.5, y: 0.5, npx: 0.5, npy: 0.5})
    prev_ps_pos = {x: 0.5, y: 0.5}
    
    erase()
});

d3.select("button#ssm").on("click", e=>{ 
    samp_step-=100
    padded_sample_pos=[]
    padded_sample_pos.push({x: 0.5, y: 0.5, npx: 0.5, npy: 0.5})
    prev_ps_pos = {x: 0.5, y: 0.5}
    if(samp_step<=0) samp_step = 100
    erase()
});

d3.select("button#pps").on("click", e=>{ 

    if(padded_sampling){
        padded_sampling = false
        padded_sample_pos = []
        if(!equilibrium){
            count = 0
        }
        repos_x()
        repos_y()
        prev_ps_pos = {x: 0.5, y: 0.5}
        

    }else{
        padded_sampling = true
        if(!equilibrium){
            count = 0
        }
    }

    padded_sample_pos = []
});

d3.select("button#eraseg").on("click", e=>{ 
    erase()
});

d3.select("button#erasel").on("click", e=>{

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
        .attr("x1", 150)
        .attr("x2", 230)
        .attr("y1", 30)
        .attr("y2", 30)
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

    d3.select("g.chart")
    .append("line")
        .attr("x1",  -40)
        .attr("x2",  -40)
        .attr("y1", -160)
        .attr("y2", -240)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")
});

d3.select("button#reset").on("click", e=>{ 
    initialize()
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
