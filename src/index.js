import { path } from 'd3';
import { async } from 'regenerator-runtime';
import {map} from './map';

document.addEventListener("DOMContentLoaded", (event) => {
    map(2020);
});



// const states = document.querySelectorAll("path")

// states.forEach(state => {
//     state.addEventListener('click', () =>{
//         console.log('Hi')
//         // console.log("states")
//     })
// })

// const title = document.querySelector("h1")
// title.addEventListener("click", () => {
//     console.log("hi")
// })

// document.addEventListener("click", renderGraph);

// function renderGraph(){

// }
// document.addEventListener("mouseover", showBox);
// function showBox(){

// }
// path.addEventListener("click", e => {
//     console.log(e.target)
// })

// states.addEventListener("click", e => {
//     console.log(e.target)
// })