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


// === 목도리 스타일 적용 (색 + 패턴) ===
function applyScarfStyle() {
  const color = scarfColorInput.value;
  const pattern = scarfPattern.value;

  const main = scarf.querySelector(".scarf-main");
  const tails = scarf.querySelectorAll(".scarf-tail");

  const allParts = [main, ...tails];

  // 1) 기본: 바탕 색
  allParts.forEach(el => {
    el.style.backgroundColor = color;
    el.style.backgroundImage = "none";
    el.style.backgroundSize = "";
    el.style.backgroundRepeat = "";
    el.style.backgroundPosition = "";
  });

  // 2) 패턴 적용
  if (pattern === "dot") {
    // 큰 흰색 동글동글 도트
    const bgImage = "radial-gradient(circle, #ffffff 0 45%, transparent 45%)";
    const bgSize = "12px 12px";

    allParts.forEach(el => {
      el.style.backgroundImage = bgImage;
      el.style.backgroundSize = bgSize;
      el.style.backgroundRepeat = "repeat";
    });

  } else if (pattern === "stripe") {
    // 스트라이프: 색 → 흰색 → 색 → 흰색
    const bgImage = `repeating-linear-gradient(
      90deg,
      transparent 0 10px,
      #ffffff 10px 20px
    )`;

    allParts.forEach(el => {
      el.style.backgroundImage = bgImage;
      el.style.backgroundRepeat = "repeat";
    });
  }
}


// === 색 변경 시 ===
function updateScarfColor() {
  applyScarfStyle();
}


// === 패턴 변경 시 ===
function updateScarfPattern() {
  applyScarfStyle();
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
      [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")
    );
  };

  scarfColorInput.value = randomColor();

  applyAll();
}

function saveSnowman() {

  // 원래 스타일 저장
  const originalWidth = scene.style.width;
  const originalHeight = scene.style.height;

  // 1) 정사각형 강제 적용
  scene.style.width = "500px";
  scene.style.height = "500px";

  html2canvas(scene).then(canvas => {
    // 2) 원래 크기로 복구
    scene.style.width = originalWidth;
    scene.style.height = originalHeight;

    const link = document.createElement("a");
    link.download = "my-snowman.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}


// === 전체 적용 ===
function applyAll() {
  updateHat();
  updateBackground();
  applyScarfStyle();
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
    flake.style.width = flake.style.height = 2 + Math.random() * 4 + "px";
    scene.appendChild(flake);
  }
}


// === 이벤트 등록 ===
hatSelect.addEventListener("change", updateHat);
scarfColorInput.addEventListener("input", updateScarfColor);
bgSelect.addEventListener("change", updateBackground);
randomBtn.addEventListener("click", randomizeSnowman);
saveBtn.addEventListener("click", saveSnowman);
scarfPattern.addEventListener("change", updateScarfPattern);


// === 초기 실행 ===
applyAll();
createSnowflakes();
