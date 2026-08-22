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
