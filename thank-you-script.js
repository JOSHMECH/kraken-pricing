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

// Get plan from URL parameters and update message
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get("plan");
const thankYouMessage = document.getElementById("thank-you-message");
const selectedPlan = document.getElementById("selected-plan");

if (plan) {
  let message =
    "We're excited to have you on board. Our security team will contact you shortly to help you get started";
  let planName = "";

  switch (plan) {
    case "basic":
      message += " with your Essential Security plan.";
      planName = "Essential Security Plan";
      break;
    case "standard":
      message += " with your Advanced Security plan.";
      planName = "Advanced Security Plan";
      break;
    case "premium":
      message += " with your Enterprise Security plan.";
      planName = "Enterprise Security Plan";
      break;
    case "bwd-community":
      message =
        "Thank you for your interest in our BWD Community Discount. Our team will verify your membership and contact you shortly with your special pricing.";
      planName = "BWD Community Discount";
      break;
    default:
      message += ".";
      planName = "Selected Plan";
  }

  thankYouMessage.textContent = message;
  selectedPlan.textContent = planName;
}
