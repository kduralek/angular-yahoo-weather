import angular from 'angular';
import './weather-widget/weather-widget';

angular
    .module('app', ['weatherWidget']);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app'], {
        strictDi: true
    });
});