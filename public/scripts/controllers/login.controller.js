  myApp.controller('LoginController',['$firebaseAuth', 'GigsFactory','$location', function($firebaseAuth, GigsFactory, $location) {
  // console.log('login controller running');
  var self = this;
  // self.testMessage = 'This is the login controller test message';

  var auth = $firebaseAuth();

  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);

    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };



  // This code runs when the user logs out
    self.logOut = function(){
      console.log('trying to sign out');
      auth.$signOut().then(function(){
        console.log('Logging the user out!');
      });
    };

}]); // end controller code block
