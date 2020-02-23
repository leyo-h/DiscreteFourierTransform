//Globals
const WIDTH = 1200;
const HEIGHT =800;
var ctx;
var tps = 30;
var tickRate = 1/tps;
var canvas
var time = 0;
var X;
var path = [];
var userIn = [];
var mouseState = 0;
var my;
var mx;
var hasDrawn =false;
var isDrawing = false;

//Classes
class Complex{
	constructor(re,im){
		//a +bi
		this.a = re;
		this.b = im;
	}
    divide(z){
        let a = (this.a *(1/ z.a)) - (this.b * (1/z.b));
        let b = (this.a * (1/z.b)) + ((1/z.a) * this.b);
        return new Complex(a,b); 
        
        
    }
	multiply(z){
		//multiply 2 complex numbers by setting the re or im part to 0 ou can "scale" it
		let a = (this.a * z.a) - (this.b * z.b);
		let b = (this.a * z.b) + (z.a * this.b);
		return new Complex(a,b);
	}
    add(z){
        let newA = this.a+z.a;
        let newB = this.b+z.b
        return new Complex(newA,newB)
        
    }
    addToSelf(z){
        this.a+=z.a;
        this.b+=z.b;
        
        
    }
	getExponent(){
        let E = Math.pow(Math.E,this.a);
		let trig = new Complex (Math.cos(this.b)*E,Math.sin(this.b)*E);
        return trig;
		 
	}
    magnitude(){
        let a = this.a*this.a;    
        let b = this.b*this.b;
        return Math.sqrt(a+b)
        
    }


}


//Functions
function dft(x){
    let N = x.length;   //this is the number of items in the input and final array written as N;
    let X = [];       //the output array written as X(x = input)
    for(let k=0;k<N;k++){//k is item in output
        let total = new Complex(0,0);
        
        for(let n=0;n<N;n++){ //n is what we loop through
            let temp = new Complex(0,n*k*-2*Math.PI/N);
            //console.log(temp)
            console.log(temp.getExponent(),"    ",temp.getExponent().multiply(x[n]));
            total.addToSelf(temp.getExponent().multiply(x[n]));
            
            
            
            
        }
        console.log(total);
        //caluclating frequency,phase and amplitude 
        //k = frequency
        let amp = Math.sqrt(total.a*total.a+total.b*total.b); // i guess its the magnitude
        let phase = Math.atan2(total.b,total.a);
        X[k] = {total,k,amp,phase};
        
    }
    console.log(X);
    
    return X
    
    
}

function drawArrows(x,y,scale,rotation,fs){ //takes x,y, of start arrow its rotations + freq * time +phase +rotation (rotation is for rotating the entire shape)
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(-400,-400,5000,5000);
    for(let i = 0;i<fs.length;i++){
        px = x;
        py=y;
        //in fourier thing  0= pos(complex num),1 = freq,2=amp,3=phase
       console.log(fs[i])
        x+= scale*fs[i].amp*Math.cos(time*fs[i].k+rotation+fs[i].phase)
        
        y+= scale*fs[i].amp*Math.sin(time*fs[i].k+rotation+fs[i].phase)
        console.log(px,py,x,y)
        //draw line
        ctx.beginPath()
        ctx.moveTo(px,py);
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
        
        //
        
        
    }
    if(!path.includes([x,y]) ){
        path.push([x,y]);    
    }
    
    ctx.beginPath();
    ctx.moveTo(path[0][0],path[0][1]);
    for(let k = 0;k<path.length;k++){
        ctx.lineTo(path[k][0],path[k][1]);  
        
    }
    ctx.stroke();
    ctx.closePath();
    
}
function start(){
        
    const canvas = document.getElementById('fs')
    
    ctx = canvas.getContext('2d');
    ctx.translate(WIDTH/2,HEIGHT/2)
    document.addEventListener("mousemove", function (e) {
    mouseState = e.which;
    mx = e.clientX - canvas.getBoundingClientRect().left-WIDTH/2;
    my = e.clientY - canvas.getBoundingClientRect().top-HEIGHT/2;
});
    
    
    x= [];
    x.push(new Complex(0,10));
    x.push(new Complex(10,10));
    x.push(new Complex(10,-10));
    x.push(new Complex(20,-10));
    console.log(x);
    X = dft(x);
    setInterval(mainLoop,1000/tps);

    
}


//Main
function mainLoop(){
    //scaling time down
    
if(hasDrawn==true){
    time += Math.PI*2/X.length
    if(time>(Math.PI*2)){
        time-=Math.PI*2
    }   
    drawArrows(0,0,1/X.length,0.00005,X);
    //console.log("gaming")
    }else{
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.fillRect(-400,-400,5000,5000);
        if(mouseState ==1){
            temp = new Complex(mx,my)
            if(!userIn.includes(temp)){
            userIn.push(new Complex(mx,my));
            //console.log(userIn)
            }
            isDrawing =true;
            //console.log("nice")
        }
        if(isDrawing == true&&mouseState==0){
            hasDrawn = true;
            X = dft(userIn)
            isDrawing = false;
            //console.log("ssss")
            
        }
    ctx.beginPath();
        ctx.strokeStyle = "black"
    for(let k = 0;k<userIn.length;k++){
        if(k==0){
            ctx.moveTo(userIn[0].a,userIn[0].b);
        }
        //console.log(userIn[k])
        ctx.lineTo(userIn[k].a,userIn[k].b);  
        
    }
    ctx.stroke();
    ctx.closePath();
        
        
        
    }
}
//Generate Complex Numbers


document.addEventListener('DOMContentLoaded', start) //just waits for everything to load first before it does anything c:

