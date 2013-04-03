# Durand Dashboard

See it live here: [Durand Dashboard](http://durand.nodejitsu.com/index.html)  

The Durand Dashboard is a prototype demo application that provides a high-level sales overview for managers to set promotion goals and measure their effectiveness.

The dashboard enables managers and executives to explore multiple sales and promotion metrics across various 
categories and brands at a glance.  Managers can also drill down into categories to see the performance of 
brands in the aggregate or over time and utilize an action menu for relevant information for upcoming promotion 
planning.

## Team
* [Mike Adams](https://github.com/michaelglenadams)
* [Tyler Briles](https://github.com/MrBri/)
* [Raya Desawade](https://github.com/rayalynn)
* [Tony Thomson](https://github.com/tonythomson)

## Technologies
The application is built with the [Angular.js](http://angularjs.org/) framework, and uses the [Highcharts](http://www.highcharts.com) library for graphs, loading data from a set of provided JSON files. While Angular was a project requirement, we selected Highcharts after working with D3 and Chart.js due largely to its extensive documentation and and convenience in creating the types of graphs we required.
We also a customized [Twitter Bootstrap](http://twitter.github.com/bootstrap) library (with add-ons) for styles. The app is served from a [Node.js](http://nodejs.org/) server on [Nodejitsu](https://www.nodejitsu.com/).

## Challenges

The principal challenges for our team were:

* **Learning Angular**: All of us were new to the Angular framework, and found that it required a very different approach than other client-side frameworks (e.g. Backbone).
* **Integrating Highcharts**: While the Highcharts library was itself not too difficult to learn, we found that integrating the graphs into the UI in a fashion that would closely match the original designs was not straightforward.
* **Bootstrap customization**: In order to match the visual design closely without the use of images, we customized the default Bootstrap grid. Extensive CSS was required to adapt Bootstrap UI elements to the design, or to create new ones.

