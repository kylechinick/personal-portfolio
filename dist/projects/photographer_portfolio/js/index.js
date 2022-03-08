const body = document.querySelector('body');
const scrollMarker = document.querySelector('.scroll-marker');
const nav = document.querySelector('nav');
let allLocalStorage = window.localStorage;

// ---   ---   ---
// LOAD MAIN MENU NAV
// ---   ---   ---

const loadMainMenu = () => {
  const mainNav = document.createElement('div');
  mainNav.classList.add('main-nav');
  mainNav.innerHTML = `
      <div class="hamburger-icon mobile-only-item">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div class="main-nav__group">
        <a
          class="main-nav__wordmark main-nav__wordmark--light"
          href="./index.html"
        >
          Steve's
          <span class="main-nav__wordmark main-nav__wordmark--accent"
            >Focus</span
          >
        </a>
        <ul class="menu-lvl-1 desktop-menu-item">
          <li>
            <a href="./galleries_landing.html">Photo Galleries</a>
            <ul class="menu-lvl-2 sub-q-3">
              <li>
                <a href="./the_wild.html">The Wild</a>
                <ul class="menu-lvl-3 sub-q-4">
                  <li><a href="./the_wild.html#birds">Birds</a></li>
                  <li><a href="./the_wild.html#water">Water</a></li>
                  <li><a href="./the_wild.html#funny_friends">Funny Friends</a></li>
                  <li><a href="./the_wild.html#oregon">Oregon</a></li>
                </ul>
              </li>
              <li>
                <a href="./landscapes.html">Landscapes</a>
                <ul class="menu-lvl-3 sub-q-3">
                  <li><a href="./landscapes.html#eastern_washington">Eastern Washington</a></li>
                  <li><a href="./landscapes.html#black_white">Black &#38; White</a></li>
                  <li><a href="./landscapes.html#rural_landscape">Rural Landscape</a></li>
                </ul>
              </li>
              <li>
                <a href="./structures.html">Structures</a>
                <ul class="menu-lvl-3 sub-q-3">
                  <li><a href="./structures.html#bridges">Bridges</a></li>
                  <li><a href="./structures.html#black_white">Black &#38; White</a></li>
                  <li><a href="./structures.html#wind_mill">Wind Mill</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ul class="main-nav__group" id="utility-links">
        <li class="desktop-menu-item">
          <form
          action="./demo_end.html"
            method="GET"
            class="menu-form hidden"
            id="menu-search-form"
          >
            <div class="menu-field">
              <input
                class="menu-field__input input--dark"
                type="text"
                name="photo-search"
                id="menu-photo-search"
                placeholder="Search photos by entering a term, like &ldquo;birds&rdquo; or &ldquo;trees&rdquo;..."
              />
              <button
                class="menu-field__icon menu-field__icon--button"
              >
                <i
                  class="fas fa-arrow-right main-nav__icon main-nav__icon--light"
                ></i>
              </button>
            </div>
          </form>
          <i
            id="menu-search-icon"
            class="fas fa-search main-nav__icon main-nav__icon--light mr-4"
          ></i>
        </li>
        <li>
          <a href="./cart.html">
            <i
              class="fas fa-shopping-cart main-nav__icon main-nav__icon--light"
            ></i>
          </a>
        </li>
      </ul>
    </div>
`;

  nav.appendChild(mainNav);
  const currentCart = JSON.parse(localStorage.getItem('allCartItemsArr'));
  const shoppingCartLink = document.querySelector('.fa-shopping-cart');

  if (localStorage.allCartItemsArr && localStorage.allCartItemsArr.length > 2) {
    shoppingCartLink.classList.add('active-cart');
    console.log('active cart');
  }
  // ---   ---   ---
  // LOAD MOBILE MENU NAV
  // ---   ---   ---

  const mobileNav = document.createElement('div');
  mobileNav.id = 'mobile-menu--expanded';
  mobileNav.classList.add('hidden');
  mobileNav.innerHTML = `
  <form action="POST" class="mobile-menu-search__form">
        <div class="mobile-menu-search__field">
          <input
            type="text"
            name="photo-search"
            placeholder="Search photos"
            class="menu-field__input input--dark"
          />
          <button
            type="submit"
            class="menu-field__icon menu-field__icon--button"
          >
            <i class="fas fa-arrow-right icon--light"></i>
          </button>
        </div>
      </form>

      <ul class="mobile-menu-list">
        <li id="mobile-menu-gallery-link" class="mobile-menu-list--lvl-1">
          <a
            class="link link--extra-large link--light"
            href="./galleries_landing.html"
            >Photo Galleries</a
          >
          <li class="mobile-menu-list--lvl-2">
            <a class="link link--large link--light" href="./the_wild.html"
              >The Wild</a
            >
            <i
              id="chevron-g1"
              class="fas fa-chevron-down accordion__chevron"
            ></i>
            <ul id="accordion-g1" class="mobile-menu-list hidden">
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./the_wild.html#birds">Birds</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./the_wild.html#water">Water</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./the_wild.html#funny_friends">Funny Friends</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./the_wild.html#oregon">Oregon</a>
              </li>
            </ul>
          </li>

          <li class="mobile-menu-list--lvl-2">
            <a class="link link--large link--light" href="./landscapes.html"
              >Landscapes</a
            >
            <i
              id="chevron-g2"
              class="fas fa-chevron-down accordion__chevron"
            ></i>
            <ul id="accordion-g2" class="mobile-menu-list hidden">
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./landscapes.html#eastern_washington">Eastern Washington</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./landscapes.html#black_white">Black &#38; White</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./landscapes.html#rural_landscape">Rural Landscape</a>
              </li>
            </ul>
          </li>

          <li class="mobile-menu-list--lvl-2">
            <a class="link link--large link--light" href="./structures.html"
              >Structures</a
            >
            <i
              id="chevron-g3"
              class="fas fa-chevron-down accordion__chevron"
            ></i>
            <ul id="accordion-g3" class="mobile-menu-list hidden">
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./structures.html#bridges">Bridges</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./structures.html#black_white">Black &#38; White</a>
              </li>
              <li class="mobile-menu-list--lvl-3">
                <a class="link link--light" href="./structures.html#wind_mill">Wind Mill</a>
              </li>
            </ul>
          </li>
        </li>

        <li class="mobile-menu-list--lvl-1">
          <a class="link link--extra-large link--light" href="./contact.html">
            Contact
          </a>
        </li>

        <li class="mobile-menu-list--lvl-1">
          <a
            class="link link--extra-large link--light"
            href="./newsletter.html"
          >
            Newsletter Signup
          </a>
        </li>
      </ul>
  `;
  nav.insertAdjacentElement('beforeend', mobileNav);

  const menuIcon = document.querySelector('.hamburger-icon');
  const mobileMenuContent = document.querySelector('#mobile-menu--expanded');
  const dropdownMenus = document.querySelectorAll('.menu-lvl-1 li > ul');

  const menuSearchIcon = document.querySelector('#menu-search-icon');
  const menuSearchForm = document.querySelector('#menu-search-form');
  const menuSearchInput = document.querySelector('#menu-photo-search');

  const brgrTop = document.querySelector('.hamburger-icon .bar:nth-child(1)');
  const brgrMid = document.querySelector('.hamburger-icon .bar:nth-child(2)');
  const brgrBtm = document.querySelector('.hamburger-icon .bar:nth-child(3)');

  // ---   ---   ---
  // ANIMATE HAMBURGER ICON AND OPEN MOBILE MENU
  // ---   ---   ---

  menuIcon.addEventListener('click', function () {
    if (!menuIcon.classList.contains('menu-expanded')) {
      menuIcon.classList.add('menu-expanded');
      nav.classList.add('menu-expanded');
      mobileMenuContent.classList.remove('hidden');
      brgrTop.classList.add('ani-hamburger-top');
      brgrMid.classList.add('ani-hamburger-middle');
      brgrBtm.classList.add('ani-hamburger-bottom');
    } else {
      menuIcon.classList.remove('menu-expanded');
      nav.classList.remove('menu-expanded');
      mobileMenuContent.classList.add('hidden');
      brgrTop.classList.remove('ani-hamburger-top');
      brgrMid.classList.remove('ani-hamburger-middle');
      brgrBtm.classList.remove('ani-hamburger-bottom');
    }
  });

  // ---   ---   ---
  // SHOW AND HIDE MENU-SEARCH-INPUT
  // ---   ---   ---

  menuSearchIcon.addEventListener('click', function () {
    menuSearchIcon.classList.toggle('hidden');
    menuSearchForm.classList.toggle('hidden');
    setTimeout(function () {
      menuSearchForm.classList.toggle('menu-form--open');
    }, 100);

    menuSearchInput.focus();
  });

  menuSearchInput.addEventListener('focusout', event => {
    setTimeout(function () {
      menuSearchForm.classList.toggle('menu-form--open');
    }, 200);
    setTimeout(function () {
      menuSearchIcon.classList.toggle('hidden');
      menuSearchForm.classList.toggle('hidden');
    }, 1000);
  });

  // ---   ---   ---
  // ANIMATE MOBILE MENU ACCORDIONS
  // ---   ---   ---

  const g1Chevron = document.querySelector('#chevron-g1');
  const g1Accordion = document.querySelector('#accordion-g1');

  const g2Chevron = document.querySelector('#chevron-g2');
  const g2Accordion = document.querySelector('#accordion-g2');

  const g3Chevron = document.querySelector('#chevron-g3');
  const g3Accordion = document.querySelector('#accordion-g3');

  g1Chevron.addEventListener('click', function () {
    if (g1Accordion.classList.contains('hidden')) {
      g1Accordion.classList.remove('hidden');
      g1Chevron.classList.add('accordion__chevron--expanded');
    } else {
      g1Accordion.classList.add('hidden');
      g1Chevron.classList.remove('accordion__chevron--expanded');
    }
  });
  g2Chevron.addEventListener('click', function () {
    if (g2Accordion.classList.contains('hidden')) {
      g2Accordion.classList.remove('hidden');
      g2Chevron.classList.add('accordion__chevron--expanded');
    } else {
      g2Accordion.classList.add('hidden');
      g2Chevron.classList.remove('accordion__chevron--expanded');
    }
  });
  g3Chevron.addEventListener('click', function () {
    if (g3Accordion.classList.contains('hidden')) {
      g3Accordion.classList.remove('hidden');
      g3Chevron.classList.add('accordion__chevron--expanded');
    } else {
      g3Accordion.classList.add('hidden');
      g3Chevron.classList.remove('accordion__chevron--expanded');
    }
  });

  // ---   ---   ---
  // CHECK IF SCROLL-MARKER IS IN VIEWPORT
  // ---   ---   ---

  function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
      var visible = isElementInViewport(el);
      if (visible != old_visible) {
        old_visible = visible;
        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  }

  var handler = onVisibilityChange(scrollMarker, function () {
    if (isElementInViewport) {
      if (!nav.classList.contains('menu-scrolled')) {
        nav.classList.add('menu-scrolled');
        for (menu of dropdownMenus) {
          menu.classList.add('menu-scrolled');
        }
      } else {
        nav.classList.remove('menu-scrolled');
        for (menu of dropdownMenus) {
          menu.classList.remove('menu-scrolled');
        }
      }
    }
  });

  if (window.addEventListener) {
    addEventListener('scroll', handler, false);
  } else if (window.attachEvent) {
    attachEvent('onscroll', handler);
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

loadMainMenu();

// ---   ---   ---
// LOAD FOOTER
// ---   ---   ---

const loadFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.innerHTML = `
  <div class="footer__brand-container footer__brand-lockup">
        <a href="./index.html" class="footer__wordmark footer__wordmark--dark">
          Steve's
          <span class="footer__wordmark footer__wordmark--accent"> Focus</span>
        </a>
        <p class="footer__brand-lockup__tagline">The Northwest In Focus</p>
        <p class="footer__brand-lockup__subtitle">
          And other photos from farther travels
        </p>
      </div>

      <div class="footer__links-container">
        <div class="footer__links-container--group">
          <a
            class="link link--footer-icon link--dark"
            href="https://www.flickr.com/"
            target="_blank"
          >
            <i class="fab fa-flickr"></i>
          </a>
          <a
            class="link link--footer-icon link--dark"
            href="https://twitter.com/"
            target="_blank"
          >
            <i class="fab fa-twitter-square"></i>
          </a>
          <a
            class="link link--footer-icon link--dark"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <i class="fab fa-facebook-square"></i>
          </a>
          <a
            class="link link--footer-icon link--dark"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <i class="fab fa-instagram-square"></i>
          </a>
        </div>
        <div class="footer__links-container--group">
          <a class="link link--footer link--dark" href="./galleries_landing.html"
            >Photo Galleries</a
          >
          <a class="link link--footer link--dark" href="./demo_end.html">Search</a>
          <a class="link link--footer link--dark" href="./cart.html">Cart</a>
          <a class="link link--footer link--dark" href="./contact.html"
            >Contact</a
          >
        </div>
        <div class="footer__links-container--group">
          <p class="copy-block__fine-print copy-block__fine-print--dark">
            Steve's Focus &reg; 2021
          </p>
          <a class="link link--fine-print link--dark" href="./privacy.html"
            >Privacy Policy</a
          >
          <a class="link link--fine-print link--dark" href="./terms.html"
            >Terms &amp; Conditions</a
          >
          <a class="link link--fine-print link--dark" href="./sitemap.html"
            >Sitemap</a
          >
        </div>
      </div>

      <div class="footer__newsletter-cta-container">
        <p class="footer__cta--title">Join My Weekly Newsletter</p>
        <p class="footer__cta--copy">
          Recieve a concise collection of photography tips every Friday.
        </p>
        <form
          action="https://formsubmit.co/kylechinick@gmail.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Signup for In-Focus Fridays Newsletter"
          />
          <input
          type="hidden"
          name="_autoresponse"
          value="Thanks for signing up! To prevent any confusion: please remember that the newsletter signup form you submited is strictly part of a demonstration project so your email address has not been saved to any email lists. After the production version of the official website launches in the near future we welcome you to visit and enjoy the completed non-demo version of each project the website contains."
        />
          <input
            type="hidden"
            name="_next"
            value="https://www.kylechinick.com/projects/photographer_portfolio/newsletter_success.html"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            class="input input--light input--compact"
            type="email"
            name="newsletter-email"
            placeholder="Email address"
            required
          />
          <button class="button button--secondary button--compact">
            Sign Up
          </button>
        </form>
      </div>
  `;
  body.insertAdjacentElement('beforeend', footer);
};

loadFooter();
