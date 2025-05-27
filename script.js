const btnStar = document.querySelector('#start');
const btnClear = document.querySelector('#clear');
const btnSave = document.querySelector('#save');
const indiceList = document.querySelector('#indice');
let eTime = document.querySelector('#time');
let eMinute = document.querySelector('#minute');
let eSecond = document.querySelector('#second');

let time = 0;
let minute = 0;
let second = 0;
let isValid = true;
let interval, tbody, header;

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

function saveTimer () {
    // Header
    const resultTHeader = indiceList.getElementsByTagName("thead");
    if (resultTHeader.length === 0) {
        header = document.createElement("thead");

        const headerTr = document.createElement("tr");
        header.appendChild(headerTr);
        
        const columnTime = document.createElement("th");
        const contentTime = document.createTextNode("Horas");
        columnTime.appendChild(contentTime);

        const columnMinute = document.createElement("th");
        const contentMinute = document.createTextNode("Minutos");
        columnMinute.appendChild(contentMinute);

        const columnSecond = document.createElement("th");
        const contentSecond = document.createTextNode("Segundos");
        columnSecond.appendChild(contentSecond);

        header.appendChild(columnTime);
        header.appendChild(columnMinute);
        header.appendChild(columnSecond);
    } else {
        tHeader = resultTHeader[0]; 
    }

    // Content
    const resultTBody = indiceList.getElementsByTagName("tbody");
    if (resultTBody.length === 0) {
        tBody = document.createElement("tbody");
    } else {
        tBody = resultTBody[0];
    }
    const newRow = document.createElement("tr");

    const newTd = document.createElement("td");
    const newContentTime = document.createTextNode(`${time}`);
    newTd.appendChild(newContentTime);

    const newTd2 = document.createElement("td");
    const newContentMinute = document.createTextNode(`${minute}`);
    newTd2.appendChild(newContentMinute);

    const newTd3 = document.createElement("td");
    const newContentSecond = document.createTextNode(`${second}`);
    newTd3.appendChild(newContentSecond);

    indiceList.appendChild(header);
    newRow.appendChild(newTd);
    newRow.appendChild(newTd2);
    newRow.appendChild(newTd3);
    tBody.appendChild(newRow);

    indiceList.appendChild(tBody);
}

btnStar.addEventListener('click', validationToggle);
btnClear.addEventListener('click', clearTimer);
btnSave.addEventListener('click', saveTimer);