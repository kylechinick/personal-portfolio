// const body = document.querySelector('body');
const filterButton = document.querySelector('.filter-button');
const filterButtonInputs = [
  ...document.querySelectorAll('.filter-section__button__input')
];
const photoGalleryContainer = document.querySelector('.gallery-collection');
let photoGallery;
let allKeywords = [];
let uniqueKeywords = [];
let activeFiltersArr = [];
let activePhotosArr = [];
let currentThumbnailsArr = [];

const pathNameCleaner = path => {
  const spaceCharCode = /%20/gi;
  return path
    .replace(spaceCharCode, '_')
    .replace(' ', '_')
    .split('\\')
    .pop()
    .split('/')
    .pop()
    .split('.')
    .slice(0, -1);
};

const updateActivePhotosArr = () => {
  photoGallery = [...document.querySelectorAll('.gallery-collection > img')];
  if (!activeFiltersArr.length) {
    activePhotosArr = photoGallery;
  } else {
    activePhotosArr = [];
    for (photo of photoGallery) {
      if (![...photo.classList].includes('hidden')) {
        activePhotosArr.push(photo);
      }
    }
  }
  activePhotosArr.forEach(
    (activeArrPhoto, index) =>
      (activeArrPhoto.dataset.galleryIndex = `${index}`)
  );
};

const refreshCurrentThumbnailsArr = () => {
  currentThumbnailsArr = [];
  [
    ...document.querySelectorAll('.lightbox__nav__thumbnail-strip__thumbnail')
  ].forEach(item => currentThumbnailsArr.push(item));
};

const updateFeaturedImage = () => {
  const featuredImage = document.querySelector('.lightbox__featured-image');

  for (currentThumbnail of currentThumbnailsArr) {
    currentThumbnail.addEventListener('click', function () {
      featuredImage.src = this.src;
      const activeStateThumbnail = document.querySelector(
        '.lightbox__nav__thumbnail-strip__thumbnail--active'
      );
      if (activeStateThumbnail) {
        activeStateThumbnail.classList.remove(
          'lightbox__nav__thumbnail-strip__thumbnail--active'
        );
      }
      this.classList.add('lightbox__nav__thumbnail-strip__thumbnail--active');
    });
  }
};

