import {timer} from "https://cdn.skypack.dev/d3-timer"

let dat = [];

let nof_points=0;
let circle_in =0;
let circle_out =0;
let c_pi;
let mes= [];

d3.select("g.chart")
    .append("rect")
        .attr("x", -230)
        .attr("y", -240)
        .attr("width", 460)
        .attr("height", 460)
        .attr("fill","#00000000")
        .attr("stroke-width", 1)
        .attr("stroke", "#000000ff")
    
d3.select("g.chart")
    .append("line")
        .attr("x1",-230)
        .attr("x2",-230)
        .attr("y1",-240)
        .attr("y2",220)
        .attr("stroke-width", 4)
        .attr("stroke","#000000ff")

d3.select("g.chart")
    .append("line")
        .attr("x1",-230)
        .attr("x2", 230)
        .attr("y1", 220)
        .attr("y2", 220)
        .attr("stroke-width", 4)
        .attr("stroke-dasharray", "4, 4")
        .attr("stroke","#000000ff")

var arc = d3.arc()
    .innerRadius(458)
    .outerRadius(462)
    .startAngle(0)
    .endAngle(3.141592/2)

d3.select("g.chart")
    .append("path")
        .attr("d", arc)
        .attr("transform", "translate(-230,220)")

function add_plot(x,y, flag){
  dat.push( {"x":x, "y":y, "id":0, "flag":flag} );
}

function update(){

    mes= [];
    mes.push({m: "Points: "+nof_points.toString(), x: -230})
    mes.push({m: "Circle In: "+circle_in.toString(), x: -110})
    if(nof_points==0){
        mes.push({m: "Pi: n/a", x: 30})
    }else{
        mes.push({m: "Pi: "+c_pi.toString(), x: 30})
    }

    d3.select("g.chart")
    .selectAll("text").remove()

    d3.select("g.chart")
    .selectAll("messages")
    .data(mes)
    .enter()
    .append("text")
        .attr("x", function(d){return d.x})
        .attr("y", 237)
        .text(function(d){return d.m})

    d3.select("g.chart")
        .selectAll("circle.plot")
        .data(dat)
        .join(
            s=>{
                return s.append("circle")
                    .classed("plot",true)
                    .attr("cx", d=>{return d.x-230;})
                    .attr("cy", d=>{return d.y-240;})
                    .attr("fill", d=>{return d.flag ? "#005affff" : "#ff4b00ff"})
                    .transition()
                    .attr("r",3);
            },
            s=>{},
            s=>{
                s.transition()
                .attr("r",0)
                .transition()
                .remove();
            }
        )
}


d3.select("button#random1").on("click", e=>{
    
    let x = Math.random()*460;
    let y = Math.random()*460;

    nof_points+=1
    flag=false
    if(y==460){
        circle_out+=1
        flag=true
    }else if(x*x+(460.0-y)*(460.0-y)<=460.0*460.0){
        circle_in+=1
        flag=false
    }else{
        circle_out+=1
        flag=true
    }
    
    add_plot(x,y,flag);
    
    c_pi=4*circle_in/nof_points;

    update();
});

d3.select("button#random10").on("click", e=>{
    
    for(let i=0; i <10; i++){
        
        let x = Math.random()*460;
        let y = Math.random()*460;

        flag=false
        nof_points+=1
        if(y==460){
            circle_out+=1
            flag=true
        }else if(x*x+(460.0-y)*(460.0-y)<=460.0*460.0){
            circle_in+=1
            flag=false
        }else{
            circle_out+=1
            flag=true
        }

        add_plot(x,y,flag);
    }
    
    c_pi=4*circle_in/nof_points;
    
    update();
});


d3.select("button#random50").on("click", e=>{
    
    for(let i=0; i <50; i++){
        
        let x = Math.random()*460;
        let y = Math.random()*460;

        nof_points+=1
        flag=false
        if(y==460){
            circle_out+=1
            flag=true
        }else if(x*x+(460.0-y)*(460.0-y)<=460.0*460.0){
            circle_in+=1
            flag=false
        }else{
            circle_out+=1
            flag=true
        }

        add_plot(x,y,flag);
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
