const setupTabs = () =>  {
    document.querySelectorAll(".tabs__button").forEach(button => {
      button.addEventListener("click", () => {
        const sideBar = button.parentElement;
        const tabsContainer = sideBar.parentElement;
        const tabsNumber = button.dataset.forTab;
        const tabToActivate = tabsContainer.querySelector(`.tabs__content[data-tab="${tabsNumber}"]`)

        sideBar.querySelectorAll(".tabs__button").forEach( button => {
          button.classList.remove("tabs__button--active");
        });
        tabsContainer.querySelectorAll(".tabs__content").forEach( tab => {
          tab.classList.remove("tabs__content--active");
        });

        button.classList.add("tabs__button--active");
        tabToActivate.classList.add("tabs__content--active");

      });
    });

}

export default setupTabs