const openInLightbox = photo => {
  const clickedPhotoIndex = Number(`${photo.dataset.galleryIndex}`);
  const lightboxContainer = document.createElement('div');
  lightboxContainer.classList.add('lightbox-container');
  lightboxContainer.innerHTML = `<div class="gallery-overlay"></div>
  <div class="lightbox">
    <div class="lightbox__frame">
      <div class="close-button">
        <p class="close-button__content">X</p>
      </div>
      <img
        class="lightbox__featured-image"
        src="${activePhotosArr[clickedPhotoIndex].src}"
        alt=""
      />
      <div class="lightbox__nav">
        <i
          class="fas fa-chevron-left lightbox__nav__arrow"
        ></i>
        <button class="button button--light a2c">Add to Cart</button>
        <div class="lightbox__nav__thumbnail-strip"></div>
        <i
          class="fas fa-chevron-right lightbox__nav__arrow"
        ></i>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentElement('afterbegin', lightboxContainer);

  const galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.addEventListener('click', function () {
    lightboxContainer.remove();
  });
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', function () {
    lightboxContainer.remove();
  });
  document.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
      lightboxContainer.remove();
    } else {
      return;
    }
  });

  let thumbnailOffset = 0;
  let totalThumbnailsPlaced = 0;
  let thumbnailIndex = clickedPhotoIndex + thumbnailOffset;
  const thumbnailStrip = document.querySelector(
    '.lightbox__nav__thumbnail-strip'
  );

  for (activeArrPhoto of activePhotosArr) {
    if (
      activeArrPhoto.dataset.galleryIndex >= clickedPhotoIndex &&
      activeArrPhoto.dataset.galleryIndex < activePhotosArr.length &&
      totalThumbnailsPlaced < 4
    ) {
      const thumbnailImage = document.createElement('img');
      thumbnailImage.classList.add('lightbox__nav__thumbnail-strip__thumbnail');
      if (totalThumbnailsPlaced == 0) {
        thumbnailImage.classList.add(
          'lightbox__nav__thumbnail-strip__thumbnail--active'
        );
      }
      thumbnailImage.src = activePhotosArr[thumbnailIndex].src;
      thumbnailImage.dataset.galleryIndex =
        activePhotosArr[thumbnailIndex].dataset.galleryIndex;
      thumbnailStrip.insertAdjacentElement('beforeend', thumbnailImage);
      thumbnailIndex += 1;
      totalThumbnailsPlaced += 1;
    }
  }

  refreshCurrentThumbnailsArr();

  const leftArrow = document.querySelector('.fa-chevron-left');
  const rightArrow = document.querySelector('.fa-chevron-right');

  const updateArrowStates = () => {
    const firstThumbnail = document.querySelector(
      '.lightbox__nav__thumbnail-strip__thumbnail'
    );
    const firstThumbnailGalleryIndex = Number(
      firstThumbnail.dataset.galleryIndex
    );
    const lastThumbnail = currentThumbnailsArr[currentThumbnailsArr.length - 1];
    const lastThumbnailGalleryIndex = Number(
      lastThumbnail.dataset.galleryIndex
    );
    if (firstThumbnailGalleryIndex >= 1) {
      leftArrow.classList.add('lightbox__nav__arrow--enabled');
    } else {
      leftArrow.classList.remove('lightbox__nav__arrow--enabled');
    }
    if (lastThumbnailGalleryIndex < activePhotosArr.length - 1) {
      rightArrow.classList.add('lightbox__nav__arrow--enabled');
    } else {
      rightArrow.classList.remove('lightbox__nav__arrow--enabled');
    }
    refreshCurrentThumbnailsArr();
  };

  updateArrowStates();

  updateFeaturedImage();

  leftArrow.addEventListener('click', function () {
    refreshCurrentThumbnailsArr();

    const firstThumbnail = document.querySelector(
      '.lightbox__nav__thumbnail-strip__thumbnail'
    );
    const firstThumbnailGalleryIndex = Number(
      firstThumbnail.dataset.galleryIndex
    );

    const decrementThumbnails = decValue => {
      const featuredImage = document.querySelector('.lightbox__featured-image');
      const thumbnailStrip = document.querySelector(
        '.lightbox__nav__thumbnail-strip'
      );

      const createThumbnails = quantity => {
        for (let i = 0; i < quantity; i++) {
          const thumbnailImage = document.createElement('img');
          thumbnailImage.classList.add(
            'lightbox__nav__thumbnail-strip__thumbnail'
          );
          thumbnailStrip.insertAdjacentElement('beforeend', thumbnailImage);

          const previousThumbnailGalleryIndex =
            thumbnailImage.previousSibling.dataset.galleryIndex;

          thumbnailImage.dataset.galleryIndex =
            Number(previousThumbnailGalleryIndex) + 1;
        }
        refreshCurrentThumbnailsArr();
        updateFeaturedImage();
      };

      if (activePhotosArr.length > 4) {
        if (4 - currentThumbnailsArr.length > 0) {
          createThumbnails(4 - currentThumbnailsArr.length);
        }
      } else {
        createThumbnails(activePhotosArr.length - currentThumbnailsArr.length);
      }

      for (currentThumbnail of currentThumbnailsArr) {
        const currentThumbnailIndex = Number(
          currentThumbnail.dataset.galleryIndex
        );
        currentThumbnail.src =
          activePhotosArr[currentThumbnailIndex - decValue].src;

        currentThumbnail.dataset.galleryIndex =
          currentThumbnailIndex - decValue;

        if (currentThumbnail.src == featuredImage.src) {
          currentThumbnail.classList.add(
            'lightbox__nav__thumbnail-strip__thumbnail--active'
          );
        } else {
          if (
            [...currentThumbnail.classList].includes(
              'lightbox__nav__thumbnail-strip__thumbnail--active'
            )
          ) {
            currentThumbnail.classList.remove(
              'lightbox__nav__thumbnail-strip__thumbnail--active'
            );
          }
        }
      }
      refreshCurrentThumbnailsArr();
    };

    switch (true) {
      case firstThumbnailGalleryIndex == 1:
        decrementThumbnails(1);
        break;
      case firstThumbnailGalleryIndex == 2:
        decrementThumbnails(2);
        break;
      case firstThumbnailGalleryIndex == 3:
        decrementThumbnails(3);
        break;
      case firstThumbnailGalleryIndex >= 4:
        decrementThumbnails(4);
        break;
      default:
        break;
    }

    updateArrowStates();
  });

  rightArrow.addEventListener('click', function () {
    refreshCurrentThumbnailsArr();

    const firstThumbnail = document.querySelector(
      '.lightbox__nav__thumbnail-strip__thumbnail'
    );
    const firstThumbnailGalleryIndex = Number(
      firstThumbnail.dataset.galleryIndex
    );

    const incrementThumbnails = incValue => {
      const featuredImage = document.querySelector('.lightbox__featured-image');

      for (currentThumbnail of currentThumbnailsArr) {
        const currentThumbnailIndex = Number(
          currentThumbnail.dataset.galleryIndex
        );
        if (currentThumbnailIndex + incValue >= activePhotosArr.length) {
          currentThumbnail.remove();
        } else {
          currentThumbnail.src =
            activePhotosArr[currentThumbnailIndex + incValue].src;
          currentThumbnail.dataset.galleryIndex =
            currentThumbnailIndex + incValue;
          if (currentThumbnail.src == featuredImage.src) {
            currentThumbnail.classList.add(
              'lightbox__nav__thumbnail-strip__thumbnail--active'
            );
          } else {
            if (
              [...currentThumbnail.classList].includes(
                'lightbox__nav__thumbnail-strip__thumbnail--active'
              )
            ) {
              currentThumbnail.classList.remove(
                'lightbox__nav__thumbnail-strip__thumbnail--active'
              );
            }
          }
        }
      }
      refreshCurrentThumbnailsArr();
    };

    if (firstThumbnailGalleryIndex + 4 > activePhotosArr.length - 1) {
      return;
    } else {
      incrementThumbnails(4);
    }

    updateArrowStates();
  });

  const addToCartButton = document.querySelector('.a2c');

  addToCartButton.addEventListener('click', function () {
    const lightboxFrame = document.querySelector('.lightbox__frame');
    const lightboxNav = document.querySelector('.lightbox__nav');

    const addToCartContainer = document.createElement('div');
    addToCartContainer.classList.add('lightbox__purchase-options-containter');
    addToCartContainer.innerHTML = `
    <h3 class="lightbox__purchase-options-containter__title">
              Purchase Options
            </h3>

            <form
              class="lightbox__purchase-options-containter__form"
              action=""
              method="post"
            >
              <div
                class="lightbox__purchase-options-containter__form__content current-purchase-options-screen"
                id="add-to-cart__options--print-size"
              >
                <h4
                  class="lightbox__purchase-options-containter__form__content__subtitle"
                >
                  Select a Print Size
                </h4>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="4x6"
                >
                  4x6
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$5.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="4x6"
                    id="4x6"
                    data-price="5"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="5x7"
                >
                  5x7
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$15.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="5x7"
                    id="5x7"
                    data-price="15"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="8x12"
                >
                  8x12
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$25.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="8x12"
                    id="8x12"
                    data-price="25"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="12x18"
                >
                  12x18
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$35.00</span
                  >
                  <input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="12x18"
                    id="12x18"
                    data-price="35"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="16x24"
                >
                  16x24
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$55.00</span
                  >
                  <input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="16x24"
                    id="16x24"
                    data-price="55"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="20x30"
                >
                  20x30
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$95.00</span
                  >
                  <input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="size"
                    value="20x30"
                    id="20x30"
                    data-price="95"
                  />
                </label>
              </div>

              <div
                class="lightbox__purchase-options-containter__form__content hidden"
                id="add-to-cart__options--print-finish"
              >
                <h4
                  class="lightbox__purchase-options-containter__form__content__subtitle"
                >
                  Select a Print Finish
                </h4>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="matte"
                >
                  Matte
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$15.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="finish"
                    value="matte"
                    id="matte"
                    data-price="15"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="lustre"
                >
                  Lustre
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$15.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="finish"
                    value="lustre"
                    id="lustre"
                    data-price="15"
                  />
                </label>
                <label
                  class="lightbox__purchase-options-containter__form__content__row"
                  for="glossy"
                >
                  Glossy
                  <span
                    class="lightbox__purchase-options-containter__form__content__extra-info"
                    >$15.00</span
                  ><input
                    class="lightbox__purchase-options-containter__form__content__radio"
                    type="radio"
                    name="finish"
                    value="glossy"
                    id="glossy"
                    data-price="15"
                  />
                </label>
              </div>

              <div
                class="lightbox__purchase-options-containter__form__content hidden"
                id="add-to-cart__options--print-confirmations"
              ></div>

              <div
                class="lightbox__purchase-options-containter__form__content hidden"
                id="add-to-cart__options--success"
              >
                <h3
                  class="lightbox__purchase-options-containter__form__content__title"
                >
                  Photo Added to Cart!
                </h3>
                <i
                  class="fas fa-shopping-cart main-nav__icon main-nav__icon--light"
                ></i>
                <a href="./cart.html" class="button button--dark">Go to Cart</a>
                <p class="add-to-cart-success-window-closer lightbox__purchase-options-containter__form__content__navigation__exit-link lightbox__purchase-options-containter__form__content__navigation__exit-link--strong">Return to Photo Viewer></p>
              </div>

              <div
                class="lightbox__purchase-options-containter__form__content__navigation"
              >
                <p
                  class="lightbox__purchase-options-containter__form__content__navigation__screen-link lightbox__purchase-options-containter__form__content__navigation__screen-link--disabled"
                  id="lightbox__screen-link__prev"
                >
                  < Prev
                </p>
                <p
                  class="lightbox__purchase-options-containter__form__content__navigation__screen-link lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen"
                  id="add-to-cart-screen-1"
                >
                  1
                </p>
                <p
                  class="lightbox__purchase-options-containter__form__content__navigation__screen-link"
                  id="add-to-cart-screen-2"
                >
                  2
                </p>
                <p
                  class="lightbox__purchase-options-containter__form__content__navigation__screen-link"
                  id="add-to-cart-screen-3"
                >
                  3
                </p>
                <p
                  class="lightbox__purchase-options-containter__form__content__navigation__screen-link"
                  id="lightbox__screen-link__next"
                >
                  Next >
                </p>
              </div>
            </form>
            <p class="lightbox__purchase-options-containter__form__content__navigation__exit-link">Cancel and Close Purchase Window</p>`;
    const lightboxNavOverlay = document.createElement('div');
    lightboxNavOverlay.classList.add('disabled-block');
    lightboxNav.appendChild(lightboxNavOverlay);
    lightboxFrame.appendChild(addToCartContainer);

    let currentAddToCartScreenNumber = 1;
    let currentAddToCartScreen;

    const refreshCurrentAddToCartScreen = () => {
      currentAddToCartScreen = document.querySelector(
        '.current-purchase-options-screen'
      );
    };

    const reassignCurrentAddToCartScreen = () => {
      currentAddToCartScreen.classList.remove(
        'current-purchase-options-screen'
      );
      switch (currentAddToCartScreenNumber) {
        case 1:
          addToCartSizeScreen.classList.add('current-purchase-options-screen');
          break;
        case 2:
          addToCartFinishScreen.classList.add(
            'current-purchase-options-screen'
          );
          break;
        case 3:
          addToCartConfirmationScreen.classList.add(
            'current-purchase-options-screen'
          );
          break;
        case 4:
          addToCartSuccessScreen.classList.add(
            'current-purchase-options-screen'
          );
          break;

        default:
          break;
      }
    };

    const displayCurrentAddToCartScreen = () => {
      currentAddToCartScreen.classList.remove('hidden');
    };

    const AddtoCartScreenLinkOne = document.querySelector(
      '#add-to-cart-screen-1'
    );
    const addToCartSizeScreen = document.querySelector(
      '#add-to-cart__options--print-size'
    );

    const AddtoCartScreenLinkTwo = document.querySelector(
      '#add-to-cart-screen-2'
    );
    const addToCartFinishScreen = document.querySelector(
      '#add-to-cart__options--print-finish'
    );

    const AddtoCartScreenLinkThree = document.querySelector(
      '#add-to-cart-screen-3'
    );
    const addToCartConfirmationScreen = document.querySelector(
      '#add-to-cart__options--print-confirmations'
    );

    const AddtoCartScreenLinkFour = document.querySelector(
      '#add-to-cart-screen-4'
    );
    const addToCartSuccessScreen = document.querySelector(
      '#add-to-cart__options--success'
    );

    const prevAddtoCartScreenLink = document.querySelector(
      '#lightbox__screen-link__prev'
    );
    const nextAddtoCartScreenLink = document.querySelector(
      '#lightbox__screen-link__next'
    );

    const addToCartOptionsSizeRows = [
      ...document.querySelectorAll(
        '#add-to-cart__options--print-size > .lightbox__purchase-options-containter__form__content__row'
      )
    ];
    const addToCartOptionsSizeRadios = [
      ...document.querySelectorAll('[name=size]')
    ];
    addToCartOptionsSizeRadios.forEach(radio => {
      radio.addEventListener('click', function () {
        addToCartOptionsSizeRows.forEach(row => {
          row.classList.remove(
            'lightbox__purchase-options-containter__form__content__row--active'
          );
        });
        this.parentElement.classList.add(
          'lightbox__purchase-options-containter__form__content__row--active'
        );
      });
    });

    const addToCartOptionsFinishRows = [
      ...document.querySelectorAll(
        '#add-to-cart__options--print-finish > .lightbox__purchase-options-containter__form__content__row'
      )
    ];
    const addToCartOptionsFinishRadios = [
      ...document.querySelectorAll('[name=finish]')
    ];
    addToCartOptionsFinishRadios.forEach(radio => {
      radio.addEventListener('click', function () {
        addToCartOptionsFinishRows.forEach(row => {
          row.classList.remove(
            'lightbox__purchase-options-containter__form__content__row--active'
          );
        });
        this.parentElement.classList.add(
          'lightbox__purchase-options-containter__form__content__row--active'
        );
      });
    });

    const resetAddToCartLinkStyles = () => {
      let allDisabledAddToCartLinks = [
        ...document.querySelectorAll(
          '.lightbox__purchase-options-containter__form__content__navigation__screen-link--disabled'
        )
      ];
      allDisabledAddToCartLinks.forEach(link => {
        link.classList.remove(
          'lightbox__purchase-options-containter__form__content__navigation__screen-link--disabled'
        );
      });
      let currentAddToCartLink = document.querySelector(
        '.lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen'
      );
      currentAddToCartLink.classList.remove(
        'lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen'
      );
      addToCartSizeScreen.classList.add('hidden');
      addToCartFinishScreen.classList.add('hidden');
      addToCartConfirmationScreen.classList.add('hidden');
      addToCartSuccessScreen.classList.add('hidden');
    };

    const loadConfirmationsScreenContent = () => {
      const printSizeSelection = addToCartOptionsSizeRadios.filter(
        radio => radio.checked == true
      );
      const printSizeSelectionItem = printSizeSelection[0];

      const printFinishSelection = addToCartOptionsFinishRadios.filter(
        radio => radio.checked == true
      );
      const printFinishSelectionItem = printFinishSelection[0];

      const totalPrice =
        Number(printSizeSelectionItem.dataset.price) +
        Number(printFinishSelectionItem.dataset.price);

      addToCartConfirmationScreen.innerHTML = `
      <h4
        class="lightbox__purchase-options-containter__form__content__subtitle"
      >
        Confirm Choices
      </h4>
      <div
        class="lightbox__purchase-options-containter__form__content__confirmation-block"
      >
        <div
          class="lightbox__purchase-options-containter__form__content__confirmation-block__row"
        >
          <p>Print Size</p>
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block__edit-link"
            id="edit-link--size"
          >
            Edit >
          </p>
        </div>
        <div
          class="lightbox__purchase-options-containter__form__content__confirmation-block__row"
        >
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block--content"
          >
            ${printSizeSelectionItem.value}
          </p>
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block--content"
          >
            $${printSizeSelectionItem.dataset.price}
          </p>
        </div>
      </div>
      <div
        class="lightbox__purchase-options-containter__form__content__confirmation-block"
      >
        <div
          class="lightbox__purchase-options-containter__form__content__confirmation-block__row"
        >
          <p>Print Finish</p>
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block__edit-link"
            id="edit-link--finish"
          >
            Edit >
          </p>
        </div>
        <div
          class="lightbox__purchase-options-containter__form__content__confirmation-block__row"
        >
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block--content"
          >
            ${printFinishSelectionItem.value}
          </p>
          <p
            class="lightbox__purchase-options-containter__form__content__confirmation-block--content"
          >
          $${printFinishSelectionItem.dataset.price}
          </p>
        </div>
      </div>

      <div
        class="lightbox__purchase-options-containter__form__content__confirmation-block__row"
      >
        <p>Total Photo Cost</p>
        <p>$${totalPrice}</p>
      </div>

      <button class="button button--dark my-3" type="button" id="interior-add-to-cart-button">Add to Cart</button>
      `;
    };

    const showPurchaseScreen = targetScreen => {
      switch (targetScreen) {
        case 1:
          resetAddToCartLinkStyles();
          currentAddToCartScreenNumber = 1;
          reassignCurrentAddToCartScreen();
          refreshCurrentAddToCartScreen();
          displayCurrentAddToCartScreen();
          AddtoCartScreenLinkOne.classList.add(
            'lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen'
          );
          prevAddtoCartScreenLink.classList.add(
            'lightbox__purchase-options-containter__form__content__navigation__screen-link--disabled'
          );
          break;
        case 2:
          resetAddToCartLinkStyles();
          currentAddToCartScreenNumber = 2;
          reassignCurrentAddToCartScreen();
          refreshCurrentAddToCartScreen();
          displayCurrentAddToCartScreen();
          AddtoCartScreenLinkTwo.classList.add(
            'lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen'
          );
          break;
        case 3:
          resetAddToCartLinkStyles();
          currentAddToCartScreenNumber = 3;
          reassignCurrentAddToCartScreen();
          refreshCurrentAddToCartScreen();
          displayCurrentAddToCartScreen();
          loadConfirmationsScreenContent();
          AddtoCartScreenLinkThree.classList.add(
            'lightbox__purchase-options-containter__form__content__navigation__screen-link--current-screen'
          );

          nextAddtoCartScreenLink.classList.add(
            'lightbox__purchase-options-containter__form__content__navigation__screen-link--disabled'
          );
          const sizeEditLink = document.querySelector('#edit-link--size');
          sizeEditLink.addEventListener('click', function () {
            currentAddToCartScreenNumber = 1;
            showPurchaseScreen(currentAddToCartScreenNumber);
          });
          const finishEditLink = document.querySelector('#edit-link--finish');
          finishEditLink.addEventListener('click', function () {
            currentAddToCartScreenNumber = 2;
            showPurchaseScreen(currentAddToCartScreenNumber);
          });

          const confirmationScreenAddToCartButton = document.querySelector(
            '#interior-add-to-cart-button'
          );
          confirmationScreenAddToCartButton.addEventListener(
            'click',
            function () {
              showPurchaseScreen(4);
              const printSizeSelection = addToCartOptionsSizeRadios.filter(
                radio => radio.checked == true
              );
              const printSizeSelectionItem = printSizeSelection[0];
              const printFinishSelection = addToCartOptionsFinishRadios.filter(
                radio => radio.checked == true
              );
              const printFinishSelectionItem = printFinishSelection[0];
              const featuredImage = document.querySelector(
                '.lightbox__featured-image'
              );

              const curImgSrc = featuredImage.currentSrc;
              // curImgSrc.slice(79);

              if (!localStorage.length) {
                const currentCart = [];
                const cartPhoto = {
                  photo: `${pathNameCleaner(featuredImage.currentSrc)}`,
                  source: `${curImgSrc}`,
                  size: `${printSizeSelectionItem.value}`,
                  finish: `${printFinishSelectionItem.value}`,
                  quantity: 1
                };

                currentCart.push(cartPhoto);

                localStorage.setItem(
                  'allCartItemsArr',
                  JSON.stringify(currentCart)
                );
              } else {
                const currentCart = JSON.parse(
                  localStorage.getItem('allCartItemsArr')
                );

                const cartPhoto = {
                  photo: `${pathNameCleaner(featuredImage.currentSrc)}`,
                  source: `${curImgSrc}`,
                  size: `${printSizeSelectionItem.value}`,
                  finish: `${printFinishSelectionItem.value}`,
                  quantity: 1
                };

                currentCart.push(cartPhoto);

                localStorage.setItem(
                  'allCartItemsArr',
                  JSON.stringify(currentCart)
                );
              }

              const shoppingCartNavLink = document.querySelector(
                'nav .fa-shopping-cart'
              );

              shoppingCartNavLink.classList.add('active-cart');
            }
          );
          break;
        case 4:
          resetAddToCartLinkStyles();
          currentAddToCartScreenNumber = 4;
          reassignCurrentAddToCartScreen();
          refreshCurrentAddToCartScreen();
          displayCurrentAddToCartScreen();
          [
            ...document.querySelectorAll(
              '.lightbox__purchase-options-containter__form__content__navigation__exit-link'
            )
          ][1].remove();
          document
            .querySelector(
              '.lightbox__purchase-options-containter__form__content__navigation'
            )
            .remove();
          document
            .querySelector('.lightbox__purchase-options-containter__title')
            .remove();

          break;
        default:
          break;
      }
    };

    const closePurchaseOptionsPopup = document.querySelectorAll(
      '.lightbox__purchase-options-containter__form__content__navigation__exit-link'
    );

    const addToCartSuccessWindowCloser = document.querySelector(
      '.add-to-cart-success-window-closer'
    );

    const selectionValidator = () => {
      refreshCurrentAddToCartScreen();
      if (currentAddToCartScreenNumber == 3) {
        return true;
      } else {
        let currentAddToCartScreenTitle = document.querySelector(
          `#${currentAddToCartScreen.id} h4`
        );

        let currentAddToCartScreenRadios = [
          ...document.querySelectorAll(`#${currentAddToCartScreen.id} input`)
        ];

        currentAddToCartScreenRadios.forEach(radio => {
          radio.addEventListener('click', function () {
            currentAddToCartScreen.classList.add(
              'lightbox__purchase-options-containter__form__content--warning-removal'
            );
            currentAddToCartScreenTitle.classList.add(
              'lightbox__purchase-options-containter__title--warning-note-removal'
            );
          });
        });

        const activeAddToCartScreenSelectedRadio =
          currentAddToCartScreenRadios.filter(radio => radio.checked == true);

        if (
          activeAddToCartScreenSelectedRadio.length == 0 ||
          activeAddToCartScreenSelectedRadio.length == undefined
        ) {
          currentAddToCartScreen.classList.add(
            'lightbox__purchase-options-containter__form__content--warning'
          );
          currentAddToCartScreenTitle.classList.add(
            'lightbox__purchase-options-containter__title--warning-note'
          );
          return false;
        } else {
          return true;
        }
      }
    };

    closePurchaseOptionsPopup.forEach(target => {
      target.addEventListener('click', function () {
        addToCartContainer.remove();
        lightboxNavOverlay.remove();
      });
    });

    addToCartSuccessWindowCloser.addEventListener('click', function () {
      addToCartContainer.remove();
      lightboxNavOverlay.remove();
    });

    AddtoCartScreenLinkOne.addEventListener('click', function () {
      showPurchaseScreen(1);
    });
    AddtoCartScreenLinkTwo.addEventListener('click', function () {
      if (selectionValidator()) {
        showPurchaseScreen(2);
      } else {
        return;
      }
    });
    AddtoCartScreenLinkThree.addEventListener('click', function () {
      if (selectionValidator()) {
        showPurchaseScreen(3);
      } else {
        return;
      }
    });

    nextAddtoCartScreenLink.addEventListener('click', function () {
      if (currentAddToCartScreenNumber == 3) {
        return;
      } else {
        if (selectionValidator()) {
          currentAddToCartScreenNumber++;
          showPurchaseScreen(currentAddToCartScreenNumber);
        } else {
          return;
        }
      }
    });
    prevAddtoCartScreenLink.addEventListener('click', function () {
      if (currentAddToCartScreenNumber == 1) {
        return;
      } else {
        currentAddToCartScreenNumber--;
        showPurchaseScreen(currentAddToCartScreenNumber);
      }
    });
  });
};

