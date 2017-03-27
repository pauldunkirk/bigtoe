  myApp.controller('LoginController', ['$firebaseAuth', 'GigsFactory', '$location', function($firebaseAuth, GigsFactory, $location) {
      var self = this;

//       self.alertTest = function(){
//         swal("Oops...", "Something went wrong!", "error");
//       }
//
//       sweetAlert({
// 	title: "Oops!",
//     text: "Something went wrong on the page!",
//     type: "error"
// });
      self.songsList = GigsFactory.allSongs;
      // console.log(self.songsList);

      self.newSong = {};
      self.addSong = function() {
          GigsFactory.addSong(self.newSong);
          self.newSong = {};
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
