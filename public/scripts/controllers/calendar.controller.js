myApp.controller('CalendarController',['CalendarFactory',function(CalendarFactory) {
console.log('Calendar controller running');

var self = this;
self.testMessage = 'This is the calendar controller test message';

self.gigsList = CalendarFactory.allGigs;
self.updateGigs = CalendarFactory.updateGigs;

console.log(self.gigsList);
console.log(self.gigsList.list);

}]);
