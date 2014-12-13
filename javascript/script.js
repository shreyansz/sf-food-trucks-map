 "use strict";
 
window.SF_lat      = 37.7603;
window.SF_lng     = -122.4167;
window.url            = "http://data.sfgov.org/resource/rqzj-sfat.json";
		
function main() 
{
	$("#autocomp").val("");
	var markersArray = [];
	var jsonDataAbs = [];
	var jsonData = [];
	var autoCompleteArray = [];
	var pathCount = 0;
	var truckCount = 0;
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
	
	function populateMap()
	{ 	truckCount = 0;
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
				var myLatLng = new google.maps.LatLng(foodTruck.latitude, foodTruck.longitude);
				var infowindow = new google.maps.InfoWindow({
				content: foodTruck.contentString
				  });
				infowindows.push(infowindow);
				var marker = new google.maps.Marker({
				  position: myLatLng,
				  map: map,
				  title: foodTruck.applicant
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
			var pathArr = [];
			for(var i1 = 1; i1 <= idNum; i1++)
			{
				var id = "#path" + i1;
				pathArr.push( $(id).text() );
			}
			$("#path").empty();
			pathCount = 0;
			$("#autocomp").val("");
			populateMap();

			for(var i2 = 1; i2 <= idNum; i2++)
			{
				var id = "#path" + i2;
				$("#autocomp").val(pathArr[i2-1]);
				setLink();
			}
		}
	}
	
	function setLink()
	{
		populateMap();
		var idLink = "path" + ++pathCount; 
		$("#path").append(" > <a id='" + idLink + "' href='#'>" + $("#autocomp").val() + "</a> (" + truckCount +")");
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
		foodTruck['contentString'] 	= "<b>" + value.applicant + "<br>" +value.address + "</b><br>" + "<br><b>Status:</b> " + value.status + "<br><b>Food items:</b> " + value.fooditems;
		
		return foodTruck;
	}
	
	function populateAutoCompleteArray(foodTruck)
	{  	
		if( $.inArray(foodTruck.applicant, autoCompleteArray) < 0 )
			{	
				autoCompleteArray.push(foodTruck.applicant);
			}
			$.each(foodTruck.foodItemsArray, function(foodItemIndex, foodItem)
			{
				if( $.inArray(foodItem, autoCompleteArray) < 0 )
				{
					autoCompleteArray.push(foodItem);
				}
			});
	}
}
$("#reset").on("click", main);
$(document).ready(main);