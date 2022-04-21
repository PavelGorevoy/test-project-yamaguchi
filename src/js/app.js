class TableAnimation {
  constructor() {
    this.init();

    if (!this.tableTop || !this.buttonUp || !this.buttonDown) {
      return;
    }

    this.addIntersectionObserver();
  }

  addEventListener = () => {
    this.buttonUp.addEventListener('click', this.onButtonUpClick);
    this.tableTop.addEventListener('transitionend', () => this.isAnimation = false);
  }

  onButtonUpClick = () => {
    if (this.tableTranslateY >= this.tableTranslateMax || this.isAnimation) {
      return;
    }

    this.isAnimation = true;
    this.tableTranslateY = this.tableTranslateY + this.tableTranslateStep;
    this.tableTop.style.setProperty('--table-translate-y', `-${this.tableTranslateY}px` );
  }

  onIntersection = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        this.tableSection.classList.add('tableAnimation');
        this.addEventListener();
      }
    });
  }

  addIntersectionObserver = () => {
    const options = {
      rootMargin: '0px',
      threshold: 0
    }
    console.log(this.tableSection);
    const observer = new IntersectionObserver(this.onIntersection, options);
    observer.observe(this.tableSection);
  }

  init() {
    this.tableTranslateY = 0;
    this.tableTranslateStep = 40;
    this.tableTranslateMax = 160;
    this.isAnimation = false;
    this.tableSection = document.querySelector('.js-table');
    this.tableTop = document.querySelector ('.js-table-top');
    this.buttonUp = document.querySelector ('#buttonUp');
    this.buttonDown = document.querySelector ('#buttonDown');
  }
}

function main() {
  const tableAnimation = new TableAnimation();
}

main ();
