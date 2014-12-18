# SF Food Trucks Map
SF Food Trucks Map is a web application that marks various food truck locations in San Francisco using data provided by [DataSF]. It also provides an autocomplete text box which enables user to filter results based on food truck applicant name or food items.<br>
### Version
1.0.0
### Features
- User location is provided with a different marker.
- Small markers for food trucks are used due to high concentration in certain areas.
- Clicking any food truck marker on the map opens a window containing information about the food truck.
- The autocomplete works when atleast two characters are entered. Autocomplete is set to display a maximum of 10 suggestions.
- It is possible to chain searches in the application. For example, *cookies* search after *coffee* search would display all food trucks offering coffee that also offer cookies. The count of each result is displayed with the search path next to the autocomplete text box.
```
Path: all (615) > coffee (89) > cookies (48) > muffins (22)
```
- Clicking on any of the path stage above would lead to that stage. For instance, clicking the *coffee* link would take the application to the coffee stage.
```
Path: all (615) > coffee (89)
```
- An item already searched would not show up in subsequent suggestions, i.e. one item can show up only once in the path.
- The reset button will take the application back to its original state.
```
Path: all (615)
```
### Technologies
The application is built using HTML, CSS, JavaScript, jQuery, jQuery UI and [Google Maps Javascript API v3]. It was succesfully tested on Google Chrome v39, Mozilla Firefox v33 and Internet Explorer 10 web browsers. Although the reset button of the application is broken when used in IE10.   
### Future Scope
 - Fix reset button for Internet Explorer 10.
 - Display distance from user along with other food truck information.
 - Accept location and zoom map to nearest food trucks.
 - Responsive design.

###License
----
MIT
[DataSF]:https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat
[Google Maps Javascript API v3]:https://developers.google.com/maps/documentation/javascript/
[Uber coding challenge]: https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md
