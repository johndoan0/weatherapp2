console.log("js loaded")

//The goal of this app is to make a weather app with plain JS.

//to fix:
//why doesn't import/export work?
//add alert statuses
//loading animation before loading api
//lat/long to city name (google api)
//onclick change metric f/mph to c/km and vice versa
//svg of f and c on temps


// import { test } from "testimportexport";


//if getCurrentPosition deprecated [chrome], use google api for lat/long
if (navigator.geolocation) {
	var navGeoGet = navigator.geolocation.getCurrentPosition(latLong);
}


function latLong(position){

	//get latitude and longitude
	var	latitude = position.coords.latitude,
		longitude = position.coords.longitude;

	console.log("latitude " + latitude);
	console.log("longitude " + longitude);

	weatherXMLRequest(latitude, longitude);
}

function weatherXMLRequest(lat, long){

	//make and send XMLrequest
	var weatherXMLReq = new XMLHttpRequest(),
		wXMLReq = weatherXMLReq,
		APIURL = "https://api.forecast.io/forecast/",
		APIKey = "d7420952a925f111f6437e0ef6c5c530/",
		wOpen = wXMLReq.open("GET", APIURL + APIKey + lat + "," + long, true),
		wSend = wXMLReq.send(); 

	wXMLReq.onreadystatechange = function(){
		
  	//CORS solutions to try:
  	//iframes
  	//window.postMessage
  	//JSONP
  	//server-side proxy(node.js)
  	//https://jvaneyck.wordpress.com/2014/01/07/cross-domain-requests-in-javascript/

  	//need better error-handling(timeout, no response, etc.)

  	//add animation during loading

	  	// console.log("ready state changed " + wXMLReq.readyState)
	 	var resp = wXMLReq.responseText;

	 	//Request successful, read the response
	 	if (wXMLReq.readyState === 4){
	 		var respToJSON = JSON.parse(resp);

	 		// console.log(wXMLReq.status);
	 		// console.log(wXMLReq.statusText);
	 		console.log(respToJSON);
	 		// console.log(respToJSON.daily);
	 		// console.log(resp)
	 		weatherView(respToJSON);
	 	}
	}	
}

// ---VIEW---- 
function weatherView(wInfo){
	// console.log("weather view");
	// console.log(wInfo);
	// test();
	leftColumnView(wInfo);
	centerColumnView(wInfo);
	rightColumnView(wInfo);
}

function leftColumnView(wInfo){
	var currentInfoView = document.createElement("div");
	currentInfoView.setAttribute("class", "currentInfoView");
	mainWrapper.appendChild(currentInfoView);

	var currentSummary = document.createElement("div");
	currentSummary.setAttribute("id", "currentSummary");
	currentInfoView.appendChild(currentSummary);

	var cityName = document.createElement("div");
	cityName.setAttribute("id", "cityName");
	cityName.textContent = "Houston"; //use lat/long --> google maps API to get city name
	currentSummary.appendChild(cityName);

	var currentDate = document.createElement("div");
	currentDate.setAttribute("id", "currentDate")
	var unixTime = (wInfo.currently.time) * 1000;
	var currentDay = unixTimeToCurrentDay(unixTime);
	currentDate.textContent = currentDay;
	currentSummary.appendChild(currentDate);

	var currentSumNow = document.createElement("div");
	currentSumNow.setAttribute("id", "currentSumNow");
	var currentSumNowText = wInfo.currently.summary;
	currentSumNow.textContent = currentSumNowText;
	currentSummary.appendChild(currentSumNow);

	var currentIcon = document.createElement("div");
	currentIcon.setAttribute("id", "currentIcon");
	currentSummary.appendChild(currentIcon);
	var iconValue = wInfo.currently.icon;
	var currentIconSVG = iconSVG(iconValue);
	currentIcon.appendChild(currentIconSVG);
}

function iconSVG(iVal){

	//fill in more icon values to svg img
	var currentImg = document.createElement("img");
	currentImg.setAttribute("id", "currentImg");

	if (iVal === "clear-night"){
		currentImg.setAttribute("src", "./icons/svg/Moon.svg");
		return currentImg;
	}

	if(iVal === "clear-day"){
		currentImg.setAttribute("src", "./icons/svg/Sun.svg");
		return currentImg;
	}

	if(iVal === "partly-cloudy-day"){
		currentImg.setAttribute("src", "./icons/svg/Cloud-Sun.svg");
		return currentImg;
	}

	if(iVal === "partly-cloudy-night"){
		currentImg.setAttribute("src", "./icons/svg/Cloud-Moon.svg");
		return currentImg;
	}

	else{
		currentImg.setAttribute("src", "./icons/svg/Shades.svg");
		currentImg.setAttribute("alt", "No icon available for current weather!");
		return currentImg;
	}
}

function unixTimeToCurrentDay(milliTime){
	var daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	var dateUTC = new Date(milliTime).toUTCString();
	console.log(dateUTC);
	var abbrevDay = dateUTC.slice(0,3);

	for (var i = 0; i < daysArr.length; i++) {
		var abbrevDaysArr = daysArr[i].slice(0,3);
		if(abbrevDay === abbrevDaysArr){
			return daysArr[i];
		}	
	}
}

function centerColumnView(wInfo){
	var centerView = document.createElement("div");
	centerView.setAttribute('class', "centerView");
	mainWrapper.appendChild(centerView);

	var currentTemp = document.createElement("div");
	currentTemp.setAttribute('id', "currentTemp");
	var cTempText = Math.round(wInfo.currently.temperature);
	currentTemp.textContent = cTempText + " F";
	centerView.appendChild(currentTemp); 
}

function rightColumnView(wInfo){
	var rightView = document.createElement("div");
	rightView.setAttribute("class", "rightView");
	mainWrapper.appendChild(rightView);

	var currentDayHighLowTemp = document.createElement("div");
	currentDayHighLowTemp.setAttribute("class", "highLow");
	rightView.appendChild(currentDayHighLowTemp);

	var cDayHigh = document.createElement("div");
	cDayHigh.setAttribute("id", "dayHighTemp")
	var cDayHighText = wInfo.daily.data[0].temperatureMax;
	cDayHigh.textContent = Math.round(cDayHighText) + " F";
	currentDayHighLowTemp.appendChild(cDayHigh);

	var cDayLow = document.createElement("div");
	cDayHigh.setAttribute("id", "dayLowTemp")
	var cDayLowText = wInfo.daily.data[0].temperatureMin;
	cDayLow.textContent = Math.round(cDayLowText) + " F";
	currentDayHighLowTemp.appendChild(cDayLow);

	var currentPrecipitation = document.createElement("div");
	currentPrecipitation.setAttribute("id", "precipitation");
	precipText = wInfo.currently.precipProbability + "% Precipitation";
	currentPrecipitation.textContent = precipText;
	rightView.appendChild(currentPrecipitation);

	var currentHumidity = document.createElement("div");
	currentHumidity.setAttribute("id", "humidity");
	var cHumidityText = (wInfo.currently.humidity * 100) + "% Humidity";
	currentHumidity.textContent = cHumidityText;
	rightView.appendChild(currentHumidity);
}
