import data from "./data.json"
console.log(data)


// avgCrudeRate

export const map = function(year){
    // let year = 2012
    var svg = d3.select("svg");

    var path = d3.geoPath();

    var map = d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {

    if (error) throw error;
    console.log(topojson.feature(us, us.objects.states).features)
    svg.attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("data-id", el => el.id)
        .attr("data-year", year)
        .attr("fill", (obj) => {
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
            }
        })
        ;
// THE GOAL
// I want to be able to get a singular "crudeRate" for each State, pass each rate into
// A callback and fill each state with a corresponding color (Chloropathy)

// THE PROBLEM
// My dataset is not unique, ex: multiple alabama's
// need to add the crudeRates of each state (Sum)

//The Solution
// data is an Array, Use arr.uniq? 

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
        ;
    });

    const states = document.querySelector("svg")

    states.addEventListener("click", (e) => {
        // console.log(e.target.dataset.id)
        // let stateID = +e.target.dataset.id

        // all data points that match the state
        let resArr = data.filter(ele => ele["State Code"] === +e.target.dataset.id)
        let state = resArr[0]["State"]

        let population = 0;
        resArr.forEach (obj => {
            population += obj["Population"]
        })

        let deaths = 0;
        resArr.forEach (obj => {
            deaths += obj["Deaths"]
        })
        
        let crudeRate = 0;
        resArr.forEach (obj => {
            let ele = obj["Crude Rate"]
            if (ele !== "Unreliable"){
                crudeRate += obj["Crude Rate"]
            }
        })
        // all data points that match the year
        let resArr2 = resArr.filter(ele => ele["Year"] === year)
        
        console.log(state)
        // console.log(deaths)
        // console.log(population)
        // console.log(crudeRate / resArr.length)
        console.log(resArr2)
        console.log(resArr2[0]["Crude Rate"])
        

        

        // console.log(resArr)
        // console.log(e.target.dataset.id)
    })
    
}

