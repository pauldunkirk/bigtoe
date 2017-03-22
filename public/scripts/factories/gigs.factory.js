myApp.factory('GigsFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
    console.log('Gigs Factory running');

    var allGigs = { list: [] };

    function updateGigs(newGigInfo) {
        console.log('update gigs without auth');
        console.log(newGigInfo.id);
        firebase.auth().currentUser.getToken().then(function(idToken) {
            $http({
                method: 'PUT',
                url: '/gigsroutes/update/gigs',
                data: newGigInfo
            }).then(function(response) {
                console.log('response from factory: ', response);
                console.log('response.data from factory: ', response.data);
                allGigs.list = response.data;
                getGigs(idToken);
            });
            console.log('update gigs was hit');
        }).catch(function(error) {
            console.log('error authenticating', error);
        });
    }

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) { // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
        if (firebaseUser) { // firebaseUser will be null if not logged in
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
        $http({
            method: 'GET',
            url: '/gigsroutes/get/gigs',
            headers: {
                id_token: idToken
            }
        }).then(function(response) {
            console.log('response from factory: ', response);
            console.log('response.data from factory: ', response.data);
            allGigs.list = response.data;
            goToCal();
        });
    }

    function goToLogin() {
        $location.path('/login');
    }

    function goToCal() {
        $location.path('/gigs');
    }

    return {
        allGigs: allGigs,
        updateGigs: updateGigs
    };
}]);