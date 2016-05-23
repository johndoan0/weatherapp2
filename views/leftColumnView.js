function leftColumnView(wInfo){
	var currentInfoView = document.createElement("div");
	currentInfoView.setAttribute("class", "currentInfoView");
	mainWrapper.appendChild(currentInfoView);

	var currentSummary = document.createElement("div"); //left column view container
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
	var iconValue = wInfo.currently.icon;
	// console.log(iconValue);
	var currentIconImg = iconImg(iconValue); 
	currentSummary.appendChild(currentIconImg);
}

function iconImg(iVal){
	if (iVal === "clear-night"){
		var clearNight = document.createElement("img");
		clearNight.setAttribute("src", "./icons/svg/moon.svg")
		return clearNight;
	}

	if(iVal === "clear-day"){
		var clearDay = document.createElement("img");
		clearDay.setAttribute("src", "./icons/svg/Sun.svg")
		return clearDay;
	}
}

function unixTimeToCurrentDay(milliTime){
	var daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	var dateUTC = new Date(milliTime).toUTCString();
	var abbrevDay = dateUTC.slice(0,3);

	for (var i = 0; i < daysArr.length; i++) {
		var abbrevDaysArr = daysArr[i].slice(0,3);
		if(abbrevDay === abbrevDaysArr){
			return daysArr[i];
		}	
	}
}

export { leftColumnView };
