myApp.controller('ChartsController',['ChartsFactory',function(ChartsFactory) {

console.log('Charts controller running');

var self = this;
// self.testMessage = 'This is the charts test message';

self.chartsList = ChartsFactory.allCharts;

console.log(self.chartsList);

}]);
