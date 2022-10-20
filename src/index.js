import { path } from 'd3';
import { async } from 'regenerator-runtime';
import {map} from "./Components/Map"
import setupTabs from "./Components/Sidebars"

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

//Side tabs
document.addEventListener("DOMContentLoaded", () =>{
  setupTabs();

  document.querySelectorAll(".tabs").forEach(tabsContainer => {
    tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
  });
});