myApp.controller('GigsController',['GigsFactory',function(GigsFactory) {
console.log('Gigs controller running');

var self = this;
self.testMessage = 'This is the gigs controller test message';

self.gigsList = GigsFactory.allGigs;
self.updateGigs = GigsFactory.updateGigs;

console.log(self.gigsList);
// console.log(self.gigsList.list);

}]);
