import angular from 'angular';

function Datasource($http) {
    this.getCities = getCities;
    this.getForecastByZipCode = getForecastByZipCode;

    //////////
    function getCities() {
        return [
            {
                zipcode: 90210,
                name: 'Beverly Hills'
            },
            {
                zipcode: 95015,
                name: 'Cupertino'
            },
            {
                zipcode: 20019,
                name: 'Washington'
            }
        ];
    }

    function getForecastByZipCode(zipcode) {
        return $http.get('/api/weather/' + zipcode);
    }
}

Datasource.$inject = ['$http'];

export default Datasource;