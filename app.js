let sw =  document.querySelectorAll('.st_design span');
let ms = document.querySelector('sub');
let actionButton = document.querySelectorAll('.actionButton button');
let executeButton = document.querySelectorAll('.down button')
let initialTime = 0
let sec =  0
let min = 0
let hr = 0
let run = -1
let stop = 0

actionButton[1].onclick =  ()  => { 
    if (run === -1 ) {
        let pause = actionButton[1]
        pause.innerHTML = 'PAUSE';
pause.setAttribute('class', 'pause');

 run = setInterval ( () => { 
        initialTime++;
        
         ms.innerHTML = initialTime;
         


         if ( initialTime >= 99){
            sec++;
            sw[2].innerHTML = "0" + sec
            initialTime = 0
         }
         else if (sec > 9){
            sw[2].innerHTML = sec
         }


         if ( sec >= 59){
            min++;
            sw[1].innerHTML = "0" +  min + ':'
            sec = 0
         }
         else  if (min > 9){
            sw[1].innerHTML = min
         }
          
         if ( min >= 59){
            hr++;
            sw[0].innerHTML = "0" + hr + ":"
            sw[1].innerHTML = "0" + 0 + ":"
         }
        
       
}, 10) 
  } else {
clearInterval(run)
run = -1

let start = actionButton[1]
        start.innerHTML = 'START';
start.setAttribute('class', 'playPause')
 }

 
};

 actionButton[0].onclick = () => {
    if(stop === 0 && run != -1){
        let reset = actionButton[0]
        reset.innerHTML = 'reset'
        reset.setAttribute('class', 'reset')
        clearInterval(run)
        stop++
    }
     else {
        let reset = actionButton[0]
           stop.setAttribute('class', 'stopReset')
        stop.innerHTML 
       
        sw[0].textContent = '00 :'
        sw[1].textContent = '00 :'
        sw[2].textContent = '00'
        ms.textContent = '00'
        stop = 0

     }

 }