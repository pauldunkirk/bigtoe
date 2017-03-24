myApp.factory('ChartsFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
    console.log('Charts Factory running');

    var allCharts = { list: [] };

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) { // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
        if (firebaseUser) { // firebaseUser will be null if not logged in
            firebaseUser.getToken().then(function(idToken) { // This is where we make our call to our server
                getCharts(idToken);
            });
        } else {
            console.log('Not logged in or not authorized.');
            allCharts.list = [];
        }
    });

    function getCharts(idToken) {
        $http({
            method: 'GET',
            url: '/chartsroutes/get/charts',
            headers: {
                id_token: idToken
            }
        }).then(function(response) {
            console.log('response from factory: ', response);
            console.log('response.data from factory: ', response.data);
            allCharts.list = response.data;
        });
    }


    return {
        allCharts: allCharts
    };
}]);
