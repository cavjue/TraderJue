const recipes = [
   {
    id: 1,
    name: "Classic Mai Tai",
    category: "rum",
    tags: ["rum"],
    emoji: "🍹",
    description: "A tropical classic balancing aged rum, citrus, almond, and orange.",
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
      "Add all ingredients (including lime shells) to a shaker with ice.",
      "Shake to combine and chill.",
      "Pour unstrained into a rocks glass.",
      "Fill with crushed ice."
    ],
    garnish: "Mint sprig and lime shell"
  },
  
  {
    id: 2,
    name: "TBD",
    category: "rum",
    tags: ["rum", "refreshing"],
    emoji: "🍍",
    description: "A bright, juicy pineapple cocktail with lime and coconut.",
    ingredients: [
      "2 oz white rum",
      "2 oz pineapple juice",
      "1 oz coconut cream",
      "¾ oz fresh lime juice",
      "½ oz simple syrup",
      "Ice"
    ],
    instructions: [
      "Add all ingredients to a cocktail shaker with ice.",
      "Shake vigorously for 10–15 seconds.",
      "Strain into a chilled glass filled with fresh ice.",
      "Garnish with a pineapple wedge."
    ],
    garnish: "Pineapple wedge and lime wheel"
  },

  {
    id: 3,
    name: "TBD",
    category: "tequila",
    tags: ["tequila", "refreshing"],
    emoji: "🥭",
    description: "Sweet mango meets tart lime and tequila in this sunset-colored sipper.",
    ingredients: [
      "2 oz blanco tequila",
      "2 oz mango nectar",
      "¾ oz fresh lime juice",
      "½ oz agave syrup",
      "2 dashes orange bitters",
      "Ice"
    ],
    instructions: [
      "Add tequila, mango nectar, lime juice, agave, and bitters to a shaker.",
      "Fill with ice and shake until chilled.",
      "Strain over fresh ice.",
      "Add a small splash of sparkling water if desired."
    ],
    garnish: "Mango slice and chili-salt rim"
  },

  {
    id: 4,
    name: "TBD",
    category: "vodka",
    tags: ["vodka", "refreshing"],
    emoji: "🌺",
    description: "Floral guava, citrus, and mint make this an easy warm-weather favorite.",
    ingredients: [
      "1½ oz vodka",
      "2 oz guava juice",
      "¾ oz fresh lime juice",
      "½ oz simple syrup",
      "4–5 fresh mint leaves",
      "Club soda",
      "Ice"
    ],
    instructions: [
      "Gently muddle mint and simple syrup in a glass.",
      "Add vodka, guava juice, and lime juice.",
      "Fill the glass with ice.",
      "Top with club soda and stir gently."
    ],
    garnish: "Fresh mint and edible flower"
  },

  {
    id: 5,
    name: "TBD",
    category: "rum",
    tags: ["rum", "refreshing"],
    emoji: "🥥",
    description: "Tangy passion fruit and orange combine with rum for a party-ready punch.",
    ingredients: [
      "2 oz dark rum",
      "1½ oz passion fruit juice",
      "1 oz orange juice",
      "½ oz lime juice",
      "½ oz grenadine",
      "Ice"
    ],
    instructions: [
      "Add rum, passion fruit juice, orange juice, and lime juice to a shaker.",
      "Shake with ice until chilled.",
      "Pour into a tall glass filled with ice.",
      "Slowly add grenadine for a layered effect."
    ],
    garnish: "Passion fruit half and orange wheel"
  },

  {
    id: 6,
    name: "TBD",
    category: "vodka",
    tags: ["vodka", "refreshing"],
    emoji: "🥥",
    description: "Creamy coconut, bright lime, and vodka create an effortless beach drink.",
    ingredients: [
      "1½ oz vodka",
      "2 oz coconut water",
      "1 oz pineapple juice",
      "½ oz lime juice",
      "¼ oz simple syrup",
      "Ice"
    ],
    instructions: [
      "Add vodka, coconut water, pineapple juice, lime juice, and syrup to a shaker.",
      "Shake with ice.",
      "Strain into a tall glass over fresh ice.",
      "Top with a little coconut water."
    ],
    garnish: "Lime wheel and toasted coconut"
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
      ...recipe.tags
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
      <div class="recipe-image">
        <span aria-hidden="true">${recipe.emoji}</span>
      </div>

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

// Filtering
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

// Search
searchInput.addEventListener("input", renderRecipes);

// Close modal
document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

// Escape key closes modal
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Initial render
renderRecipes();
