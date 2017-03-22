myApp.factory('mp3sFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
    console.log('mp3s Factory running');

    var allmp3s = { list: [] };

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) { // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
        if (firebaseUser) { // firebaseUser will be null if not logged in
            firebaseUser.getToken().then(function(idToken) { // This is where we make our call to our server
                getmp3s(idToken);
            });
        } else {
            console.log('Not logged in or not authorized.');
            allmp3s.list = [];
        }
    });

    function getmp3s(idToken) {
        $http({
            method: 'GET',
            url: '/mp3sroutes/get/mp3s',
            headers: {
                id_token: idToken
            }
        }).then(function(response) {
            console.log('response from factory: ', response);
            console.log('response.data from factory: ', response.data);
            allmp3s.list = response.data;
        });
    }


    return {
        allmp3s: allmp3s
    };
}]);
