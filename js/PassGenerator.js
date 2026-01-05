const rangeInput = document.querySelector(".range-Input");
const passRange = document.querySelector(".Pass-Range");
const genrateBtn = document.querySelector(".generate-Btn");
const checkBoxes = document.querySelectorAll(".pass-checkbox");
const textInput = document.querySelector(".textInput");
const passwordStrength = document.querySelector(".passwordStrength");
const htmlTag = document.querySelector("html");
const themeBtn = document.querySelector(".theme-btn");
const toastBox = document.querySelector(".toast-box");
const toastBoxContent = document.querySelector(".toast-box-content");
const Progress = document.querySelector(".progress");
let toastInterval = null;
let theme = "light";
let captcha = [];

function setTimerToToast() {
  if (toastInterval) {
    clearInterval(toastInterval);
    Progress.style.width = "0%";
  }

  let proggressStep = 0;
  const duration = 1500;
  const intervalTime = 30;
  const totalSteps = duration / intervalTime;

  toastInterval = setInterval(function () {
    proggressStep++;
    Progress.style.width = `${(proggressStep / totalSteps) * 100}%`;

    if (proggressStep >= totalSteps) {
      clearInterval(toastInterval);
      toastInterval = null;

      setTimeout(() => {
        toastBox.className =
          "toast-box flex flex-col justify-center bg-amber-50 w-75 h-22.5 left-0 duration-300 -translate-x-81.25 top-6 fixed rounded-t-xl rounded-b-sm dark:bg-zinc-700";
        Progress.style.width = "0%";
      }, 300);
    }
  }, intervalTime);
}
function toPersianNumbers(number) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number.toString().replace(/\d/g, function (digit) {
    return persianDigits[parseInt(digit)];
  });
}
function persianToEnglishNumbers(str) {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];

  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}
function generate() {
  const checkedCheckBoxes = document.querySelectorAll(
    ".pass-checkbox:checked"
  ).length;
  if (checkedCheckBoxes === 0) {
    toastBox.className =
      "toast-box flex flex-col justify-center bg-amber-50 w-75 h-22.5 left-0 translate-x-8 duration-300  top-6 fixed rounded-t-xl rounded-b-sm dark:bg-zinc-700";
    toastBoxContent.innerHTML = "لطفا یک گزینه را انتخاب کنید!";
    setTimerToToast();
  } else {
    let words = "";
    if (checkBoxes[0].checked) {
      const Numbers = "0123456789";
      words += Numbers;
    }
    if (checkBoxes[1].checked) {
      const lowercaseWords = "abcdefghijklmnopqrstuvwxyz";
      words += lowercaseWords;
    }
    if (checkBoxes[2].checked) {
      const upperCaseWord = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      words += upperCaseWord;
    }
    if (checkBoxes[3].checked) {
      const symbols = "!@#$%^&*()_+|}{][~?/><";
      words += symbols;
    }
    for (let i = 0; i < +persianToEnglishNumbers(passRange.innerHTML); i++) {
      const randomNum = Math.floor(Math.random() * words.length);
      captcha.push(words[randomNum]);
    }
    textInput.value = captcha.join("");
    captcha = [];
  }

  if (checkedCheckBoxes === 1) {
    passwordStrength.className =
      "h-full passwordStrength rounded-b-md veryBad ";
  } else if (checkedCheckBoxes === 2) {
    passwordStrength.className = "h-full passwordStrength rounded-b-md bad";
  } else if (checkedCheckBoxes === 3) {
    passwordStrength.className = "h-full passwordStrength rounded-b-md good";
  } else if (checkedCheckBoxes === 4) {
    passwordStrength.className =
      "h-full passwordStrength rounded-b-md veryGood";
  }
}
function changetheme() {
  themeBtn.innerHTML = "";
  if (theme === "light") {
    theme = "dark";
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = ` <i
            class="text-gray-700 fa-solid fa-sun hover:text-violet-500 dark:text-slate-300"
          ></i>`;
  } else {
    theme = "light";
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = ` <i
            class="text-gray-700 fa-solid fa-moon hover:text-violet-500 dark:text-slate-300"
          ></i>`;
  }
  setTheme();
}
function detectTheme() {
  const localTheme = localStorage.getItem("theme");
  if (localTheme) {
    theme = localTheme;
  }
  setTheme();
}
function setTheme() {
  themeBtn.innerHTML = "";
  if (theme === "light") {
    htmlTag.classList.remove("dark");
    themeBtn.innerHTML = ` <i
            class="text-gray-700 fa-solid fa-moon hover:text-violet-500 dark:text-slate-300"
          ></i>`;
  } else {
    htmlTag.classList.add("dark");
    themeBtn.innerHTML = ` <i
            class="text-gray-700 fa-solid fa-sun hover:text-violet-500 dark:text-slate-300"
          ></i>`;
  }
}
rangeInput.addEventListener("change", function (event) {
  passRange.innerHTML = toPersianNumbers(event.target.value);
});
genrateBtn.addEventListener("click", generate);
themeBtn.addEventListener("click", changetheme);

