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
    this.buttonDown.addEventListener('click', this.onButtonDownClick);
    this.tableTop.addEventListener('transitionend', () => this.isAnimation = false);
  }

  onButtonUpClick = () => {
    if (this.tableTranslateY >= this.tableTranslateMax || this.isAnimation) {
      return;
    }

    if (window.innerWidth <= 600 ) {

      this.isAnimation = true;
      this.tableTranslateY = this.tableTranslateY + this.tableTranslateStepMob;
      this.tableTop.style.setProperty('--table-translate-y', `-${this.tableTranslateY}px` );
    }

    else {
      this.isAnimation = true;
      this.tableTranslateY = this.tableTranslateY + this.tableTranslateStep;
      this.tableTop.style.setProperty('--table-translate-y', `-${this.tableTranslateY}px` );}
  }

  onButtonDownClick = () => {
    if (this.tableTranslateY >= this.tableTranslateMax || this.isAnimation) {
      return;
    }

    if (window.innerWidth <= 600 ) {

      this.isAnimation = true;
      this.tableTranslateY = this.tableTranslateY - this.tableTranslateStepMob;
      this.tableTop.style.setProperty('--table-translate-y', `-${this.tableTranslateY}px` );
    }

    else {
      this.isAnimation = true;
      this.tableTranslateY = this.tableTranslateY - this.tableTranslateStep;
      this.tableTop.style.setProperty('--table-translate-y', `-${this.tableTranslateY}px` );
    }
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
    const observer = new IntersectionObserver(this.onIntersection, options);
    observer.observe(this.tableSection);
  }

  init() {
    this.tableTranslateY = 0;
    this.tableTranslateStep = 25;
    this.tableTranslateStepMob = 5;
    this.tableTranslateMax = 100;
    this.tableTranslateMaxMob = 10;
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
