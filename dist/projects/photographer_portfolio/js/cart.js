const mainCartContent = document.querySelector('.main-cart-content');
// const cartSummaryBlock = document.querySelector('.cart-summary');
const currentCart = JSON.parse(localStorage.getItem('allCartItemsArr'));

// ---   ---   ---
// PRINT CONFIGURATION COSTS
// ---   ---   ---

const printConfigurationCosts = {
  size: {
    '4x6': 5,
    '5x7': 15,
    '8x12': 25,
    '12x18': 35,
    '16x24': 55,
    '20x30': 95
  },
  finish: {
    matte: 15,
    lustre: 15,
    glossy: 15
  }
};

const resetCartContent = () => {
  mainCartContent.innerHTML = ``;
  const cartSummaryBlock = document.createElement('div');
  cartSummaryBlock.classList.add('cart-summary');
  mainCartContent.insertAdjacentElement('afterbegin', cartSummaryBlock);
};

const populateCart = () => {
  const cartSummaryBlock = document.querySelector('.cart-summary');

  const shoppingCartLink = document.querySelector('.fa-shopping-cart');

  if (!currentCart == null) {
    shoppingCartLink.classList.add('active-cart');
  } else {
    shoppingCartLink.classList.remove('active-cart');
  }

  // ---   ---   ---
  // CHECK FOR CART ITEMS
  // ---   ---   ---
  if (!currentCart) {
    // ---   ---   ---
    // EMPTY CART MESSAGE
    // ---   ---   ---

    const emptyCartBlock = document.createElement('div');
    emptyCartBlock.classList.add('empty-cart');
    emptyCartBlock.innerHTML = `
    <p class="empty-cart__title">No Items in Cart</p>
    <p class="empty-cart__copy">
      Click on a photo in a gallery for a larger view of
      that photo and the option add it to your cart.
    </p>
    <a
      class="link link--accent link--large no-ml"
      href="./galleries_landing.html"
      >Photo Galleries</a
    >
    `;
    cartSummaryBlock.insertAdjacentElement('beforeend', emptyCartBlock);
  } else {
    // ---   ---   ---
    // CART POPULATOR
    // ---   ---   ---

    let cartIndex = 0;
    for (object of currentCart) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('item-summary');
      cartItem.id = `${currentCart[cartIndex].photo}`;
      cartItem.dataset.itemStorageIndex = `${cartIndex}`;
      const basePrintConfigurationCosts =
        printConfigurationCosts.size[`${currentCart[cartIndex].size}`] +
        printConfigurationCosts.finish[`${currentCart[cartIndex].finish}`];
      const totalPrintConfigurationCosts =
        basePrintConfigurationCosts * currentCart[cartIndex].quantity;
      cartItem.innerHTML = `
        <img
          class="item-summary__image"
          src="${currentCart[cartIndex].source}"
          alt=""
        />
        <table class="item-summary__description">
          <tr>
            <th class="item-summary__description__heading">Item</th>
            <td class="item-summary__description__cell item-name">
              ${currentCart[cartIndex].photo}
            </td>
          </tr>
          <tr>
            <th class="item-summary__description__heading">Size</th>
            <td class="item-summary__description__cell">${currentCart[cartIndex].size}</td>
          </tr>
          <tr>
            <th class="item-summary__description__heading">Print Finish</th>
            <td class="item-summary__description__cell">${currentCart[cartIndex].finish}</td>
          </tr>
          <tr>
            <th class="item-summary__description__heading">Quantity</th>
            <td class="item-summary__description__cell">${currentCart[cartIndex].quantity}</td>
          </tr>
        </table>
        <div class="item-summary__total">$${totalPrintConfigurationCosts}</div>
        <div class="item-summary__modifiers">
          <button class="button button--light button--slim edit-item-button">
            Edit
          </button>
          <button
            class="button button--warning button--slim remove-item-button">
              Remove
          </button>
        </div>
        `;
      cartSummaryBlock.insertAdjacentElement('beforeend', cartItem);

      cartIndex++;
    }

    const checkoutPrompt = document.createElement('aside');
    checkoutPrompt.classList.add('checkout-prompt');
    checkoutPrompt.innerHTML = `
      <p class="checkout-prompt__subtotal">
        Cart Subtotal (3 items):
        <span class="checkout-prompt__subtotal--cost">$</span>
      </p>
      <a href="./demo_end.html" class="button button--accent checkout-button">
        Checkout
      </a>
    `;

    mainCartContent.insertAdjacentElement('afterbegin', checkoutPrompt);

    const updateCartTotalCost = () => {
      let itemSummaryTotals = [
        ...document.querySelectorAll('.item-summary__total')
      ];
      let totalCartCost = 0;
      for (itemTotal of itemSummaryTotals) {
        totalCartCost += Number(itemTotal.innerText.slice(1));
      }
      const cartTotalCostSpan = document.querySelector(
        '.checkout-prompt__subtotal--cost'
      );
      cartTotalCostSpan.innerText = `$${totalCartCost}`;
    };

    updateCartTotalCost();

    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', function () {
      localStorage.removeItem('allCartItems');
      location.reload();
      let allCartItemsArr = [];
      localStorage.setItem('allCartItemsArr', JSON.stringify(allCartItemsArr));
    });

    // ---   ---   ---
    // CART EDITOR POPULATOR
    // ---   ---   ---

    const generateCartEditorFunctionality = targetButton => {
      targetButton.addEventListener('click', function () {
        const targetItemDiv = this.parentElement.parentElement;
        const targetItemStorageIndex = targetItemDiv.dataset.itemStorageIndex;
        const targetItemId = targetItemDiv.id;
        targetItemDiv.innerHTML = `
            <img
              class="item-summary__image"
              src="${currentCart[targetItemStorageIndex].source}"
              alt=""
            />
            <table class="item-summary__description">
              <tr>
                <th class="item-summary__description__heading">Item</th>
                <td class="item-summary__description__cell">
                ${currentCart[targetItemStorageIndex].photo}
                </td>
              </tr>
              <tr>
                <th class="item-summary__description__heading">Size</th>
                <td class="item-summary__description__cell">
                  <div class="item-editor__container">
                    <select class="item-editor__select" name="size" id="size">
                      <option value="4x6">4 x 6</option>
                      <option value="5x7">5 x 7</option>
                      <option value="8x12">8 x 12</option>
                      <option value="12x18">12 x 18</option>
                      <option value="16x24">16 x 24</option>
                      <option value="20x30">20 x 30</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="item-summary__description__heading">Print Finish</th>
                <td class="item-summary__description__cell">
                  <div class="item-editor__container">
                    <select
                      class="item-editor__select"
                      name="finish"
                      id="finish"
                    >
                      <option value="glossy">Glossy</option>
                      <option value="lustre">Lustre</option>
                      <option value="matte">Matte</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th class="item-summary__description__heading">Quantity</th>
                <td class="item-summary__description__cell">
                  <div class="item-editor__container">
                    <button class="item-editor__quantity__counter down-counter">
                      &#8212;
                    </button>
                    <input
                      class="item-editor__quantity"
                      type="number"
                      name="quantity-bird5"
                      min="1"
                      max="100"
                      step="1"
    
                    />
                    <button class="item-editor__quantity__counter up-counter">
                      &#43;
                    </button>
                  </div>
                </td>
              </tr>
            </table>
            <div class="item-summary__modifiers">
                <button class="button button--slim button--light update-item-button">
                  Update
                </button>
                <button
                class="button button--warning button--slim remove-item-button">
                  Remove
              </button>
            `;

        const newRemoveButton = document.querySelector(
          `#${targetItemId} .remove-item-button`
        );
        generateItemRemovalFunctionality(newRemoveButton);

        targetItemDiv.classList.add('item-editor');

        const targetSizeInput = document.querySelector(
          `#${targetItemId} #size`
        );
        targetSizeInput.value = `${currentCart[targetItemStorageIndex].size}`;
        const targetFinishInput = document.querySelector(
          `#${targetItemId} #finish`
        );
        targetFinishInput.value = `${currentCart[targetItemStorageIndex].finish}`;
        const targetQuantityInput = document.querySelector(
          `#${targetItemId} .item-editor__quantity`
        );
        targetQuantityInput.value = `${currentCart[targetItemStorageIndex].quantity}`;

        // ---   ---   ---
        // CART EDITOR --> QUANTITY ADJUSTMENT BUTTONS
        // ---   ---   ---

        const allDecrementers = [...document.querySelectorAll('.down-counter')];
        const allIncrementers = [...document.querySelectorAll('.up-counter')];
        for (decrementer of allDecrementers) {
          decrementer.addEventListener('click', function () {
            this.nextElementSibling.stepDown();
          });
        }
        for (incrementer of allIncrementers) {
          incrementer.addEventListener('click', function () {
            this.previousElementSibling.stepUp();
          });
        }

        const updateItemButton = document.querySelector(
          `#${targetItemId} .update-item-button`
        );
        updateItemButton.addEventListener('click', function () {
          const cartPhoto = {
            photo: `${currentCart[targetItemStorageIndex].photo}`,
            source: `${currentCart[targetItemStorageIndex].source}`,
            size: `${targetSizeInput.value}`,
            finish: `${targetFinishInput.value}`,
            quantity: `${targetQuantityInput.value}`
          };
          currentCart[targetItemStorageIndex] = cartPhoto;

          localStorage.setItem('allCartItemsArr', JSON.stringify(currentCart));

          // ---   ---   ---
          // CREATE UPDATED ITEM-SUMMARY DIV
          // ---   ---   ---
          const basePrintConfigurationCosts =
            printConfigurationCosts.size[
              `${currentCart[targetItemStorageIndex].size}`
            ] +
            printConfigurationCosts.finish[
              `${currentCart[targetItemStorageIndex].finish}`
            ];
          const totalPrintConfigurationCosts =
            basePrintConfigurationCosts *
            currentCart[targetItemStorageIndex].quantity;
          targetItemDiv.innerHTML = `
          <img
            class="item-summary__image"
            src="${currentCart[targetItemStorageIndex].source}"
            alt=""
          />
          <table class="item-summary__description">
            <tr>
              <th class="item-summary__description__heading">Item</th>
              <td class="item-summary__description__cell item-name">
                ${currentCart[targetItemStorageIndex].photo}
              </td>
            </tr>
            <tr>
              <th class="item-summary__description__heading">Size</th>
              <td class="item-summary__description__cell">${currentCart[targetItemStorageIndex].size}</td>
            </tr>
            <tr>
              <th class="item-summary__description__heading">Print Finish</th>
              <td class="item-summary__description__cell">${currentCart[targetItemStorageIndex].finish}</td>
            </tr>
            <tr>
              <th class="item-summary__description__heading">Quantity</th>
              <td class="item-summary__description__cell">${currentCart[targetItemStorageIndex].quantity}</td>
            </tr>
          </table>
          <div class="item-summary__total">$${totalPrintConfigurationCosts}</div>
          <div class="item-summary__modifiers">
              <button class="button button--slim button--light edit-item-button" >Edit</button>
              <button
              class="button button--warning button--slim remove-item-button">
                Remove
            </button>
          </div>
          `;

          targetItemDiv.classList.remove('item-editor');
          const newTargetButton = document.querySelector(
            `#${targetItemId} .edit-item-button`
          );

          generateCartEditorFunctionality(newTargetButton);
          updateCartTotalCost();

          const newRemoveButton = document.querySelector(
            `#${targetItemId} .remove-item-button`
          );
          generateItemRemovalFunctionality(newRemoveButton);
        });
      });
    };

    const editItemButtonsArr = [
      ...document.querySelectorAll('.edit-item-button')
    ];

    editItemButtonsArr.forEach(editButton =>
      generateCartEditorFunctionality(editButton)
    );

    const generateItemRemovalFunctionality = targetRemovalButton => {
      targetRemovalButton.addEventListener('click', function () {
        const targetItemDiv = this.parentElement.parentElement;

        const targetItemStorageIndex = targetItemDiv.dataset.itemStorageIndex;
        const targetItemId = targetItemDiv.id;

        currentCart.splice(targetItemStorageIndex, 1);
        localStorage.setItem('allCartItemsArr', JSON.stringify(currentCart));

        setTimeout(() => {
          targetItemDiv.innerHTML = `
          <p class="basic-hero-section__subheader basic-hero-section__subheader--light p-4">Item removed from cart</p>
          `;
        }, 100);
        setTimeout(() => {
          targetItemDiv.classList.add('exit-left');
        }, 2500);

        setTimeout(() => {
          targetItemDiv.remove();
        }, 3000);
        setTimeout(() => {
          resetCartContent();
          populateCart();
        }, 3100);
      });
    };

    const removeItemButtonsArr = [
      ...document.querySelectorAll('.remove-item-button')
    ];

    removeItemButtonsArr.forEach(removeButton =>
      generateItemRemovalFunctionality(removeButton)
    );
  }
};
populateCart();
