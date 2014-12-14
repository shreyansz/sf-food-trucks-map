# SF Food Trucks Map
SF Food Trucks Map is a web application that marks various food truck locations in San Francisco using data provided by [DataSF]. It also provides an autocomplete text box which enables user to filter results based on food truck applicant name or food items.<br>
This solution is a little different to the [Uber coding challenge], in that, it does not map food trucks near a specific location, but rather maps all food trucks in accordance with data provided by [DataSF]. Food truck locations were not provided based on user location, since the user might be outside San Francisco and the application obtains information only for San Francisco based food trucks. Finding closest food trucks based on user location is set as future scope. Food truck locations based on a given address within SF was also scrapped, since the user can easily figure that using the map and address validation would have been required. There were timing constraints too. It does have an option to filter results based on food truck aplicant's name or food items.  
### Version
1.0.0
### Features
- Clicking any food truck marker on the map opens a window containing information about the food truck.
- The autocomplete works when atleast two characters are entered. Autocomplete is set to display a maximum of 10 suggestions.
- It is possible to chain searches in the application. For example, *cookies* search after *coffee* search would display all food trucks offering coffee that also offer cookies. The count of each result is displayed with the search path next to the autocomplete text box.
```
Path: all (615) > coffee (89) > cookies (48) > muffins (22)
```
- Clicking on any of the path stage above would lead to that stage. For instance, clicking the *coffee* link would take the application to the coffee stage
```
Path: all (615) > coffee (89)
```
-The reset button will take the application back to its original state.
```
Path: all (615)
```
### Technologies
The application is built using HTML, CSS, JavaScript, jQuery, jQuery UI and [Google Maps Javascript API v3]. It was succesfully tested on Google Chrome v39, Mozilla Firefox v33 and Internet Explorer 10 web browsers.  
### Future Scope
 - Cross-browser compatibility
 - Responsive design
License
----
MIT
[DataSF]:https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat
[Google Maps Javascript API v3]:https://developers.google.com/maps/documentation/javascript/
[Uber coding challenge]: https://github.com/uber/coding-challenge-tools/blob/master/coding_challenge.md
