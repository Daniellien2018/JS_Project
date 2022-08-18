import data from "./data.json"

export const map = function(year){
    var svg = d3.select("svg");
    let htmlSvg = document.querySelector('svg');
    while (htmlSvg.lastChild) {
        htmlSvg.lastChild.remove();
    }

    var path = d3.geoPath();

    var map = d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
        if (error) throw error;
        var topo = topojson.feature(us, us.objects.states).features
        var tooltip = d3.select("#tooltip")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("top", "-100px")
            .style("left", "100px")
            .style("border", "1px solid black")
            .style("background", "white")
            .style("border-radius", "10px")
            ;
        
        svg.attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("data-id", el => el.id)
        .attr("data-year", year)
        .attr("fill", (obj) => {
            let rate = data.find(ele => 
                +obj.id === ele["State Code"] && ele["Year"] === year)
            if (!rate) return 'lightgrey';
            rate = rate["Crude Rate"]
            if (rate === "Unreliable"){
                return "lightgrey"
            }else if (rate <= 5.9){
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
            .style("text-align", "center")
            .style("height", "70px")
            .html(() => {
                let resArr = data.filter(ele => ele["State Code"] === +stateData.id)
                let resArr2 = resArr.filter(ele => ele["Year"] === year)
                let rate = resArr2[0]["Crude Rate"]
                let state = resArr2[0]["State"]
                if (rate === "Unreliable"){
                    return`<p>${state}: Unreliable Data</p>`
                }else{
                    return`<p>${state}: ${rate} Deaths per 1000<br> caused by Diabetes</p>`   
                }
            })
        svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

        d3.select("svg")
            .selectAll("path")
            .enter()
        })
        .on("mouseout", (stateData) => {
            tooltip.style("visibility", "hidden")
        })

        //slider
        var slider = document.getElementById("myRange");
        var output = document.getElementById("value");
        output.innerHTML = slider.value
        slider.oninput = function(){
            output.innerHTML = this.value
        }
    });   
}
