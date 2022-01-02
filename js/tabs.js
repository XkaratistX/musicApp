window.addEventListener('DOMContentLoaded', function () {
'use strict';
// tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.mobile__tab-header'),
          tab = tabHeader.querySelectorAll('.mobile__tab'),
          tabContent = document.querySelectorAll('.mobile__content');

    const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active-tab');
                    tabContent[i].classList.remove('d-none-tab');
                } else {
                    tabContent[i].classList.add('d-none-tab');
                    tab[i].classList.remove('active-tab');
                }
            }
        };
        
      tabHeader.addEventListener('click', (e) => {
            let target = e.target;
            target = target.closest('.mobile__tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
  };
  tabs();
});


