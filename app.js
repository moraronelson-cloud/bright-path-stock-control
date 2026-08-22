const itemsContainer = document.getElementById("items-container");

let itemCount = 0;

function createItemCard() {
  itemCount++;

  const card = document.createElement("div");
  card.className = "item-card";
  card.dataset.itemNumber = itemCount;

  card.innerHTML = `
    <h3>Item ${itemCount}</h3>

    <div class="field">
      <label>Item Name</label>
      <input
        type="text"
        class="item-name"
        placeholder="Enter item name"
      >
    </div>

    <div class="two-column">

      <div class="field">
        <label>Quantity</label>
        <input
          type="number"
          class="item-quantity"
          min="0"
          step="1"
          placeholder="0"
        >
      </div>

      <div class="field">
        <label>Unit</label>
        <input
          type="text"
          class="item-unit"
          placeholder="e.g. pieces, litres, kg"
        >
      </div>

    </div>

    <div class="field">
      <label>Site / Location</label>
      <input
        type="text"
        class="item-location"
        placeholder="Where is this stock kept?"
      >
    </div>

    <div class="field">
      <label>Notes</label>
      <textarea
        class="item-notes"
        rows="2"
        placeholder="Optional notes"
      ></textarea>
    </div>
  `;

  itemsContainer.appendChild(card);

  const nameInput = card.querySelector(".item-name");

  nameInput.addEventListener("input", () => {
    const cards = document.querySelectorAll(".item-card");
    const lastCard = cards[cards.length - 1];

    if (card === lastCard && nameInput.value.trim() !== "") {
      createItemCard();
    }
  });
}

createItemCard();

const stockSetupForm = document.getElementById("stock-setup-form");

let inventory = JSON.parse(localStorage.getItem("brightPathInventory")) || [];

stockSetupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cards = document.querySelectorAll(".item-card");
  const newInventory = [];

  cards.forEach((card) => {
    const name = card.querySelector(".item-name").value.trim();
    const quantityValue = card.querySelector(".item-quantity").value;
    const unit = card.querySelector(".item-unit").value.trim();
    const location = card.querySelector(".item-location").value.trim();
    const notes = card.querySelector(".item-notes").value.trim();

    if (!name) {
      return;
    }

    const quantity = Number(quantityValue);

    if (!Number.isFinite(quantity) || quantity < 0) {
      return;
    }

    newInventory.push({
      id: Date.now() + Math.random(),
      name: name,
      quantity: quantity,
      unit: unit,
      location: location,
      notes: notes,
      totalReceived: quantity,
      totalIssued: 0,
      createdAt: new Date().toISOString()
    });
  });

  if (newInventory.length === 0) {
    alert("Enter at least one stock item before saving.");
    return;
  }

  inventory = newInventory;

  localStorage.setItem(
    "brightPathInventory",
    JSON.stringify(inventory)
  );

  alert(`${inventory.length} stock item(s) saved successfully.`);
});
