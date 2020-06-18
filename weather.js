$(document).ready(function(){
var buttonAdd = $("#buttonAdd");

var searchIt = $("#search");
var header = $("header");
var day1 = $("#day1");
var day2 = $("#day2");
var day3 = $("#day3");
var day4 = $("#day4");
var day5 = $("#day5");
var day6 = $("#day6");
var cloud;
var runThrough = ["holder", day2, day3,day4, day5, day6];


var apiKey = "c480ec8f6386f2259313f00160a140e1";
starter()

// activates history button
$(".gogo").on("click", function(){
 var searcher = $(this).text()
 wholeThing(searcher)

});

// press to search city 
searchIt.on("click", function (event) {
    event.preventDefault()
    var enterHere = $("#enterHere").val();
    console.log(enterHere)
    // add history button
    var newButton = $("<button>").text(enterHere)
    newButton.addClass("gogo")
    buttonAdd.append(newButton)
    wholeThing(enterHere)
});

// function to pull city
function wholeThing(searchCity){
    var queryUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey
    localStorage.setItem("plan1", JSON.stringify(searchCity));

    $.ajax({
        url: queryUrl2,
        method: "GET"
    }).then(function (city) {
        var lat = (city.coord.lat)
        var lon = (city.coord.lon)


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.toString() + "&lon=" + lon.toString() + "&exclude=hourly&appid=" + apiKey,
            method: "GET"
        }).then(function (weatherData) {
            // eppending api data to areas of the HTML
            day1.text("")
            var dateString = moment.unix(weatherData.daily[0].dt).format("MM/DD/YYYY");
            
            day1.append($("<h1>").text(searchCity + " " + dateString))
            
            var temp = ($("<p>").html("Temperature: " + (parseInt(weatherData.daily[0].temp.day-273.15)*1.8+32) + "&#176"+"F"))
            day1.append(temp)
            var Humidity = ($("<p>").text("Humidity: " + weatherData.daily[0].humidity + "%"))
            day1.append(Humidity)
            var wind = ($("<p>").text("Wind-speed: " + weatherData.daily[0].wind_speed + "MPH"))
            day1.append(wind)
            var uvi = ($("<p>").text("Uvi: " + weatherData.daily[0].uvi))
            if (weatherData.daily[0].uvi <= 2) {
                uvi.addClass("green")
            } else if (2 < weatherData.daily[0].uvi <= 5) {
                uvi.addClass("orange")
            } else {
                uvi.addClass("red")
            }
            day1.append(uvi)
            console.log(weatherData)


            for (var i = 1; i <= 5; i++) {
                console.log("for loop")
                runThrough[i].text("")
                dateString = moment.unix(weatherData.daily[i].dt).format("MM/DD/YYYY");
                runThrough[i].append($("<img>").attr("src",  "http://openweathermap.org/img/wn/" + weatherData.daily[0].weather[0].icon + "@2x.png"))
                runThrough[i].append($("<p>").text(dateString))
                runThrough[i].append($("<h1>").text(weatherData.daily[i].weather[0].icon.png))
                var temp = ($("<p>").html("Temp:" + (parseInt(weatherData.daily[0].temp.day-273.15)*1.8+32) + "&#176"+"F"))
                runThrough[i].append(temp)
                var Humidity = ($("<p>").text("Humid:" + weatherData.daily[i].humidity + "%"))
                runThrough[i].append(Humidity)
                


            };
        });
    });
}
// function to load last visited page from local storage upon reload
function starter(){
    var startUp = JSON.parse(localStorage.getItem("plan1"));
    wholeThing(startUp)
}

});
