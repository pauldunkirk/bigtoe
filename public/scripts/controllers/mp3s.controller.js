myApp.controller('mp3sController',['mp3sFactory',function(mp3sFactory) {
  console.log('mp3s controller running');
  var self = this;
  // self.testMessage = 'This is the mp3s controller test message';

  self.mp3sList = mp3sFactory.allmp3s;

  console.log(self.mp3sList);
  console.log(self.mp3sList.list);

}]);
