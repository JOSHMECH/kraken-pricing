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

// Get Started button functionality - redirect to thank you page
const getStartedButtons = document.querySelectorAll(".btn, .special-btn");

getStartedButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let plan = "";

    // Determine which plan was selected
    if (this.classList.contains("special-btn")) {
      plan = "bwd-community";
    } else {
      const card = this.closest(".pricing-card");
      if (card) {
        const planName = card.querySelector(".plan-name").textContent;
        if (planName.includes("Essential")) plan = "basic";
        else if (planName.includes("Advanced")) plan = "standard";
        else if (planName.includes("Enterprise")) plan = "premium";
      }
    }

    // Redirect to thank you page with plan as query parameter
    window.location.href = `thank-you.html?plan=${plan}`;
  });
});
