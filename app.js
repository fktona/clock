let sw =  document.querySelectorAll('.st_design span');
let ms = document.querySelector('sub');
let actionButton = document.querySelectorAll('.actionButton button');
let executeButton = document.querySelectorAll('.down button');
let initialTime = 0
let sec =  0
let min = 0
let hr = 0

actionButton[1].onclick = ()  => {
    actionButton[1].disabled = true
    actionButton[1]
  setInterval ( () => { 
        initialTime++;
        
         ms.innerHTML = initialTime;
         


         if ( initialTime > 99){
            sec++;
            sw[2].innerHTML = "0" + sec
            initialTime = 0
         }
         else if (sec > 9){
            sw[2].innerHTML = sec
         }


         if ( sec > 59){
            min++;
            sw[1].innerHTML = "0" +  min + ':'
            sec = 0
         }
         else  if (min > 9){
            sw[1].innerHTML = min
         }
          
         if ( min > 59){
            hr++;
            sw[0].innerHTML = "0" + sec
            sw[1].innerHTML = 0
         }
        
       
}, 10) };