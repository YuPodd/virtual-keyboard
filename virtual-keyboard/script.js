/*window.addEventListener("DOMContentLoaded", function () {
 init();
});*/

const row1 = [{
    ru: "1",
    en: "1",
    shift: "!"
  },
  {
    ru: "2",
    en: "2",
    shift: "@"
  },
  {
    ru: "3",
    en: "3",
    shift: "#"
  },
  {
    ru: "4",
    en: "4",
    shift: "$"
  },
  {
    ru: "5",
    en: "5",
    shift: "%"
  },
  {
    ru: "6",
    en: "6",
    shift: "№"
  },
  {
    ru: "7",
    en: "7",
    shift: "&"
  },
  {
    ru: "8",
    en: "8",
    shift: "*"
  },
  {
    ru: "9",
    en: "9",
    shift: "("
  },
  {
    ru: "0",
    en: "0",
    shift: ")"
  },
  {
    ru: "sound",
    en: "sound",
    shift: "sound"
  },
];


const row2 = [{
    ru: "microphone",
    en: "microphone"
  },
  {
    ru: "й",
    en: "q"
  },
  {
    ru: "ц",
    en: "w"
  },
  {
    ru: "у",
    en: "e"
  },
  {
    ru: "к",
    en: "r"
  },
  {
    ru: "е",
    en: "t"
  },
  {
    ru: "н",
    en: "y"
  },
  {
    ru: "г",
    en: "u"
  },
  {
    ru: "ш",
    en: "i"
  },
  {
    ru: "щ",
    en: "o"
  },
  {
    ru: "з",
    en: "p"
  },
  {
    ru: "х",
    en: "["
  },
  {
    ru: "ъ",
    en: "]"
  },
  {
    ru: "Backspace",
    en: "Backspace"
  }
];

const row3 = [{
    ru: "CapsLock",
    en: "CapsLock"
  },
  {
    ru: "ф",
    en: "a"
  },
  {
    ru: "ы",
    en: "s"
  },
  {
    ru: "в",
    en: "d"
  },
  {
    ru: "а",
    en: "f"
  },
  {
    ru: "п",
    en: "g"
  },
  {
    ru: "р",
    en: "h"
  },
  {
    ru: "о",
    en: "j"
  },
  {
    ru: "л",
    en: "k"
  },
  {
    ru: "д",
    en: "l"
  },
  {
    ru: "ж",
    en: ";"
  },
  {
    ru: "э",
    en: "'"
  },
  {
    ru: "Enter",
    en: "Enter"
  }
];

const row4 = [{
    ru: "Shift",
    en: "Shift"
  },
  {
    ru: "я",
    en: "z"
  },
  {
    ru: "ч",
    en: "x"
  },
  {
    ru: "с",
    en: "c"
  },
  {
    ru: "м",
    en: "v"
  },
  {
    ru: "и",
    en: "b"
  },
  {
    ru: "т",
    en: "n"
  },
  {
    ru: "ь",
    en: "m"
  },
  {
    ru: "б",
    en: "<"
  },
  {
    ru: "ю",
    en: ">"
  },
  {
    ru: ",",
    en: ","
  },
  {
    ru: ".",
    en: "."
  }

];

const row5 = [{
    ru: "ru",
    en: "en"
  },
  {
    ru: " ",
    en: " "
  },
  {
    ru: "<-",
    en: "<-"
  },
  {
    ru: "->",
    en: "->"
  }

];

const textarea = document.querySelector(".keyboard-input");

// ******** SHOW/HIDE FUNCTION ***************
const keyboard = document.querySelector(".keyboard");
let displayKeyboard = true;

const showHideButton = document.querySelector(".show-hide-keyboard");

showHideButton.addEventListener("click", () => {
  if (displayKeyboard === true) {
    keyboard.className = "keyboard keyboard-hide";
    displayKeyboard = false;
  } else {
    keyboard.className = "keyboard keyboard-display";
    displayKeyboard = true;
  }


});
//*****************************

let capsEnabled = false;
let shiftEnabled = false;
let keyboardVisible = true;
let soundEnabled = false;
let microphoneEnabled = false;
let language = "en";



row1.forEach(btn => createBtn(btn, 1));
row2.forEach(btn => createBtn(btn, 2));
row3.forEach(btn => createBtn(btn, 3));
row4.forEach(btn => createBtn(btn, 4));
row5.forEach(btn => createBtn(btn, 5));
textarea.focus();

