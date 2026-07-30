const input=document.getElementById("lengthInput");
const result=document.getElementById("result");
const detail=document.getElementById("detail");

const HMH_CM=133;
const LY=9.4607304725808e15;

function parseLength(text){
 text=text.trim().toLowerCase();
 if(!text) return null;
 const m=text.match(/^([+-]?\d+(?:\.\d+)?)\s*([a-z가-힣]*)$/);
 if(!m) return "err";
 const value=parseFloat(m[1]);
 let unit=m[2]||"m";
 let cm;
 switch(unit){
   case "cm": cm=value; break;
   case "m": cm=value*100; break;
   case "km": cm=value*100000; break;
   case "광년":
   case "ly": cm=value*LY*100; break;
   default: return "unit";
 }
 return cm;
}

input.addEventListener("input",()=>{
 const cm=parseLength(input.value);
 if(cm===null){
   result.textContent="0 HMH";
   detail.textContent="숫자만 입력하면 m로 계산됩니다.";
   return;
 }
 if(cm==="err"){
   result.textContent="입력 오류";
   detail.textContent="예) 400cm, 2m, 0.5km";
   return;
 }
 if(cm==="unit"){
   result.textContent="지원하지 않는 단위";
   detail.textContent="cm / m / km / 광년";
   return;
 }

 const hmh=Math.floor(cm/HMH_CM);
 let remain=Math.round(cm-hmh*HMH_CM);

 if(remain===0){
   result.textContent=`${hmh.toLocaleString()} HMH`;
 }else{
   result.textContent=`${hmh.toLocaleString()} HMH + ${remain.toLocaleString()}cm`;
 }

 detail.textContent=`총 길이: ${cm.toLocaleString(undefined,{maximumFractionDigits:2})}cm`;
});
