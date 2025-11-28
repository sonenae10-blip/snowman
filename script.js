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

// === 패턴용 DataURL 생성 (dot / stripe 공통 사용) ===
function createPatternDataURL(type, color) {
  const size = 20; // 패턴 타일 크기
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // 1) 배경을 목도리 색으로 채우기
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);

  // 2) 패턴은 흰색으로
  ctx.fillStyle = "#ffffff";

  if (type === "dot") {
    // 가운데 동그라미
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "stripe") {
    // 왼쪽 세로 스트라이프
    const stripeWidth = size / 2;
    ctx.fillRect(0, 0, stripeWidth, size);
  }

  return canvas.toDataURL("image/png");
}

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
  if (pattern === "dot" || pattern === "stripe") {
    const dataURL = createPatternDataURL(pattern, color);

    allParts.forEach(el => {
      el.style.backgroundImage = `url(${dataURL})`;
      el.style.backgroundRepeat = "repeat";
      el.style.backgroundSize = "20px 20px";
    });
  }
  // pattern === "solid" 이면 위의 "색만" 적용된 상태 유지
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
      "linear-gradient(to top, #b3e5fc 0%, #b3e5fc 40%, #d3edfbff 100%)";
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
  // 0) scene 원래 크기 저장
  const originalWidth = scene.style.width;
  const originalHeight = scene.style.height;

  // 1) 캡처용 정사각형 강제 적용
  scene.style.width = "500px";
  scene.style.height = "500px";

  // 2) 캡처용 고정 눈 레이어 추가
  const captureLayer = addCaptureSnowLayer();

  // 3) html2canvas로 캡처
  html2canvas(scene).then(canvas => {
    // 4) 캡처 끝나면 레이어 제거
    if (captureLayer && captureLayer.parentNode) {
      captureLayer.parentNode.removeChild(captureLayer);
    }

    // 5) scene 크기 복구
    scene.style.width = originalWidth;
    scene.style.height = originalHeight;

    // 6) 이미지 다운로드
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

// === 캡처용 고정 눈 레이어 추가 ===
function addCaptureSnowLayer() {
  const layer = document.createElement("div");
  layer.className = "capture-snow-layer";
  layer.style.position = "absolute";
  layer.style.inset = "0";
  layer.style.pointerEvents = "none";
  layer.style.zIndex = "1"; // 눈사람(z-index:2)보다 아래, 배경/눈송이보단 위

  // 랜덤 점 여러 개 생성
  const count = 60;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.width = dot.style.height = (2 + Math.random() * 4) + "px";
    dot.style.borderRadius = "50%";
    dot.style.background = "rgba(255,255,255," + (0.6 + Math.random() * 0.4) + ")";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    layer.appendChild(dot);
  }

  scene.appendChild(layer);
  return layer;
}
