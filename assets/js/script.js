
//THIS IS WHERE THE 5 DAY FORECAST STARTS 
var startDate = moment().format('M/DD/YYYY');  //THIS IS THE CURRENT DATE THAT USERS SEE
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function() {
    console.log("hello");


    $("#basic-text1").on("click", function(event) { //THE USER CLICKS ON THE CITY THAT THEY WANT
        event.preventDefault();
        var cityInput = $("#input").val(); // THIS WILL SAVE THE CITY THAT THE USER HAS ENTERED 
        var allCities = []; //ARRAY THAT WILL HOLD THE USERS SEARCHED CITIES

        allCities = JSON.parse(localStorage.getItem("allCities")) || []; //THE CITIES 
        allCities.push(cityInput); //PUSHES THEM INTO THE ARRAU
        localStorage.setItem("allCities", JSON.stringify(allCities)); //SAVES IT 

        showWeather(cityInput);
    }); //THE BUTTON HAS ENDED 

    function showWeather(cityInput) {

        $("#dailyWeather").empty(); //EMPTY OUT 
        $("#fiveDay").empty();
        $("#day1").empty();
        $("#day2").empty();
        $("#day3").empty();
        $("#day4").empty();
        $("#day5").empty();

        var oneDay ="https://api.openweathermap.org/data/2.5/weather?q=" //THIS IS THE WEATHE FOR ONE DAY 
            + cityInput + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
        console.log("oneDay", oneDay);

        $.ajax({
            url: oneDay,
            method: "GET",
        }).then(function(response) {

            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
            var lat = response.coord.lat; // LATIUDE
            var lon = response.coord.lon; // LONGITUDE

            $("#dailyWeather").append( //DETAILS FOR THE WEATHER 
                "<div class='col s12 m6'>"
                +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
                +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
                +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            ); 

            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"
                + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";
            console.log("fiveDay", fiveDay);

            $.ajax({ //THIS IS FOR THE FIVE DAYS AND THE UV RATING 
                url: fiveDay,
                method: "GET",
            }).then(function(response) {

                var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
                var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
                var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
                var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

                $("#dailyWeather").append( //THE UV INDEX 
                    "<div class='col s12 m6'>"
                    + "<ul class='daily'>" + "UV Index: " + "<button class='w3-button' id='uvIndex' class='daily'>" + response.current.uvi + "</button>" + "</ul>"
                    + "</div>"
                ); 

                if (response.current.uvi <= 2) { //THE COLOR INDEX FOR THE UV STARTS 
                    $("#uvIndex").addClass("green");
                } else if (response.current.uvi <= 5) {
                    $("#uvIndex").addClass("yellow");
                } else if (response.current.uvi <= 7) {
                    $("#uvIndex").addClass("orange");
                } else if (response.current.uvi <= 10) {
                    $("#uvIndex").addClass("red");
                } else if (response.current.uvi <= 40) {
                    $("#uvIndex").addClass("purple");
                };

                // HEADER
                $("#fiveDay").append(
                    "<div class='col-md-12'>"
                    + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>"
                ); 

                $("#day1").append(  //DAY ONE FOR THE WEATHER APP 
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day1 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day2").append( //DAY TWO FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day2 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day3").append( //DAY THREE FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day3 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day4").append( //DAY FOUR FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day4 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                $("#day5").append( ///DAY FIVE FOR THE WEATHER APP
                    "<div class='fiveDayCard card col s12 m6'>"
                    +  "<div class='card-body'>"
                    +  "<div class='card-header'>" + day5 +"</div>"
                    +  "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" +"</div>"
                    +  "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
                    +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>"
                    + "</div>"
                ); 

                showCities(); //END AND CALLS FOR ALL CITIES TO ITS FUNTION 
            }) //AJAX ENDED 1
        }) //AJAX ENDED 2
    } //CLOSED FUNTION FOR THE WEATHER 

    function showCities() {
        $("#cityButtons").empty(); //EMPTY 
        var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; 
        var arrayLength = arrayFromStorage.length; 

        for (var i = 0; i < arrayLength; i++) { //LOOPS SO IT SHOES THE CITITES WITHIN THE ARRAY LENGTH
            var cityNameFromArray = arrayFromStorage[i]; 

            $("#cityButtons").append (
                "<div class='list-group'>"

                + "<button class='list-group-item'>" + cityNameFromArray
                + "</button>")
        } //LOOP HAS ENDED 
    } // EHD OF FUNCTION 

    showCities (); //NEED THIS TO LOAD THE PAGE 

    $("#cityButtons").on("click", ".list-group-item", function(event) { //USERS NEED TO CLICK IN ORDER TO SHOW THE CITY 
        event.preventDefault();
        var cityInput = ($(this).text());
        showWeather(cityInput);
    }) 

}); 

