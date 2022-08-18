import { path } from 'd3';
import { async } from 'regenerator-runtime';
import {map} from './map';

document.addEventListener("DOMContentLoaded", (event) => {
    map(2020); 
});

// const slider = document.querySelector(".slideContainer")
let slider = document.getElementsByClassName("slideContainer")
// console.log(slider)
// slider.addEventListener("click", (event) => {
document.addEventListener("click", (event) => {
  let year = document.getElementById("myRange");
  // console.log(year)
  map(+year.value); //2005,2010,2013,2014,2015,2016,2019
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
  document.addEventListener("DOMContentLoaded", () =>{
    setupTabs();

    document.querySelectorAll(".tabs").forEach(tabsContainer => {
      tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
    });
  });