import"./assets/styles-276a3ff4.js";import{i as s}from"./assets/vendor-77e16229.js";s.settings({progressBar:!1,icon:"",layout:2,position:"topRight"});const i=document.querySelector(".form");let o,r;i.addEventListener("change",e=>{e.target.name==="delay"&&(o=e.target.value),e.target.name==="state"&&(r=e.target.value)});i.addEventListener("submit",e=>{e.preventDefault(),a(o,r)});function a(e,n){new Promise((t,m)=>{setTimeout(()=>{n==="fulfilled"?t(e):m(e)},e)}).then(t=>{s.success({message:`✅ Fulfilled promise in ${t}ms`,onOpening:()=>console.log(`✅ Fulfilled promise in ${t}ms`)})}).catch(t=>{s.error({message:`❌ Rejected promise in ${t}ms`,onOpening:()=>console.log(`❌ Rejected promise in ${t}ms`)})})}
//# sourceMappingURL=commonHelpers2.js.map
