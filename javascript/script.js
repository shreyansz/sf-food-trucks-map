 "use strict";
 
window.SF_lat      = 37.7603;
window.SF_lng     = -122.4167;
window.url            = "//data.sfgov.org/resource/rqzj-sfat.json";
		
function main() 
{
	$("#autocomp").val("");
	var markersArray = [];
	var jsonDataAbs = [];
	var jsonData = [];
	var autoCompleteArray = [];
	var pathCount = 0;
	var truckCount = 0;
	var myLatLng;
	var pathArr = [];
	//get JSON data
	$.getJSON(url, function(data_json)
	{ 
		$.each(data_json, function(index, value)
		{
			var foodTruck = getFoodTruck(value);
			if( false != foodTruck )
			{
				jsonDataAbs.push(foodTruck);
			}
		});
		jsonData = jsonDataAbs;
	}).done( populateMap ); 

	//create Map
	var mapOptions = {
	  center: { lat: SF_lat, lng: SF_lng},
	  zoom: 13
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),
														   mapOptions);
	setUserLocation();
	
	function populateMap()
	{ 	
		truckCount = 0;
		clearMarkersAndAutocomplete();
		var jsonDataTemp = [];
		var infowindows = [];
		var term = $("#autocomp").val();
		
		if( 1 > term.length )
		{
			jsonData = jsonDataAbs;
		}
		
		$.each(jsonData, function(index, foodTruck)
		{ 
			if( ( 1 > term.length ) || ( term === foodTruck.applicant ) || ( $.inArray(term, foodTruck.foodItemsArray) >= 0 ) )
			{
				var ftLatLng = new google.maps.LatLng(foodTruck.latitude, foodTruck.longitude);
				var infowindow = new google.maps.InfoWindow({
				content: foodTruck.contentString
				  });
				infowindows.push(infowindow);
				var marker = new google.maps.Marker({
				  position: ftLatLng,
				  map: map,
				  title: foodTruck.applicant,
				  icon: "//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png"
				});
				google.maps.event.addListener(marker, 'click', function() {
					for (var iw=0; iw<infowindows.length; iw++) 
					{
     					infowindows[iw].close();
  					}
					infowindow.open(map,marker);
				});
				markersArray.push(marker);
				populateAutoCompleteArray(foodTruck);
				jsonDataTemp.push(foodTruck);
				truckCount++;
			}
		});
		
		 $( "#autocomp" ).autocomplete({
			minLength: 2,	
			source: function(request, response) 
			{
				var results = $.ui.autocomplete.filter(autoCompleteArray, request.term);
				response(results.slice(0, 10));
			},
			select: function(event, ui)
			{
				$("#autocomp").val(ui.item.value);
				setLink();
			}
		 });
		 jsonData = jsonDataTemp;
		 if( 1 > term.length )
		{
			$("#path").append("Path: all (" + truckCount +")");
		 }
	}
	
	function returnToClickedState(idNum)
	{
		if(idNum != pathCount)
		{
			var pathArrTemp = pathArr;
			pathArr = [];
			$("#path").empty();
			pathCount = 0;
			$("#autocomp").val("");
			populateMap();

			for(var i2 = 1; i2 <= idNum; i2++)
			{
				var id = "#path" + i2;
				$("#autocomp").val(pathArrTemp[i2-1]);
				setLink();
			}
		}
	}
		
	function setLink()
	{
		var linkName = $("#autocomp").val();
		pathArr.push(linkName);
		populateMap();
		var idLink = "path" + ++pathCount; 
		$("#path").append(" > <a id='" + idLink + "' href='#'>" + linkName + "</a> (" + truckCount +")");
		idLink = "#" + idLink;
		$(idLink).click( function(e){
			e.preventDefault();
			returnToClickedState(idLink.substr(idLink.length - 1));
			return false;
		});
	}
	
	function clearMarkersAndAutocomplete()
	{
		for (var i = 0; i< markersArray.length; i++)
		{
			markersArray[i].setMap(null);
		}
		markersArray.length=0;
		
		while ( autoCompleteArray.length > 0 )
		{
			autoCompleteArray.pop();
		}
	}
	
	function getFoodTruck(value)
	{ 
		if( undefined == value.applicant || undefined == value.latitude || undefined == value.longitude )
		{
			return false;
		}
		var foodTruck = {};
		foodTruck['applicant'] 			= value.applicant;
		foodTruck['latitude'] 		 	= value.latitude;
		foodTruck['longitude'] 		 	= value.longitude;
		foodTruck['foodItemsArray'] = undefined != value.fooditems ? value.fooditems.toLowerCase().split(": ") : [];
		value.address    					= undefined != value.address    ? value.address 	  				 : "";
		value.status       					= undefined != value.status       ? value.status        				 : "";

		foodTruck['contentString'] 	= "<b>" + value.applicant + "</b><br>" + value.address + "<br><b>Status:</b> " + value.status + "<br><b>Food items:</b> " + value.fooditems;
		
		return foodTruck;
	}

	function setUserLocation()
	{	
		if(navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition
			(
				function(position) 
				{
					myLatLng = new google.maps.LatLng(position.coords.latitude,
		            			                      position.coords.longitude);
					var marker = new google.maps.Marker({
						  			 position: myLatLng,
						  			 map: map,
						  			 title: "user Location",
						  			 icon: "//www.google.com/mapfiles/arrow.png"
									 });
				}, 
				function() 
				{
		  			console.log('Error: The Geolocation service failed.');
				}
			);
		} 
		else 
		{
			console.log('Error: Your browser doesn\'t support geolocation. Please enable geolocation if possible.');
		} 
	}
	
	function populateAutoCompleteArray(foodTruck)
	{  	
		if( ( $.inArray(foodTruck.applicant, autoCompleteArray) < 0 ) && ( $.inArray(foodTruck.applicant, pathArr) < 0 ) )
		{	
			autoCompleteArray.push(foodTruck.applicant);
		}
		$.each(foodTruck.foodItemsArray, function(foodItemIndex, foodItem)
		{
			if( ( $.inArray(foodItem, autoCompleteArray) < 0 ) && ( $.inArray(foodItem, pathArr) < 0 ) )
			{
				autoCompleteArray.push(foodItem);
			}
		});
	}
}
$("#reset").on("click", main);
$(document).ready(main);