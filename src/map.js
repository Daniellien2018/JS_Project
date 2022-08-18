import data from "./data.json"
// console.log(data)


// function renderSlider() {
//     const slider = document.createElement("div");
//     slider.setAttribute("id", "slider-container");

//     const sliderInput = document.createElement("input");
//     sliderInput.setAttribute("id", "year-slider");
//     sliderInput.setAttribute("type", "range");
//     sliderInput.setAttribute("min", "1999");
//     sliderInput.setAttribute("max", "2020");
//     // sliderInput.setAttribute("value", "2020");
//     sliderInput.setAttribute("step", "1");

//     const sliderLabel = document.createElement("span");
//     sliderLabel.setAttribute("id", "slider-current-year");
//     //   sliderLabel.innerHTML = 2020;
    
//     slider.appendChild(sliderInput);
//     slider.appendChild(sliderLabel);
//     document.getElementsByClassName("us-map-container")[0].appendChild(slider);

//     document.getElementById("slider-current-year").style.left = `calc( 100% - 12.5px - ${document.getElementById("slider-current-year").offsetWidth / 2}px)`;
// }

export const map = function(year){
    var svg = d3.select("svg");

    var path = d3.geoPath();

    var map = d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
        if (error) throw error;
        var topo = topojson.feature(us, us.objects.states).features
        // console.log(topo)
        var tooltip = d3.select("#tooltip")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("top", "-100px")
            .style("left", "100px")
            .style("border", "1px solid black")
            .style("background", "white")
            .style("border-radius", "10px")
        
        svg.attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("data-id", el => el.id)
        .attr("data-year", year)
        .attr("fill", (obj) => {
            // console.log(obj)
            const rate = data.find(ele => +obj.id === ele["State Code"] && ele["Year"] === year)["Crude Rate"]
            if (rate === "unreliable"){
                return "black"
            }
            if (rate <= 5.9){
                return "powderblue" 
            }else if (rate > 5.9 && rate <= 7.5){
                return "lightskyblue"
            }else if (rate > 7.5 && rate <= 10){
                return "deepskyblue"
            }else{
                return "navy"
            }})
        .on("mouseover", (stateData) => {
            tooltip.style("visibility", "visible")
            .style("top", event.pageY)
            .style("left", event.pageX)
            .html(() => {
                console.log(stateData.id)
                let resArr = data.filter(ele => ele["State Code"] === +stateData.id)
                let resArr2 = resArr.filter(ele => ele["Year"] === year)
                let rate = resArr2[0]["Crude Rate"]
                let state = resArr2[0]["State"]
                console.log()
                return`<p>${state}: ${rate}</p>`;   
            })
        svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

        // const states = document.querySelector("svg")

        //tooltip
        // console.log(topo)
        // console.log(data)
        // let resArr = data.filter(ele => ele["State Code"] === +topo[0].id)
        // console.log(resArr)

        // .text("I'm a circle!")
        // .html(`<p>${data[0]["State"]}: ${data[0]["Crude Rate"]} </p>`)
        // .html((obj)=>{
            //     console.log(obj)
            // })
            // .text("path")
            // .html(data)
            // .html( (obj) => {
                // console.log(topo)
                // console.log(topo[0].id)
                // console.log(obj)
                // console.log(data)
                // let resArr = data.filter(ele => ele["State Code"] === +topo[0].id)
                // console.log(resArr)
                // let resArr = data.filter(ele => ele["State Code"] === obj.id)
                // console.log(data)
                // console.log(obj)
                // let res = data.find(ele => +obj.id === ele["State Code"])
                // console.log(res)
                // return res
                // })
                // use .html, make text say what i want
                
                d3.select("svg").selectAll("path")
                    .enter()
                    })
        // .on("mouseout", (stateData) => {
        //     tooltip.style("visibility", "hidden")
        // })
        // states.addEventListener("mouseover", (e) => {
        //         // all data points that match the state
        //         // console.log(e.target.dataset)
        //         let resArr = data.filter(ele => ele["State Code"] === +e.target.dataset.id)
        //         let crudeRate = 0;
        //         resArr.forEach(obj =>{
        //             let ele = obj["Crude Rate"]
        //             if (ele !== "Unreliable"){
        //                 crudeRate += obj["Crude Rate"]
        //             }
        //         })
        //         let resArr2 = resArr.filter(ele => ele["Year"] === year)
        //         let trueRate = resArr2[0]["Crude Rate"]
                
        //         // console.log(trueRate)

        //         var tooltip = d3.select("#tooltip")
        //         .append("div")
        //         .style("position", "absolute")
        //         .style("visibility", "hidden")
        //         .style("top", "-100px")
        //         .style("left", "100px")
        //         .style("border", "1px solid black")
        //         .style("background", "white")
        //         .style("border-radius", "10px");

        //         d3.select("svg")
        //             .on("mouseover", (stateData) =>{
        //                 tooltip.style("visibility", "visible")
        //                 .style("top", event.pageY)
        //                 .style("left", event.pageX)
        //                 .html(`<p>Hello I am Daniel </p>`)
        //             })
        //             .on("mouseout", (stateData) => {
        //                 tooltip.style("visibility", "hidden")
        //             })
        // })



        // click
        // states.addEventListener("click", (e) => {
        //     // all data points that match the state
        //     let resArr = data.filter(ele => ele["State Code"] === +e.target.dataset.id)
        //     // console.log(e.target.dataset)
            
        //     let population = 0;
        //     resArr.forEach (obj => {
        //         // console.log(obj)
        //         population += obj["Population"]
        //     })

        //     let deaths = 0;
        //     resArr.forEach (obj => {
        //         deaths += obj["Deaths"]
        //     })
                    
        //     let crudeRate = 0;
        //     resArr.forEach (obj => {
        //         let ele = obj["Crude Rate"]
        //         if (ele !== "Unreliable"){
        //             crudeRate += obj["Crude Rate"]
        //         }
        //     })

        //     let state = resArr[0]["State"]

        //     // console.log(deaths)
        //     // console.log(population)
        //     // console.log(crudeRate / resArr.length)
        //     // all data points that match the year
        //     let resArr2 = resArr.filter(ele => ele["Year"] === year)
        //     console.log(state)
        //     // console.log(resArr2)
        //     console.log(resArr2[0]["Crude Rate"])            
        // })

        //slider
        var slider = document.getElementById("myRange");
        var output = document.getElementById("value");
        output.innerHTML = slider.value
        slider.oninput = function(){
            output.innerHTML = this.value
        }
    });   
}
