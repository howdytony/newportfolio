// shared.js - Handles loading header and footer across all pages

async function loadComponent(elementId, filepath) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filepath}: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

// Wait for DOM to be ready, then load header and footer
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "/header.html");
  loadComponent("footer-placeholder", "/footer.html");
});
