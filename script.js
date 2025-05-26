const btnStar = document.querySelector('#start');
const btnClear = document.querySelector('#clear');
let eTime = document.querySelector('#time');
let eMinute = document.querySelector('#minute');
let eSecond = document.querySelector('#second');

let time = 0;
let minute = 0;
let second = 0;
let isValid = true;
let interval;

function incrementeSeconds() {
   second += 1
   eSecond.innerText = second.toString().padStart(2, '0');

   if (second === 60) { 
        minute += 1
        second = 0
   }
   eMinute.innerText = minute.toString().padStart(2, '0');

   if (minute === 60) {
        time += 1
        minute = 0
   }
   eTime.innerText = time.toString().padStart(2, '0');
}

function validationToggle () {
    if (isValid) {
        interval = setInterval(incrementeSeconds, 1000);
        btnStar.innerHTML = 'Pausar';
        isValid = false;
    } else {
       clearInterval(interval);
       btnStar.innerHTML = 'Iniciar';
       isValid = true;
    }
}

function clearTimer () {
    clearInterval(interval);
    time = 0;
    minute = 0;
    second = 0;
    eTime.innerHTML = '00';
    eMinute.innerHTML = '00';
    eSecond.innerHTML = '00';
    btnStar.innerHTML = 'Iniciar';
}

btnStar.addEventListener('click', validationToggle);
btnClear.addEventListener('click', clearTimer);