import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as l,i as m}from"./assets/vendor-77e16229.js";let a,i;function f(t){const s=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),u=Math.floor(t%864e5%36e5/6e4),c=Math.floor(t%864e5%36e5%6e4/1e3);return{days:s,hours:d,minutes:u,seconds:c}}function h({days:t,hours:o,minutes:n,seconds:r}){return t=t.toString().padStart(2,"0"),o=o.toString().padStart(2,"0"),n=n.toString().padStart(2,"0"),r=r.toString().padStart(2,"0"),{days:t,hours:o,minutes:n,seconds:r}}const e={startBtn:document.querySelector("[data-start]"),timerDays:document.querySelector("[data-days]"),timerHours:document.querySelector("[data-hours]"),timerMinutes:document.querySelector("[data-minutes]"),timerSeconds:document.querySelector("[data-seconds]"),dataInput:document.querySelector("#datetime-picker")};e.startBtn.disabled=!0;l("#datetime-picker",{enableTime:!0,dateFormat:"Y-m-d H:i",defaultDate:new Date,time_24hr:!0,minuteIncrement:1,onClose(t){t[0]<=Date.now()?m.show({position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white",closeOnClick:!0,iconColor:"white",title:"Error",message:"Please choose a date in the future"}):(i=t[0],e.startBtn.disabled=!1)}});e.startBtn.addEventListener("click",()=>{e.startBtn.disabled=!0,e.dataInput.disabled=!0,a=setInterval(()=>{const t=Date.now(),o=i-t;if(o<=0){clearInterval(a),e.startBtn.disabled=!0,e.dataInput.disabled=!1;return}const n=f(o),r=h(n);e.timerDays.textContent=r.days,e.timerHours.textContent=r.hours,e.timerMinutes.textContent=r.minutes,e.timerSeconds.textContent=r.seconds},1e3)});
//# sourceMappingURL=commonHelpers.js.map
