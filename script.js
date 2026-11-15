const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const canvas = document.querySelector("#candle-chart");
const context = canvas.getContext("2d");
const candleData = [
  [42, 57, 35, 63], [57, 49, 44, 66], [49, 65, 43, 72], [65, 58, 51, 70],
  [58, 72, 53, 78], [72, 64, 58, 80], [64, 79, 59, 85], [79, 71, 66, 89],
  [71, 84, 66, 91], [84, 76, 70, 96], [76, 89, 71, 99], [89, 82, 76, 103],
  [82, 94, 77, 108], [94, 86, 80, 111], [86, 99, 81, 113], [99, 90, 85, 116],
  [90, 103, 84, 119], [103, 95, 90, 123], [95, 108, 89, 124], [108, 100, 95, 128],
  [100, 113, 95, 130], [113, 105, 100, 135], [105, 119, 99, 138], [119, 110, 105, 142],
];

function drawCandles() {
  const bounds = canvas.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.round(bounds.width * pixelRatio);
  canvas.height = Math.round(bounds.height * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const width = bounds.width;
  const height = bounds.height;
  const topPadding = 12;
  const bottomPadding = 16;
  const chartHeight = height - topPadding - bottomPadding;
  const min = 30;
  const max = 145;
  const slot = width / candleData.length;
  const bodyWidth = Math.max(4, Math.min(9, slot * 0.45));

  candleData.forEach(([open, close, low, high], index) => {
    const x = slot * index + slot / 2;
    const y = (value) => topPadding + ((max - value) / (max - min)) * chartHeight;
    const isUp = close >= open;

    context.strokeStyle = isUp ? "rgba(100, 184, 135, .9)" : "rgba(213, 111, 104, .88)";
    context.fillStyle = isUp ? "rgba(100, 184, 135, .82)" : "rgba(213, 111, 104, .82)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(x, y(high));
    context.lineTo(x, y(low));
    context.stroke();
    const bodyTop = Math.min(y(open), y(close));
    const bodyHeight = Math.max(2, Math.abs(y(open) - y(close)));
    context.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
  });
}

const resizeObserver = new ResizeObserver(drawCandles);
resizeObserver.observe(canvas);
drawCandles();
