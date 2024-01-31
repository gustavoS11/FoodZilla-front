const profile = document.querySelector(".img-profile")
const search = document.querySelector(".img-search")
const logo = document.querySelector(".img-logo")

profile.addEventListener("click", (event) => {
    window.location.href = "/dados/index.html"
})
logo.addEventListener("click", (event) => {
  window.location.href = "/menu/index.html"
})

class NavMenu {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
      this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }

    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }

    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
const navMenu = new NavMenu(
  ".menu",
  ".nav-list",
  ".nav-list li",
);
navMenu.init();

class NavSearch {
  constructor() {
    
  }
}