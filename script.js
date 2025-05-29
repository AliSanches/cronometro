const btnStar = document.querySelector('#start');
const btnClear = document.querySelector('#clear');
const btnSave = document.querySelector('#save');
const btnClearTable = document.querySelector("#clearTable");
const btnModal = document.querySelector("#plan");
const btnCancelModal = document.querySelector("#cancelModal");
const btnAplic = document.querySelector("#aplicTime");
const indiceList = document.querySelector("#indice");
const container = document.querySelector("#container-clear");
const containerModal = document.querySelector("#container-modal");
let eTime = document.querySelector('#time');
let eMinute = document.querySelector('#minute');
let eSecond = document.querySelector('#second');

let time = 0;
let minute = 0;
let second = 0;
let isValid = true;
let isModal = true;
let isPlan = false;
let interval, tbody, header, taskValue, taskValueModal, resultTHeader, resultTBody, taskInputModal;
let arrayTasks = [];

function incrementeSeconds () {
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

function decrementSeconds () {
   second -= 1
   eSecond.innerText = second.toString().padStart(2, '0');

   if (second === 0) { 
        minute -= 1
        second = 60
   }
   eMinute.innerText = minute.toString().padStart(2, '0');

   if (minute === 0) {
        time -= 1
        minute = 60
   }
   eTime.innerText = time.toString().padStart(2, '0');

    if (time === 0 && minute === 0 && second === 0) {
        clearInterval(interval);    
    }
}

function validationToggle () {
    clearInterval(interval);

    if (isPlan) {
        if (isValid) {
            interval = setInterval(decrementSeconds, 1000);
            btnStar.innerHTML = 'Pausar';
            isValid = false;
            isPlan = false;
        } else {
            clearInterval(interval);
            btnStar.innerHTML = 'Iniciar';
            isValid = true;
            isPlan = false;
        }
    }  else {
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
}

function clearTimer () {
    clearInterval(interval);
    time = 0;
    minute = 0;
    second = 0;
    eTime.innerHTML = '00';
    eMinute.innerHTML = '00';
    eSecond.innerHTML = '00';
    document.querySelector('#taskInput').value = '';
    btnStar.innerHTML = 'Iniciar';
    isValid = true;
}

function clearTable () {
    localStorage.clear();
    arrayTasks = [];
    if (resultTHeader.length === 1) {
        header.remove();
    }
    if (resultTBody.length === 1) {
        tBody.remove();
    }
    container.classList.remove("displayFlex");
}

function saveTimer () {
    // Header
    resultTHeader = indiceList.getElementsByTagName("thead");
    verifyHeader(resultTHeader);

    // Content
    resultTBody = indiceList.getElementsByTagName("tbody");
    verifyBody(resultTBody);

    const newRow = document.createElement("tr");

    taskValue = document.getElementById('taskInput').value;

    const newTask = document.createElement("td");
    const newContentTask = document.createTextNode(`${taskValue}`);
    newTask.appendChild(newContentTask);

    const newTd = document.createElement("td");
    const newContentTime = document.createTextNode(`${time.toString().padStart(2, '0')}`);
    newTd.appendChild(newContentTime);

    const newTd2 = document.createElement("td");
    const newContentMinute = document.createTextNode(`${minute.toString().padStart(2, '0')}`);
    newTd2.appendChild(newContentMinute);

    const newTd3 = document.createElement("td");
    const newContentSecond = document.createTextNode(`${second.toString().padStart(2, '0')}`);
    newTd3.appendChild(newContentSecond);

    indiceList.appendChild(header);
    newRow.appendChild(newTask);
    newRow.appendChild(newTd);
    newRow.appendChild(newTd2);
    newRow.appendChild(newTd3);
    tBody.appendChild(newRow);

    let addTask = {
        nameTask: taskValue,
        hours: time,
        minutes: minute,
        seconds: second,
    }

    arrayTasks.push(addTask);

    indiceList.appendChild(tBody);
    localStorage.setItem("task", JSON.stringify(arrayTasks));

    container.classList.add("displayFlex");
    clearTimer();
}

function verifyLocalStorage () {
    try {
        let localStorageTask = JSON.parse(localStorage.getItem("task"));

        resultTHeader = indiceList.getElementsByTagName("thead");

        verifyHeader(resultTHeader);

        resultTBody = indiceList.getElementsByTagName("tbody");
        verifyBody(resultTBody);

        for (let i = 0; i < localStorageTask.length; i++) {
            const newRow = document.createElement("tr");

            const newTask = document.createElement("td");
            const newContentTask = document.createTextNode(`${localStorageTask[i].nameTask}`);
            newTask.appendChild(newContentTask);

            const newTd = document.createElement("td");
            const newContentTime = document.createTextNode(`${localStorageTask[i].hours.toString().padStart(2, "0")}`);
            newTd.appendChild(newContentTime);

            const newTd2 = document.createElement("td");
            const newContentMinute = document.createTextNode(`${localStorageTask[i].minutes.toString().padStart(2, "0")}`);
            newTd2.appendChild(newContentMinute);

            const newTd3 = document.createElement("td");
            const newContentSecond = document.createTextNode(`${localStorageTask[i].seconds.toString().padStart(2, "0")}`);
            newTd3.appendChild(newContentSecond);

            indiceList.appendChild(header);
            newRow.appendChild(newTask);
            newRow.appendChild(newTd);
            newRow.appendChild(newTd2);
            newRow.appendChild(newTd3);
            tBody.appendChild(newRow);

            indiceList.appendChild(tBody);
        }

        if (localStorageTask.length) {
            container.classList.add("displayFlex");
        }
    } catch (error) {}
}

function modal () {
    if (isModal) {
        containerModal.classList.add("dFlexModal");
        isModal = false;
    } else {
        containerModal.classList.remove("dFlexModal");
        isModal = true;
    }
}

function plan () {
    taskValueModal = document.getElementById('taskTime').value;
    taskInputModal = document.getElementById('taskInputModal').value;

    if (taskValueModal === '') {
        window.alert("O campo tempo não pode ser vazio!");
    }

    try {
        const hour = taskValueModal[0] + taskValueModal[1];
        const minutes = taskValueModal[3] + taskValueModal[4];
        time = hour;
        minute = minutes;
        second = 60;

        eTime.innerHTML = time;
        eMinute.innerHTML  = minute;
        eSecond.innerHTML  = second;
        document.getElementById('taskInput').value = taskInputModal;

        isPlan = true;

        containerModal.classList.remove("dFlexModal");
        isModal = true;

        document.getElementById('taskTime').value = '';
        document.getElementById('taskInputModal').value = '';
    } catch (error) {}
}   

const verifyHeader = (element) => {
    if (element.length === 0) {
        header = document.createElement("thead");

        const headerTr = document.createElement("tr");
        header.appendChild(headerTr);

        const columnTask = document.createElement("th");
        const contentTask = document.createTextNode("Tarefa");
        columnTask.appendChild(contentTask);
        
        const columnTime = document.createElement("th");
        const contentTime = document.createTextNode("Hora");
        columnTime.appendChild(contentTime);

        const columnMinute = document.createElement("th");
        const contentMinute = document.createTextNode("Minutos");
        columnMinute.appendChild(contentMinute);

        const columnSecond = document.createElement("th");
        const contentSecond = document.createTextNode("Segundos");
        columnSecond.appendChild(contentSecond);

        header.appendChild(columnTask);
        header.appendChild(columnTime);
        header.appendChild(columnMinute);
        header.appendChild(columnSecond);
    } else {
        return tHeader = resultTHeader[0]; 
    }

}

const verifyBody = (element) => {
    if (element.length === 0) {
        tBody = document.createElement("tbody");
    } else {
        return tBody = resultTBody[0];
    }
}

btnStar.addEventListener('click', validationToggle);
btnClear.addEventListener('click', clearTimer);
btnSave.addEventListener('click', saveTimer);
btnClearTable.addEventListener('click', clearTable);
btnModal.addEventListener('click', modal);
btnCancelModal.addEventListener('click', modal);
btnAplic.addEventListener('click', plan);