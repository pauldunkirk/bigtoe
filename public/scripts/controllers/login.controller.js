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
      };

      self.deleteSong = function(songId) {
            GigsFactory.deleteSong(songId);
        };

      var auth = $firebaseAuth();

      self.logIn = function() {
          auth.$signInWithPopup("google").then(function(firebaseUser) {
              goToGigs();
              console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
          }).catch(function(error) {
              console.log("Authentication failed: ", error);
          });
      };


      function goToGigs() {
          $location.path('/gigs');
      }

      self.logOut = function() {
          console.log('trying to sign out');
          auth.$signOut().then(function() {
              console.log('Logging the user out!');
          });
      };

  }]); //end controller
