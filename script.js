// === DOM 요소 선택 ===
const hatSelect = document.getElementById("hatSelect");
const scarfColorInput = document.getElementById("scarfColor");
const bgSelect = document.getElementById("bgSelect");
const randomBtn = document.getElementById("randomBtn");
const saveBtn = document.getElementById("saveBtn");
const scarfPattern = document.getElementById("scarfPattern");

const snowman = document.getElementById("snowman");
const hatArea = document.getElementById("hatArea");
const scarf = document.getElementById("scarf");
const scene = document.getElementById("scene");


// === 모자 변경 ===
function updateHat() {
  const type = hatSelect.value;

  if (type === "none") {
    hatArea.innerHTML = "";
    hatArea.className = "hat hat-none";
  } else if (type === "classic") {
    hatArea.innerHTML = '<div class="hat-classic"></div>';
    hatArea.className = "hat";
  } else if (type === "beanie") {
    hatArea.innerHTML = '<div class="hat-beanie"></div>';
    hatArea.className = "hat";
  } else if (type === "ears") {
    hatArea.innerHTML = '<div class="hat-ears"></div>';
    hatArea.className = "hat";
  } else if (type === "beret") {
    hatArea.innerHTML = '<div class="hat-beret"></div>';
    hatArea.className = "hat";
  } else if (type === "santa") {
    hatArea.innerHTML = '<div class="hat-santa"></div>';
    hatArea.className = "hat";
  }
}


// === 목도리 색 ===
// CSS 변수 --scarf-color 에 색을 넣어서 패턴이랑 같이 바뀌게 함
function updateScarfColor() {
  const color = scarfColorInput.value;
  const main = scarf.querySelector(".scarf-main");
  const tails = scarf.querySelectorAll(".scarf-tail");

  main.style.setProperty("--scarf-color", color);
  tails.forEach((el) => {
    el.style.setProperty("--scarf-color", color);
  });
}


// === 목도리 패턴 ===
function updateScarfPattern() {
  const pattern = scarfPattern.value; // solid / dot / stripe
  const main = scarf.querySelector(".scarf-main");
  const tails = scarf.querySelectorAll(".scarf-tail");

  // 기존 패턴 클래스 제거
  main.classList.remove("solid", "dot", "stripe");
  tails.forEach((t) => {
    t.classList.remove("solid", "dot", "stripe");
  });

  // 선택한 패턴 클래스 추가
  main.classList.add(pattern);
  tails.forEach((t) => {
    t.classList.add(pattern);
  });
}


// === 배경 변경 ===
function updateBackground() {
  const bg = bgSelect.value;

  if (bg === "day") {
    scene.style.background =
      "linear-gradient(to top, #e0f7fa 0%, #f5fbff 50%, #e3f2fd 100%)";
  } else if (bg === "sunset") {
    scene.style.background =
      "linear-gradient(to top, #ffcc80 0%, #ffab91 45%, #f8bbd0 100%)";
  } else if (bg === "night") {
    scene.style.background =
      "linear-gradient(to top, #263238 0%, #37474f 40%, #90a4ae 100%)";
  }
}


// === 랜덤 생성 ===
function randomizeSnowman() {
  const hats = ["none", "classic", "beanie", "ears", "beret", "santa"];
  const bgs = ["day", "sunset", "night"];
  const patterns = ["solid", "dot", "stripe"];

  hatSelect.value = hats[Math.floor(Math.random() * hats.length)];
  bgSelect.value = bgs[Math.floor(Math.random() * bgs.length)];
  scarfPattern.value = patterns[Math.floor(Math.random() * patterns.length)];

  const randomColor = () => {
    const r = 150 + Math.floor(Math.random() * 100);
    const g = 80 + Math.floor(Math.random() * 140);
    const b = 80 + Math.floor(Math.random() * 140);
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  scarfColorInput.value = randomColor();

  applyAll();
}


// === 저장하기 (PNG) ===
function saveSnowman() {
  if (typeof html2canvas !== "function") {
    alert("html2canvas 로딩에 실패했어요 😢");
    return;
  }

  html2canvas(scene).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-snowman.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}


// === 전체 적용 ===
function applyAll() {
  updateHat();
  updateScarfColor();
  updateScarfPattern();
  updateBackground();
}


// === 눈송이 추가 ===
function createSnowflakes() {
  for (let i = 0; i < 40; i++) {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.style.left = Math.random() * 100 + "%";
    flake.style.top = -(Math.random() * 100) + "px";
    flake.style.animationDuration = 7 + Math.random() * 6 + "s";
    flake.style.opacity = 0.4 + Math.random() * 0.6;
    flake.style.width = flake.style.height =
      2 + Math.random() * 4 + "px";
    scene.appendChild(flake);
  }
}


// === 이벤트 리스너 등록 ===
hatSelect.addEventListener("change", updateHat);
scarfColorInput.addEventListener("input", () => {
  updateScarfColor();
});
bgSelect.addEventListener("change", updateBackground);
randomBtn.addEventListener("click", randomizeSnowman);
saveBtn.addEventListener("click", saveSnowman);
scarfPattern.addEventListener("change", updateScarfPattern);


// === 초기 실행 ===
applyAll();
createSnowflakes();
