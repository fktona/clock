let counter = Array.from(document.querySelectorAll(".stopwatch span"));
let stopwatch = document.querySelector(".st_design");
const subCounter = document.querySelector("sub");
const actionButton = document.querySelectorAll(".actionButton button");
const executeButton = document.querySelectorAll(".down button");
let parentList = document.querySelector(".list");
let heading = document.querySelector("#tittle");
let ms = 0;
let sec = 0;
let min = 0;
let hr = 0;
let run = -1;
let stop = 0;
let container;
let listBUTTON;
let inputTime;
let TimeNote;
let finalNOTE;

//loading animation

setTimeout(() => {
  document.querySelector(".loading").remove();
  document.querySelector(".loadingText").remove();
  document.querySelector(".container").setAttribute("class", "showAll");
}, 10);

// running the stopwatch
actionButton[1].onclick = () => {
  // condition for starting and pausing
  if (run === -1) {
    let start = actionButton[1];
    start.innerHTML = "PAUSE";
    start.setAttribute("class", "pause");
    document.querySelector("header").style.animationPlayState = "running";

    // setting the timer 
    run = setInterval(() => {
      ms++;

      subCounter.innerHTML = ms;

      if (ms > 99) {
        sec++;
        counter[2].innerHTML = "0" + sec;
        ms = 0;
      } else if (sec > 9) {
        counter[2].innerHTML = sec;
      }

      if (sec >= 59) {
        min++;
        counter[1].innerHTML = "0" + min + ":";
        sec = 0;
      } else if (min > 9) {
        counter[1].innerHTML = min;
      }

      if (min > 59) {
        hr++;
        counter[0].innerHTML = "0" + hr + ":";
        counter[1].innerHTML = "0" + 0 + ":";
      } else if (hr > 9) {
        counter[0].innerHTML = hr;
      }
    }, 10);
  } else {
    clearInterval(run);
    let pause = actionButton[1];
    pause.innerHTML = "START";
    pause.setAttribute("class", "playPause");
    document.querySelector("header").style.animationPlayState = "paused";
    run = -1;
  }
};

// condition for  stoping and reseting
actionButton[0].onclick = () => {
  if (stop === 0) {
    let reset = actionButton[0];
    reset.innerHTML = "reset";
    reset.setAttribute("class", "reset");
    clearInterval(run);
    let pause = actionButton[1];
    pause.innerHTML = "START";
    pause.setAttribute("class", "playPause");
    document.querySelector("header").style.animationPlayState = "paused";
    run = -1;

    stop++;
  } else {
    let reset = actionButton[0];
    reset.setAttribute("class", "stopReset");
    reset.innerHTML = "stop";
    stop = 0;

    counter.reduce((a, b, i) => {
      if (i < 2) b.innerHTML = "00 : ";
      else if (i > 1) {
        b.innerHTML = "00";
      }
    }, 10);
    subCounter.innerHTML = "00";

    sec = 0;
    hr = 0;
    ms = 0;
    min = 0;
  }
};

// lapping each time
actionButton[2].onclick = () => {
  container = document.createElement("div");
  parentList.append(container);
  listBUTTON = document.createElement("button");
  inputTime = document.createElement("input");
  TimeNote = document.createElement("textarea");
  finalNOTE = document.createElement("span");
  listBUTTON.setAttribute("class", "listBUTTON");

  listBUTTON.innerHTML = "note";
  counter.reduce((a, b) => {
    inputTime.value += b.textContent;
    TimeNote.value = inputTime.value;
  }, 0);

  const containerElements = Array.from(document.querySelectorAll(".list div"));
  containerElements.forEach((containerElements) => {
    containerElements.append(inputTime, listBUTTON, TimeNote, finalNOTE);
    inputTime.readOnly = true;
    let eachTextarea = containerElements.querySelector("textarea");
    let eachButton = containerElements.querySelector("button");
    let eachspan = containerElements.querySelector("span");
    eachspan.classList.add("none");
    eachspan.innerHTML = ` @ ${eachTextarea.value }`;
    eachButton.onclick = () => {
      eachTextarea.classList.toggle("show");
      eachTextarea.autofocus = true;
    };
    eachTextarea.onkeyup = () => {
      eachspan.innerHTML = `@${eachTextarea.value}`;
    };
  });

  // clearing the inputTime area
  executeButton[1].onclick = () => {
    let confirm = document.querySelector(".confirmation");
    let confirmBTN = document.querySelectorAll(".confirmation button");
    confirm.style.display = "flex";
    confirmBTN[0].onclick = () => {
      parentList.innerHTML = "";
      confirm.style.display = "none";
    };
    confirmBTN[1].onclick = () => {
      confirm.style.display = "none";
    };
  };
};

executeButton[0].onclick = (event) => {
  let get = document.createElement("div");
  document.querySelector(".download").append(get);
  get.setAttribute("class", "downloads");
  let tittle = heading.cloneNode(true);
  tittle.classList.add("ni");

  get.append(tittle);
  let info = Array.from(document.querySelectorAll(".list span"));
  info.reduce((a, b) => {
    b.classList.replace("none", "finalnote");
    let res = b.cloneNode(true);
    get.append(res);
  }, 0);

  var opt = {
    margin: 1,
    filename: "Result.pdf",
    image: { type: "jpeg", quality: 0.95 },
    //html2canvas: {scale: 2},
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(get).set(opt).save();

  get.remove();

  info.reduce((a, b) => {
    b.classList.replace("finalnote", "none");
  }, 0);
};
