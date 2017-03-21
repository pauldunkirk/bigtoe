myApp.factory('CalendarFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
    console.log('Data Factory running');

    var factoryGigs = {
        list: []
    };

    function updateGigs(newGigInfo) {
      console.log('update gigs without auth');
      console.log(newGigInfo.id);
      firebase.auth().currentUser.getToken().then(function(idToken){
        $http({
            method: 'PUT',
            url: '/routes/update/gigs',
            data: newGigInfo
        }).then(function(response) {
            console.log('response from factory: ', response);
            console.log('response.data from factory: ', response.data);
            factoryGigs.list = response.data;
            getGigs(idToken);
        });
        console.log('update gigs was hit');
      }).catch(function(error){
        console.log('error authenticating', error);
      });
    }


    var auth = $firebaseAuth();
    // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate the same things in the login and the logout code
    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        if (firebaseUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                getGigs(idToken);
            });
        } else {
            console.log('Not logged in or not authorized.');
            goToLogin();
            factoryGigs.list = [];
            // self.secretData = "Log in to get some secret data.";
        }
    });
function getGigs(idToken){
    $http({
        method: 'GET',
        url: '/routes/get/gigs',
        headers: {
            id_token: idToken
        }
    }).then(function(response) {
        console.log('response from factory: ', response);
        console.log('response.data from factory: ', response.data);
        factoryGigs.list = response.data;
        goToCal();
    });
}
    // getGigs();
    // function getGigs() {
    //     $http({
    //         method: 'GET',
    //         url: '/routes/get/gigs'
    //     }).then(function(response) {
    //         console.log('response from factory: ', response);
    //         console.log('response.data from factory: ', response.data);
    //         factoryGigs.list = response.data;
    //     });
    // }


    function goToLogin() {
        $location.path('/login');
    }

    function goToCal() {
        $location.path('/calendar');
    }

    return {
        allGigs: factoryGigs,
        updateGigs: updateGigs
    };
}]);
