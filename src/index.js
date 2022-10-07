import { path } from 'd3';
import { async } from 'regenerator-runtime';
import {map} from './map';

//map upon load
document.addEventListener("DOMContentLoaded", (event) => {
    map(2020); 
});
//Modal upon load
document.addEventListener("DOMContentLoaded", (event) => {
  let instructions = document.getElementById('instructions_modal')
    instructions.addEventListener("click", (event)=>{
    instructions.style.opacity = '0';
    instructions.style.pointerEvents = 'none'
    })
})


document.addEventListener("click", (event) => {
  if (event.target.id === "myRange"){
    let year = document.getElementById("myRange");
    map(+year.value); //2005,2010,2013,2014,2015,2016,2019
  }
});

document.addEventListener("DOMContentLoaded", () =>{
  setupTabs();

  document.querySelectorAll(".tabs").forEach(tabsContainer => {
    tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
  });
});
//Side tabs
function setupTabs() {
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

