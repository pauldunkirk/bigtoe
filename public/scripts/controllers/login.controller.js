  myApp.controller('LoginController', ['$firebaseAuth', 'GigsFactory', '$location', function($firebaseAuth, GigsFactory, $location) {
      var self = this;

      // self.empList = DataFactory.allEmps;
        // self.newEmp = {};
        // self.addEmp = function() {
        //     DataFactory.addEmp(self.newEmp);
        //     self.newEmp = {};
        // };

      self.songsList = GigsFactory.allSongs;
      console.log(self.songsList);
      
      self.newSong = {};
      self.addSong = function() {
          GigsFactory.addSong(self.newSong);
          self.newSong = {};
      };


      var auth = $firebaseAuth();

      // This code runs whenever the user logs in
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
      // This code runs when the user logs out
      self.logOut = function() {
          console.log('trying to sign out');
          auth.$signOut().then(function() {
              console.log('Logging the user out!');
          });
      };

  }]); // end controller code block
