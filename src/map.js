

export const map = function(){

    var svg = d3.select("svg");

    var path = d3.geoPath();

    var map = d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {

        console.log(us)
        console.log('HELLO')
        
    if (error) throw error;

    

    svg.attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("data-id", el => el.id);

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
        ;
    });

    const states = document.querySelector("svg")

    states.addEventListener("click", (e) => {
        console.log(e.target.dataset.id)
    })
}

