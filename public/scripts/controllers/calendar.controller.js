myApp.controller('CalendarController',['DataFactory',function(DataFactory) {
console.log('Calendar controller running');

var self = this;
self.testMessage = 'This is the calendar controller test message';

self.gigsList = DataFactory.allGigs;
self.updateGigs = DataFactory.updateGigs;

console.log(self.gigsList);
console.log(self.gigsList.list);

}]);