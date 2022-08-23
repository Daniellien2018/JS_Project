# Crude Mortality Rate by State caused by Diabetes Mellitus Data Visualization

## Background: 
    The Goal of my project is to display the Mortality Rate and Number of Deaths caused by Diabetes Melitus over the past ten years. 
    The interactive map of the United States has hover functionality that allows users to visualize data per state.
    Users can also use the scroll bar at the bottom of the map to select a specific year.
    Data displayed in the map will change according to the year. Both fill color and hover data will change according to the year on the scroll bar.
    The right half of the app presents key definitions and statistics related to Diabetes Mellitus, as well as containing links to informational sites such as the Center for Disease Control and the National Institute of Health.

## Functionality and MVPs:
    Key functionalities are:
    -Illustrates a map of the 50 states and set background color according to mortality rate 
    -Hover over a state and have a text box appear with mortality rate
    -A scroll bar to allows for selection of a specific year. 
    -A tabbed text box that allows users to switch between different key details. 
    -Embedded hyperlinks to educational websites.
    -Link to GitHub, LinkedIn. 

<!-- ## Wireframe: 
![JS_Webframe](https://user-images.githubusercontent.com/107147187/184403472-8aa51e1d-9bcc-4924-a9f5-7e885460fba6.png) -->

## Technologies, Libraries, APIs
    Key technologies used include creating a D3 Map using both geoJson and topoJson, as well as utilizing the CDC's (Center for Disease Control) API WONDER.
    TopoJson, which is an extension of geoJson, is a library that allows users to depict maps as specific shapes and grants ease in illustrating topographical representations. When combined with an API such as CDC's WONDER, data for a specific state can be quantified and groups by requested categories. 

## Key Features
    One of the most challenging aspects of this project was connecting the WONDER API to the topoJson library, and having the website result in a map. The first issue was that the API would return XML formatted data, which presented a challenge when parsing. Not only was the data improperly formatted, the data was returned with irregularities and many edge cases were required to avoid code breaks. The solution for this problem was to download the data as a standard text file, which was then converted to a CSV file via Microsoft Excel. After some selective parsing and data organization, the date was then converted to a json file which was helpful and readily usable in my project. 
    Another challenging aspect of my project was illustrating a dynamic map that would change according to the value given by a user via a scroll bar. I needed to create a dynamic scroll bar that could listen to and handle user events, such as the click event. Originally the map was created using a map() function that would fetch data and render a map based off of a specific year condition. However, I came back to refactor the code so that the map function took in a year as a parameter, and the map(year) function was re-rendered with the appropriate year everytime a user clicked on the scroll bar specifically. This allowed for the dynamic portrayal of an interactive map that could account for user interaction.  


