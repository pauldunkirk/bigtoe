// nav using this

  myApp.controller('LoginController', ['$firebaseAuth', 'GigsFactory', '$location', function($firebaseAuth, GigsFactory, $location) {
      var self = this;

      self.songsList = GigsFactory.allSongs;
      self.getSongs=GigsFactory.getSongs;

      self.someUser=GigsFactory.someUser;
      // console.log(GigsFactory);
// console.log(GigsFactory.canDeleteRequests);
// console.log(self.canDeleteRequests);
      self.newSong = {};

      self.addSong = function() {
          GigsFactory.addSong(self.newSong);
          self.newSong = {};
          swal({
           title: 'Thanks for the feedback! I will ask the drummer if he knows that one!',
           timer: 3000
         });
      };

      self.deleteSong = function(songId) {
            GigsFactory.deleteSong(songId);
        };

      var auth = $firebaseAuth();

      self.logIn = function() {
          auth.$signInWithPopup("google").then(function(firebaseUser) {
            goToRequests();
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
            swal({
             title: 'Way to Log In!',
             timer: 2000
           });
          }).catch(function(error) {
              console.log("Authentication failed: ", error);
          });
      };

      function goToRequests() {
          $location.path('/requests');
      }

      self.logOut = function() {
          // console.log('trying to sign out');
          auth.$signOut().then(function() {
              console.log('Logging the user out!');
          });
      };

  // }]); //end controller



  ///Ed

  // myApp.controller('LoginController', ['GigsFactory', function(GigsFactory) {
  //   var self = this;
    // console.log('nav controller running');
    // self.testMessage = 'Hello World, this is the login controller test message';

    self.isCollapsed = true;


    self.toggleNav = function(){
      self.isCollapsed = !self.isCollapsed;
      console.log('toggleNav function, self.isCollapsed', self.isCollapsed);
    };

    // self.toggleDropdown = function(){
    //   self.isOpen = !self.isOpen;
    //   console.log('toggleDropdown function');
    // };

    // self.logOut = function() {
    //   AuthUserFactory.logOut();
    // };

  }]); // end controller code block
