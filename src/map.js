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
            let rate = data.find(ele => +obj.id === ele["State Code"])["Crude Rate"]
            return rate
        //     let resArr = []
        //     data.forEach( (ele) => {
                
        //     })
        //     return "red"
            
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

        console.log(state)
        console.log(deaths)
        console.log(population)
        console.log(crudeRate / resArr.length )

        

        // console.log(resArr)
        // console.log(e.target.dataset.id)
    })
    
}

