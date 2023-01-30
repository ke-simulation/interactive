import {timer} from "https://cdn.skypack.dev/d3-timer"

let length=50
let update_num=50;

let cells  = [];
let cellobjs = d3.select("g.chart").selectAll("rect")
let textobjs = d3.select("g.chart").selectAll("text")

let magn = 0;
let temp = 1;
let hamil = 0.;

let time = 0;

function calc(){

    hamil=0.0;

    for(let y=0; y<length; y++){
        for(let x=0; x<length; x++){

            let right = length*y + (x+1<length ? x+1 : 0);
            let up    = length*(y+1<length ? y+1 : 0) + x;
            let left  = length*y + (x-1<0 ? length-1 : x-1);
            let down  = length*(y-1<0 ? length-1 : y-1) + x;
    
            hamil-=(0.5*(cells[right].spin + cells[up].spin + cells[left].spin + cells[down].spin) + magn)*cells[length*y+x].spin;
       }
    }
}

function reset(){

    cells = [];

    magn =0;
    temp =1;
    for(let b=0; b<length; b++){
        for(let a=0; a<length; a++){
            let val=Math.random()*2-1;
            let fill
            if(val<0){
                val=-1;
                fill="#ddddddff";
            }else{
                val=+1;
                fill="#222222ff";
            }
            
            cells.push({ "x":-230+a*460/length, "y":-240+b*460/length, "spin":val, "fill":fill});
        }
    }

    calc();
}

function draw(){


    d3.select("g.chart").selectAll("rect").remove()
    d3.select("g.chart").selectAll("text").remove()

    let square = [];
    square.push({});
    cellobjs.data(square)
        .join("rect")
        .attr("x", -230)
        .attr("y", -240)
        .attr("width", 460)
        .attr("height", 460)
        .attr("fill", "#00000000")
        .attr("stroke-width", 3)
        .attr("stroke", "#000000ff")

    cellobjs.data(cells)
        .join("rect")
        .attr("x", d=>{return d.x;})
        .attr("y", d=>{return d.y;})
        .attr("width", 460/length)
        .attr("height", 460/length)
        .attr("fill", d=>{return d.fill;})
        .attr("stroke-width", 1)
        .attr("stroke", "#000000ff")

    let mes = [];
    mes.push( {m: "Mg: "+magn.toFixed(2),  x: -230} );
    mes.push( {m: "Tp: "+temp.toFixed(2),  x: -110} );
    mes.push( {m: "H: " +hamil.toFixed(1), x: 10} );
    textobjs.data(mes)
        .join("text")
        .attr("x", d=>{return d.x;})
        .attr("y", 237)
        .text(d=>{return d.m})
}


function update(){
   

    for(let a=0; a<update_num; a++){
        let num=length*length;
        
        let chosed=Math.floor(Math.random()*num);
        let rev_spin;
        if(cells[chosed].spin==1){
            rev_spin=-1;
        }else{
            rev_spin=+1;
        }
    
        let x=chosed%length;
        let y=Math.floor(chosed/length);
    
        let right = length*y + (x+1<length ? x+1 : 0);
        let up    = length*(y+1<length ? y+1 : 0) + x;
        let left  = length*y + (x-1<0 ? length-1 : x-1);
        let down  = length*(y-1<0 ? length-1 : y-1) + x;
    
        let cur_hamil=-(cells[right].spin + cells[up].spin + cells[left].spin + cells[down].spin + magn)*cells[chosed].spin;
        let try_hamil=-(cells[right].spin + cells[up].spin + cells[left].spin + cells[down].spin + magn)*rev_spin;
   
        //console.log("H: %f,%f,%f  T: %f  P: ", try_hamil-cur_hamil, temp, Math.exp(-(try_hamil-cur_hamil)/temp))
        
        if(try_hamil-cur_hamil<0){
            cells[chosed].spin=rev_spin;
            hamil+=try_hamil-cur_hamil;

        }else if(Math.exp(-(try_hamil-cur_hamil)/(4.0*temp))>Math.random()){
            cells[chosed].spin=rev_spin;
            hamil+=try_hamil-cur_hamil;
        }
    
    
        if(cells[chosed].spin==1){
            cells[chosed].fill="#222222ff";
        }else{
            cells[chosed].fill="#ddddddff";
        }
    }


//    console.log("chosed: (%d, %d)", x, y);
//    console.log("right : (%d, %d)", (x+1<length ? x+1 : 0), y);
//    console.log("up    : (%d, %d)", x, (y+1<length ? y+1 : 0));
//    console.log("left  : (%d, %d)", (x-1<0 ? length-1 : x-1), y);
//    console.log("down  : (%d, %d)", x, (y-1<0 ? length-1 : y-1));

//    cells[chosed]
}


function step(nowt){
    time = nowt;
    update();
    draw();
}


function step_wrapper(nowt){
  try{
    step(nowt)
    
  } catch(err){
    console.log("simulation stopped by following error!\n"+ err);
    stepper.stop();
  }
}


reset();
let stepper = timer(step_wrapper);


d3.select("button#magn_plus").on("click", e=>{

    magn+=0.05;    
});

d3.select("button#magn_minus").on("click", e=>{

    magn-=0.05;
});


d3.select("button#temp_plus").on("click", e=>{

    temp+=0.05;
});

d3.select("button#temp_minus").on("click", e=>{

    temp-=0.05;

    if(temp<0.0) temp=0.0
});

d3.select("button#x10").on("click", e=>{
 
    let p_magn=magn;
    let p_temp=temp;
    
    length=10;
    update_num=1;
    
    reset();

    magn=p_magn;
    temp=p_temp;
});

d3.select("button#x25").on("click", e=>{
    
    let p_magn=magn;
    let p_temp=temp;
   
    length=25;
    update_num=5;
    
    reset();

    magn=p_magn;
    temp=p_temp;
});

d3.select("button#x50").on("click", e=>{
    
    let p_magn=magn;
    let p_temp=temp;
  
    length=50;
    update_num=50;
    reset();

    magn=p_magn;
    temp=p_temp;
});

d3.select("button#x75").on("click", e=>{
    
    let p_magn=magn;
    let p_temp=temp;
 
    length=75;
    update_num=500;
    reset();

    magn=p_magn;
    temp=p_temp;
});

d3.select("button#random").on("click", e=>{
    
    let p_magn=magn;
    let p_temp=temp;

    reset();

    magn=p_magn;
    temp=p_temp;
});

d3.select("button#reset").on("click", e=>{
    
    reset();
});
