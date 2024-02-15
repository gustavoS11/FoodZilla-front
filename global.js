const profile = document.querySelector(".img-profile")
const search = document.querySelector(".img-search")
const logo = document.querySelector(".img-logo")
const cart = document.querySelector(".img-cart")
const container = document.querySelector(".container-wrapper")

profile.addEventListener("click", (event) => {
  const idUsuario = localStorage.getItem("@foodzilla-userId")
  if (idUsuario) {
    window.location.href = "/dados/index.html"
  }
  else {
      window.location.href = "/login/index.html"
  }
})
logo.addEventListener("click", (event) => {
  window.location.href = "/menu/index.html"
})
search.addEventListener("click", (event) => {
  if (container.style.display == "none") {
    container.style.display = "flex"
    logo.style.display = "none"
  }
  else {
    container.style.display = "none"
    logo.style.display = "flex"
  }
})
cart.addEventListener("click", (event) => {
  window.location.href=  "/cart/index.html"
})

class NavMenu {
    constructor(Menu, navList, navLinks) {
      this.Menu = document.querySelector(Menu);
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
      this.Menu.classList.toggle(this.activeClass);
      this.animateLinks();
    }

    addClickEvent() {
      this.Menu.addEventListener("click", this.handleClick);
    }

    init() {
      if (this.Menu) {
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