// ************ CREATE BUTTONS *****************
function createBtn(btn, rowNumber) {

  let button = document.createElement("button");
  button.type = 'button';
  button.appendChild(document.createTextNode(btn.en));
  button.classList.add("keyboard-key");
  button.id = btn.en;


  // add to DOM
  let row = document.querySelector(".row-" + rowNumber);
  row.append(button);

  //add special classes and events for buttons
  switch (btn.en) {
    case "microphone":
      button.classList.add("key-long");
      button.classList.add("key-activatable");
      button.innerHTML = `<img src="assets/microphone.svg" alt="microphone"></img>`;
      button.addEventListener('click', function () {
        microphoneEnabled = !microphoneEnabled;

        if (microphoneEnabled === true) {
          button.className = "keyboard-key key-long key-active";

        } else {
          button.className = "keyboard-key key-long key-activatable";
        }
      });
      return;
    case "sound":
      button.innerHTML = `<img src="assets/sound.svg" alt="sound"></img>`;
      button.classList.add("key-activatable");
      button.addEventListener('click', function () {
        soundEnabled = !soundEnabled;

        if (soundEnabled === true) {
          button.className = "keyboard-key key-active";

        } else {
          button.className = "keyboard-key key-activatable";
        }
      });
      return;
    case "Shift":
      button.classList.add("key-activatable");
      button.addEventListener('click', function () {
        shiftEnabled = !shiftEnabled;
        button.className = shiftEnabled === true ? "keyboard-key key-active" : "keyboard-key key-activatable";
        row1.forEach(btn => updateBtnText(btn, 1));
        if (soundEnabled === true) {
          const audio = document.querySelector(`audio[data-key="Shift"]`);
          if (!audio) return;
          audio.currentTime = 0;
          audio.play();
        }
      });

      return;
    case "CapsLock":
      button.classList.add("key-activatable");
      button.addEventListener('click', function () {
        capsEnabled = !capsEnabled;
        button.className = capsEnabled === true ? "keyboard-key key-active" : "keyboard-key key-activatable";
        if (soundEnabled === true) {
          const audio = document.querySelector(`audio[data-key="CapsLk"]`);
          if (!audio) return;
          audio.currentTime = 0;
          audio.play();
        }
      });
      return;
    case "Enter":
      button.addEventListener('click', function () {
        insertSymbolToTextarea("\n");
        if (soundEnabled === true) {
          const audio = document.querySelector(`audio[data-key="Enter"]`);
          if (!audio) return;
          audio.currentTime = 0;
          audio.play();
        }
      });
      return;
    case "Backspace":
      button.classList.add("key-long");
      button.addEventListener('click', function () {
        let selStart = textarea.selectionStart;
        let selEnd = textarea.selectionEnd;

        //remove from textarea selected text
        textarea.value = [textarea.value.slice(0, selStart - 1), textarea.value.slice(selEnd)].join('');

        //return cursor not in start position, but on focus
        textarea.focus();
        textarea.setSelectionRange(selStart - 1, selEnd - 1);
        if (soundEnabled === true) {
          const audio = document.querySelector(`audio[data-key="Backspace"]`);
          if (!audio) return;
          audio.currentTime = 0;
          audio.play();
        }
      });
      return;
    case " ":
      button.classList.add("key-extra-long");
      break;
    case "en":
      button.addEventListener('click', function () {
        if (language === "en") {
          language = "ru";
          button.textContent = "ru";
        } else if (language === "ru") {
          language = "en";
          button.textContent = "en";
        }
        row2.forEach(btn => updateBtnText(btn, 2));
        row3.forEach(btn => updateBtnText(btn, 3));
        row4.forEach(btn => updateBtnText(btn, 4));
      });
      return;
    case "->":
      button.addEventListener('click', function () {
        let selStart = textarea.selectionStart;
        let selEnd = textarea.selectionEnd;
        textarea.focus();
        textarea.setSelectionRange(selStart + 1, selEnd + 1);
      });
      return;
    case "<-":
      button.addEventListener('click', function () {
        let selStart = textarea.selectionStart;
        let selEnd = textarea.selectionEnd;
        textarea.focus();
        textarea.setSelectionRange(selStart - 1, selEnd - 1);
      });
      return;

  }

  //***********ADD CLICK EVENT FOR EVERY BUTTON**************
  button.addEventListener('click', function (event) {
    let symbol = language === "en" ? btn.en : btn.ru;
    if (capsEnabled === true) {
      symbol = symbol.toUpperCase();
    }
    if (shiftEnabled === true) {
      symbol = inverseCase(symbol);
    }
    if (shiftEnabled === true && btn.shift) {
      symbol = btn.shift;
    }

    insertSymbolToTextarea(symbol);
    // ******* SOUND ******
    if (soundEnabled === true) {
      const audio = document.querySelector(`audio[data-key="keyboard-key"]`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
    }

  });
}

//*************** UPDATE BTN EN/RU *************** 
function updateBtnText(btn, rowNumber) {
  let button = document.getElementById(btn.en);
  if (language === "en") {
    button.textContent = btn.en;
  } else if (language === "ru") {
    button.textContent = btn.ru;
  }

  if (shiftEnabled === true && btn.shift) {
    button.textContent = btn.shift;
  }

  switch (btn.en) {
    case "microphone":
      button.classList.add("key-long");
      button.innerHTML = `<img src="assets/microphone.svg" alt="microphone"></img>`;
      return;
  }
  switch (btn.shift) {
    case "sound":
      button.innerHTML = `<img src="assets/sound.svg" alt="sound"></img>`;
      button.classList.add("key-activatable");
      return;
  }
}


//************ INSERT SYMBOL TO TEXTAREA*************** 
function insertSymbolToTextarea(symbol) {
  let selStart = textarea.selectionStart;
  let selEnd = textarea.selectionEnd;

  //type in textarea clicked symbol
  textarea.value = [textarea.value.slice(0, selStart), symbol, textarea.value.slice(selEnd)].join('');

  //return cursor not in start position, but on focus
  textarea.focus();
  textarea.setSelectionRange(selStart + 1, selEnd + 1);
}



function inverseCase(symbol) {
  return symbol === symbol.toUpperCase() ? symbol.toLowerCase() : symbol.toUpperCase();
}

window.addEventListener('keydown', colorKey);
window.addEventListener('keyup', uncolorKey);

function colorKey(event) {

  const key = document.querySelector(`button[id="${event.key}"]`);
  key.classList.add('pressed');
}

function uncolorKey(event) {
  const key = document.querySelector(`button[id="${event.key}"]`);
  key.classList.remove('pressed');
}