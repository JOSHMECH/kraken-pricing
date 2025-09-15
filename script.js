// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");

// Check for saved theme preference or respect OS preference
if (
  localStorage.getItem("theme") === "dark" ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme"))
) {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

// Tab functionality
const tabs = document.querySelectorAll(".tab");
const pricingCards = document.querySelectorAll(".pricing-card");

// Hide all pricing initially except monthly
document.querySelectorAll(".price").forEach((price) => {
  if (!price.classList.contains("monthly")) {
    price.style.display = "none";
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove("active"));

    // Add active class to clicked tab
    this.classList.add("active");

    // Get the tab type
    const tabType = this.getAttribute("data-tab");

    // Show/hide prices based on tab
    pricingCards.forEach((card) => {
      const monthlyPrice = card.querySelector(".price.monthly");
      const annualPrice = card.querySelector(".price.annual");
      const lifetimePrice = card.querySelector(".price.lifetime");

      monthlyPrice.style.display = "none";
      annualPrice.style.display = "none";
      lifetimePrice.style.display = "none";

      if (tabType === "monthly") {
        monthlyPrice.style.display = "block";
      } else if (tabType === "annual") {
        annualPrice.style.display = "block";
      } else if (tabType === "lifetime") {
        lifetimePrice.style.display = "block";
      }
    });
  });
});
