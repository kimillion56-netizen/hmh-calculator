
const HMH_CM=133;
const LY=9.4607304725808e15;
const input=document.getElementById("lengthInput");
const result=document.getElementById("result");
const foxes=document.getElementById("foxes");

function parse(v){
 v=v.trim().toLowerCase();
 if(!v) return null;
 const m=v.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-z가-힣]*)$/);
 if(!m) return "err";
 const n=parseFloat(m[1]); let u=m[2]||"m";
 switch(u){
   case "cm": return n;
   case "m": return n*100;
   case "km": return n*100000;
   case "광년":
   case "ly": return n*LY*100;
   default:return "unit";
 }
}
input.addEventListener("input",()=>{
 const cm=parse(input.value);
 if(cm===null){result.textContent="0 HMH";foxes.textContent="";return;}
 if(cm==="err"){result.textContent="입력 오류";foxes.textContent="";return;}
 if(cm==="unit"){result.textContent="지원하지 않는 단위";foxes.textContent="";return;}
 const h=Math.floor(cm/HMH_CM);
 const rem=Math.round(cm-h*HMH_CM);
 result.textContent= rem?`${h.toLocaleString()} HMH + ${rem.toLocaleString()}cm`:`${h.toLocaleString()} HMH`;
 if(h===0){foxes.textContent="";return;}
 const max=100;
 const show=Math.min(h,max);
 let arr=[];
 for(let i=0;i<show;i++) arr.push("🦊");
 foxes.textContent=arr.join(" ");
 if(h>max){
   foxes.textContent += `\n\n... 외 ${ (h-max).toLocaleString() }마리`;
 }
});
