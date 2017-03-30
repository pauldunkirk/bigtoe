myApp.factory('GigsFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
  // console.log('Gigs Factory running');

  var factoryRequests = { list: [] };
  var someNewSong = {};
  var allGigs = { list: [] };
  var someUser = {canDeleteRequests: false};

  getSongs();

  function getSongs() {
    $http({
      method: 'GET',
      url: '/requestsroutes'
    }).then(function(response) {
      // console.log('response from factory: ', response);
      // console.log('response.data from factory: ', response.data);
      factoryRequests.list = response.data;
    });
  }

  function addSong(someNewSong) {
    $http({
      method: 'POST',
      url: '/requestsroutes/addrequest',
      data: someNewSong
    }).then(function(response) {
      console.log(response);
      getSongs();
    });
  }

  function deleteSong(songId) {
    $http({
      method: 'DELETE',
      url: '/requestsroutes/' + songId,
      // data: songId
    }).then(function(response) {
      console.log(response);
      getSongs();
    });
  }

  function updateGigs(newGigInfo) {
    // console.log('update gigs before auth');
    // console.log(newGigInfo.id);
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'PUT',
        url: '/gigsroutes/update/gigs',
        data: newGigInfo,
        headers: {
          id_token: idToken
        }
      }).then(function(response) {
        console.log('response from factory: ', response);
        console.log('response.data from factory: ', response.data);
        allGigs.list = response.data;
        getGigs(idToken);
      });
      // console.log('update gigs was hit');
    }).catch(function(error) {
      console.log('error authenticating', error);
    });
  }

  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(firebaseUser) { // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
    console.log('gigs factory auth state changed');
    if (firebaseUser) { // firebaseUser will be null if not logged in
      someUser.canDeleteRequests = true;
      console.log('someUser',someUser);
      firebaseUser.getToken().then(function(idToken) { // This is where we make our call to our server
        getGigs(idToken);
      });
    } else {
      console.log('Not logged in or not authorized.');
      goToLogin();
      allGigs.list = [];
    }
  });

  function getGigs(idToken) {
    // console.log('getgigs running');
    $http({
      method: 'GET',
      url: '/gigsroutes/get/gigs',
      headers: {
        id_token: idToken
      }
    }).then(function(response) {
      // console.log('response from factory: ', response);
      // console.log('response.data from factory: ', response.data);
      allGigs.list = response.data;
      // goToGigs();
    }).catch(function(error) {
      swal("Sorry, this part of the app is meant for members of Big Toe and the Jam. Please click on the link to our website above. If you are a band member, sorry, your email isn't registered. Send it to me and I'll get you in the system.");
      console.log('error authenticating', error);
      auth.$signOut().then(function() {
      console.log('Logging the user out!');
      });
    });
  }

  function goToLogin() {
    $location.path('/login');
  }

  // function goToGigs() {
  //   $location.path('/gigs');
  // }

console.log(someUser);

  return {
    allGigs: allGigs,
    updateGigs: updateGigs,
    allSongs: factoryRequests,
    addSong: addSong,
    getSongs: getSongs,
    deleteSong: deleteSong,
    someUser: someUser
  };
}]);