const jsonPhotoMapRequest = new XMLHttpRequest();
jsonPhotoMapRequest.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const response = JSON.parse(jsonPhotoMapRequest.response);
    const photosMap = response.photos;

    let currentGalleryAssignment = galleryKey => {
      currentGallery = photosMap.filter(d => d.keywords.includes(galleryKey));
    };

    const currentPage = location.href.replace(location.hash, '');
    switch (currentPage) {
      case 'https://www.kylechinick.com/projects/photographer_portfolio/the_wild.html':
        currentGalleryAssignment('wild');
        break;
      case 'https://www.kylechinick.com/projects/photographer_portfolio/landscapes.html':
        currentGalleryAssignment('Landscapes');
        break;
      case 'https://www.kylechinick.com/projects/photographer_portfolio/structures.html':
        currentGalleryAssignment('Structures');
        break;
      case 'https://www.kylechinick.com/projects/photographer_portfolio/tests.html':
        currentGalleryAssignment('wild');
        break;
      default:
        break;
    }

    currentGallery.sort(function (a, b) {
      var nameA = a.filename.toLowerCase();
      var nameB = b.filename.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    for (i = 0; i < currentGallery.length; i++) {
      const photo = document.createElement('img');

      photo.src = currentGallery[i].filepath;
      photo.loading = 'lazy';
      photo.classList.add('gallery-collection__image');

      const photoKeywords = currentGallery[i].keywords;
      const cleanedKeys = photoKeywords.map(k =>
        k.toLowerCase().replace(' ', '_').replace(' ', '_')
      );
      for (keyword of cleanedKeys) {
        photo.classList.add('keyword-' + keyword);
        allKeywords.push(keyword);
      }

      photo.addEventListener('click', function () {
        openInLightbox(photo);
      });

      photoGalleryContainer.insertAdjacentElement('afterbegin', photo);
    }

    for (filter of filterButtonInputs) {
      const tagCount = document.createElement('p');
      tagCount.classList.add('filter-section__button__tag-count');
      const filterId = filter.id;
      let tagCountTotal = 0;

      for (keyword of allKeywords) {
        if (keyword == filterId) {
          tagCountTotal++;
        } else {
          tagCountTotal += 0;
        }
      }
      tagCount.innerHTML = `${tagCountTotal}`;
      filter.parentElement.insertAdjacentElement('beforeend', tagCount);
    }
  }

  uniqueKeywords = [...new Set(allKeywords)];

  updateActivePhotosArr();
};
jsonPhotoMapRequest.open('GET', './photos.json', true);
jsonPhotoMapRequest.send();

