import data from "./data.json"
console.log(data)
export const map = function(){

    var svg = d3.select("svg");

    var path = d3.geoPath();

    var map = d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {

    console.log('HELLO')
        
    if (error) throw error;

    svg.attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("data-id", el => el.id)
        ;

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
        console.log(crudeRate)

        

        // console.log(resArr)
        // console.log(e.target.dataset.id)
    })
    
}

