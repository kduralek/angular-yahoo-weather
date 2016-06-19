import angular from 'angular';

import WeatherWidgetController from './weather-widget.controller.js';
import Datasource from './datasource.service.js';
import toIconFilter from './to-icon.filter.js';
import template from './weather-widget.html!text';

angular
    .module('weatherWidget', [])
    .service('Datasource', Datasource)
    .filter('toIcon', toIconFilter)
    .component('weatherWidget', {
        controller: WeatherWidgetController,
        template: template
    });
