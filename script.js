const recipes = [
  {
    id: 1,
    name: "Classic Mai Tai",
    category: "rum",
    tags: ["rum", "classic"],
    emoji: "🍹",
    description: "A balanced rum cocktail with lime, orange, and almond notes.",
    ingredients: [
      "1 oz light rum",
      "1 oz dark rum",
      "¾ oz fresh lime juice",
      "½ oz orange curaçao",
      "½ oz orgeat syrup",
      "¼ oz rich simple syrup",
      "Crushed ice"
    ],
    instructions: [
      "Add all ingredients to a shaker with ice.",
      "Shake until chilled.",
      "Pour into a rocks glass over crushed ice.",
      "Garnish with a mint sprig and lime shell."
    ],
    garnish: "Mint sprig and lime shell"
  },
  {
    id: 2,
    name: "Pineapple Cooler",
    category: "rum",
    tags: ["rum", "refreshing"],
    emoji: "🍍",
    description: "A bright, juicy blend of pineapple, citrus, and tropical rum.",
    ingredients: [
      "1½ oz white rum",
      "2 oz pineapple juice",
      "¾ oz lime juice",
      "½ oz simple syrup",
      "Club soda",
      "Ice"
    ],
    instructions: [
      "Shake rum, pineapple juice, lime, and syrup with ice.",
      "Strain into a tall glass over fresh ice.",
      "Top with a splash of club soda.",
      "Stir gently and serve."
    ],
    garnish: "Pineapple wedge and lime wheel"
  },
  {
    id: 3,
    name: "Pinky Gonzalez",
    category: "tequila",
    tags: ["tequila"],
    emoji: "🥭",
    description: "Tequila take on the Mai Tai",
    ingredients: [
      "1 oz blanco tequila",
      "1 oz reposado tequila",
      "¾ oz fresh lime juice",
      "½ oz orgeat syrup",
      "½ oz orange curacao",
      "1/4 oz agave nectar",
      "Ice"
    ],
    instructions: [
      "Add all ingredients to a shaker.",
      "Fill with ice and shake until chilled.",
      "Strain over fresh ice.",
      "Finish with a small splash of sparkling water if desired."
    ],
    garnish: "Mint sprig and a spent half lime shell"
  },
  {
    id: 4,
    name: "Guava Spritz",
    category: "vodka",
    tags: ["vodka", "fresh"],
    emoji: "🌺",
    description: "Floral guava and citrus keep this drink crisp and easy to love.",
    ingredients: [
      "1½ oz vodka",
      "2 oz guava juice",
      "¾ oz fresh lime juice",
      "½ oz simple syrup",
      "4 fresh mint leaves",
      "Club soda",
      "Ice"
    ],
    instructions: [
      "Gently muddle mint and simple syrup in a glass.",
      "Add vodka, guava juice, and lime juice.",
      "Fill with ice and top with club soda.",
      "Stir gently and garnish."
    ],
    garnish: "Fresh mint and edible flower"
  },
    {
    id: 5,
    name: "Singapore Sling",
    category: "gin",
    tags: ["gin", "sweet"],
    emoji: "🌺",
    description: "",
    ingredients: [
      "1 1/2 oz gin",
      "1/2 oz cherry liquer",
      "1/4 oz cointreau",
      "1/4 oz benedictine",
      "2 oz pineapple juice",
      "1/2 oz lime juice",
      "1 dash angostura bitters",
      "2 oz club soda",
      "Ice"
    ],
    instructions: [
      "Add the gin, cherry liqueur, Cointreau, Bénédictine, pineapple juice, lime juice, and bitters in a shaker.",
      "Shake well until cold.",
      "Strain into tall glass (highball or Collins).",
      "Fill with ice and top with club soda.",
      "Stir gently and garnish."
    ],
    garnish: "Orange slice and a cherry"
  }
];

const recipeGrid = document.getElementById("recipeGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

const modal = document.getElementById("recipeModal");
const modalEmoji = document.getElementById("modalEmoji");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const modalGarnish = document.getElementById("modalGarnish");

let activeFilter = "all";

function renderRecipes() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFilter =
      activeFilter === "all" ||
      recipe.category === activeFilter ||
      recipe.tags.includes(activeFilter);

    const searchableText = [
      recipe.name,
      recipe.category,
      recipe.description,
      ...recipe.tags,
      ...recipe.ingredients
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  recipeGrid.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="recipe-image" aria-hidden="true">${recipe.emoji}</div>
      <div class="recipe-info">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <span class="recipe-tag">${capitalize(recipe.category)}</span>
      </div>
    `;

    card.addEventListener("click", () => openRecipe(recipe));
    recipeGrid.appendChild(card);
  });

  noResults.hidden = filteredRecipes.length !== 0;
}

function openRecipe(recipe) {
  modalEmoji.textContent = recipe.emoji;
  modalCategory.textContent = recipe.category;
  modalTitle.textContent = recipe.name;
  modalDescription.textContent = recipe.description;
  modalGarnish.textContent = recipe.garnish;

  modalIngredients.innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");

  modalInstructions.innerHTML = recipe.instructions
    .map((instruction) => `<li>${instruction}</li>`)
    .join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderRecipes();
  });
});

searchInput.addEventListener("input", renderRecipes);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Cookie Banner Logic
function initializeCookieBanner() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;

  const acceptedKey = "traderjue-cookie-consent";
  const consent = localStorage.getItem(acceptedKey);

  // Hide banner if already accepted or declined
  if (consent === "accepted" || consent === "declined") {
    banner.classList.add("hidden");
  }

  // Accept button
  const acceptBtn = document.getElementById("acceptCookies");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem(acceptedKey, "accepted");
      banner.classList.add("hidden");
    });
  }

  // Decline button
  const declineBtn = document.getElementById("declineCookies");
  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      localStorage.setItem(acceptedKey, "declined");
      banner.classList.add("hidden");
    });
  }
}

renderRecipes();
initializeCookieBanner();
