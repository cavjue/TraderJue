const recipes = [
  {
    id: 1,
    name: "Classic Mai Tai",
    category: "rum",
    tags: ["rum", "classic"],
    emoji: "🍹",
    description: "Originally created by Trader Vic in the 1940s, this is the epitome of tiki cocktails.",
    ingredients: [
      "1 oz light rum",
      "1 oz dark rum",
      "1 oz fresh lime juice",
      "3/4 oz orange curaçao",
      "1/2 oz orgeat syrup",
      "1/4 oz simple syrup",
      "Crushed ice"
    ],
    instructions: [
      "Add all ingredients to a shaker with ice.",
      "Shake until chilled.",
      "Pour into a rocks glass over crushed ice.",
      "Garnish with a mint sprig and lime shell.",
      "Float with 1/4 oz - 1/2 oz dark rum."
    ],
    garnish: "Mint sprig and lime shell",
    source: "https://tradervicsrum.com/recipes/"
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
  },
  {
    id: 6,
    name: "Zombie",
    category: "rum",
    tags: ["rum", "tiki", "strong"],
    emoji: "☠️",
    description: "A legendary and potent tiki cocktail with three rums, falernum, and Don's Mix.",
    ingredients: [
      "1.5 oz Jamaican dark rum",
      "1.5 oz Puerto Rican gold rum",
      "1 oz Demerara rum",
      "¾ oz fresh lime juice",
      "½ oz falernum",
      "½ oz Don's Mix (2 parts fresh grapefruit juice and 1 part cinnamon syrup)",
      "1 tsp grenadine syrup",
      "1 dash Angostura bitters",
      "6 drops Pernod"
    ],
    instructions: [
      "Add all ingredients to a shaker with ice.",
      "Shake vigorously until well chilled.",
      "Strain into a tall glass over crushed ice.",
      "Stir gently and garnish."
    ],
    garnish: "Pineapple wedge and cherry"
  },

  {
    id: 7,
    name: "Zombie",
    category: "rum",
    tags: ["rum", "tiki", "strong"],
    emoji: "☠️",
    description: "A legendary and potent tiki cocktail with three rums, falernum, and Don's Mix.",
    ingredients: [
      "1.5 oz Jamaican dark rum",
      "1.5 oz Puerto Rican gold rum",
      "1 oz Demerara rum",
      "¾ oz fresh lime juice",
      "½ oz falernum",
      "½ oz Don's Mix (2 parts fresh grapefruit juice and 1 part cinnamon syrup)",
      "1 tsp grenadine syrup",
      "1 dash Angostura bitters",
      "6 drops Pernod"
    ],
    instructions: [
      "Add all ingredients to a shaker with ice.",
      "Shake vigorously until well chilled.",
      "Strain into a tall glass over crushed ice.",
      "Stir gently and garnish."
    ],
    garnish: "Pineapple wedge and cherry"
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
const modalSource = document.getElementById("modalSource");
const sourceBlock = document.querySelector(".source");

let activeFilter = "all";

// The recipe grid and modal only exist on some pages; skip that setup when
// they're missing so the script doesn't error on pages without them.
const hasRecipeGrid = recipeGrid && searchInput && noResults && modal;

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

  const hasSource = typeof recipe.source === "string" && recipe.source.trim() !== "";

  if (sourceBlock) {
    sourceBlock.hidden = !hasSource;
  }

  if (hasSource) {
    modalSource.href = recipe.source;
    try {
      const sourceUrl = new URL(recipe.source);
      modalSource.textContent = sourceUrl.hostname.replace(/^www\./, "");
    } catch {
      modalSource.textContent = recipe.source;
    }
  } else {
    modalSource.removeAttribute("href");
    modalSource.textContent = "";
  }

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

if (hasRecipeGrid) {
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
}

if (hasRecipeGrid) {
  renderRecipes();
}