const updateFilters = function () {
  this.parentElement.classList.toggle('filter-section__button--default');
  this.parentElement.classList.toggle('filter-section__button--active');

  if (this.checked) {
    activeFiltersArr.push('keyword-' + this.id);
  } else {
    activeFiltersArr.splice(activeFiltersArr.indexOf('keyword-' + this.id), 1);
  }

  photoGallery = [...document.querySelectorAll('.gallery-collection > img')];

  for (photo of photoGallery) {
    const photoKeywordClasses = [...photo.classList];
    const containsAll = activeFiltersArr.every(filterWord => {
      return photoKeywordClasses.includes(filterWord);
    });

    if (!containsAll) {
      photo.classList.add('hidden');
    } else {
      photo.classList.remove('hidden');
    }

    updateActivePhotosArr();
  }
};

filterButtonInputs.forEach(button => {
  button.addEventListener('change', updateFilters);
});

// FILTER BY NAV-FILTER-LINK TERM

setTimeout(() => {
  const filterTerm = window.location.hash;

  if (filterTerm.length) {
    const targetFilterInput = document.querySelector(`${filterTerm}`);

    targetFilterInput.checked = true;

    const programmedFilterEvent = new Event('change');
    targetFilterInput.dispatchEvent(programmedFilterEvent);
  }
}, 1000);
