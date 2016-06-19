function WeatherWidgetController(Datasource) {
    var vm = this;

    vm.isLoading = false;
    vm.model = {};
    vm.cities = Datasource.getCities();

    vm.show = show;

    /////////
    function show() {
        if (!!vm.model.zipcode) {
            vm.isLoading = true;
            Datasource.getForecastByZipCode(this.model.zipcode).then(function (res) {
                vm.details = res.data.query.results.channel;
                vm.details.item.description = vm.details.item.description.replace(/^<\!\[CDATA\[|\]\]>$/g,'');
                vm.isLoading = false;
            }, function (err) {
                vm.isLoading = false;
                console.log(err);
            })
        }
    }

}
WeatherWidgetController.$inject = ['Datasource'];

export default WeatherWidgetController;