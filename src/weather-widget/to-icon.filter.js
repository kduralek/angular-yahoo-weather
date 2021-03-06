export default function toIconFilter() {

    var iconClasses = {
        0: 'wi-tornado',
        1: 'wi-storm-showers',
        2: 'wi-tornado',
        3: 'wi-thunderstorm',
        4: 'wi-thunderstorm',
        5: 'wi-snow',
        6: 'wi-rain-mix',
        7: 'wi-rain-mix',
        8: 'wi-sprinkle',
        9: 'wi-sprinkle',
        10: 'wi-hail',
        11: 'wi-showers',
        12: 'wi-showers',
        13: 'wi-snow',
        14: 'wi-storm-showers',
        15: 'wi-snow',
        16: 'wi-snow',
        17: 'wi-hail',
        18: 'wi-hail',
        19: 'wi-cloudy-gusts',
        20: 'wi-fog',
        21: 'wi-fog',
        22: 'wi-fog',
        23: 'wi-cloudy-gusts',
        24: 'wi-cloudy-windy',
        25: 'wi-thermometer',
        26: 'wi-cloudy',
        27: 'wi-night-cloudy',
        28: 'wi-day-cloudy',
        29: 'wi-night-cloudy',
        30: 'wi-day-cloudy',
        31: 'wi-night-clear',
        32: 'wi-day-sunny',
        33: 'wi-night-clear',
        34: 'wi-day-sunny-overcast',
        35: 'wi-hail',
        36: 'wi-day-sunny',
        37: 'wi-thunderstorm',
        38: 'wi-thunderstorm',
        39: 'wi-thunderstorm',
        40: 'wi-storm-showers',
        41: 'wi-snow',
        42: 'wi-snow',
        43: 'wi-snow',
        44: 'wi-cloudy',
        45: 'wi-lightning',
        46: 'wi-snow',
        47: 'wi-thunderstorm',
        3200: 'wi-cloud'
    };

    return function (input) {
        if (angular.isDefined(input) && !!iconClasses[input]) {
            return iconClasses[input];
        }

        return '';
    }
}
