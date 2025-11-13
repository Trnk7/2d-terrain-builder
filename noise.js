const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width =innerWidth;
const height = canvas.height =innerHeight;
var seed =  Math.floor(700+Math.random()*300)+Math.random();

function rnd(x){
  return Math.sin(x*(seed))*seed%1;
}

function lerp(a,b,t){
  return (a+(b-a)*t);
}
function noise(x,y){
  let xi = Math.floor(x);
  let yi = Math.floor(y)
  let xf = x-xi;
  let yf = y-yi;

  let a = rnd(xi**2*(yi*57));
  let b = rnd((xi+1)**2*(yi*57));
  let c = rnd(xi**2*((yi+1)*57));
  let d = rnd((xi+1)**2*((yi+1)*57));

  let l1 = lerp(a,b,xf*xf*(3-2*xf));
  let l2 = lerp(c,d,xf*xf*(3-2*xf));

  return lerp(l1,l2,yf*yf*(3-2*yf));

}
function fract(x,y){
  let amp =1.8,sum=0,total=0,freq=1;
  for(let i=0;i<4;i++){
    total+=noise(x*freq,y*freq)*amp;
    sum+=amp;
    freq*=1.8;
    amp*=.5;
  }
  return total/sum
}

let s=10;
function draw() {
 
  ctx.clearRect(0,0,width,height)
  for(let y=0;y<height;y+=s){
    for(let x=0;x<width;x+=s){
      let c =fract(x*0.005,y*0.005)
      let color = 'rgba(224, 224, 94, 1)';
      if(c<0.03){
        color=`rgba(0, 0, ${255-90/(c+1)}, 1)`
      }else if(c<0.18){
        color = `rgba(${35/c}, ${35/c}, ${6/c}, 1)`
      }else if(c<0.4){
        color=`rgba(0,${179/(1+c)},0, 1)`
      }else if(c<0.7){
        color=`rgba(${60/(c)},${60/(c)}, ${60/(c)}, 1)`
      }else{
        color = `rgb(${c*250},${c*250},${c*250})`
      }
      ctx.fillStyle=color;
      ctx.fillRect(x,y,s,s)
    }
  }

}

draw();
canvas.onclick=(e)=>{
 seed = Math.floor((e.clientX/s)+324)/(2+Math.floor(e.clientY/s))
 draw()
}