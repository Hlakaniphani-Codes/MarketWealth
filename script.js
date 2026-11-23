// Mobile menu
const menuBtn = document.getElementById("menuBtn") || document.querySelector(".menu-btn");
const mobileNav = document.getElementById("mobileNav") || document.querySelector(".mobile-nav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    menuBtn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    mobileNav.classList.toggle("hidden", open);
    mobileNav.classList.toggle("is-open", !open);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      mobileNav.classList.add("hidden");
      mobileNav.classList.remove("is-open");
    });
  });
}

// Current year
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll(".portrait-video").forEach((video) => {
  video.addEventListener("error", () => {
    const fallback = video.parentElement.querySelector(".portrait-video-fallback");
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = "This browser could not play the video. ";
      const link = document.createElement("a");
      link.href = video.querySelector("source").src;
      link.textContent = "Open or download it here.";
      fallback.append(link);
    }
  });
});

// Copy to clipboard
const copyStatus = document.querySelector(".copy-status");
document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    const label = btn.dataset.label;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        if (!ok) throw new Error("Copy blocked");
      }
      if (copyStatus) {
        copyStatus.textContent = `Copied ${label}.`;
        copyStatus.removeAttribute("data-error");
      }
    } catch {
      if (copyStatus) {
        copyStatus.textContent = `Couldn't copy — please select and copy manually.`;
        copyStatus.dataset.error = "true";
      }
    }
  });
});