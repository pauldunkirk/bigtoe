myApp.factory('ContactsFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location) {
    // console.log('Contacts Factory running');

    var allContacts = { list: [] };

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser) { // This code runs whenever the user changes authentication states e.g. whevenever the user logs in or logs out
        if (firebaseUser) { // firebaseUser will be null if not logged in
            firebaseUser.getToken().then(function(idToken) { // This is where we make our call to our server
                getContacts(idToken);
            });
        } else {
            console.log('Not logged in or not authorized.');
            allContacts.list = [];
        }
    });

    function getContacts(idToken) {
        $http({
            method: 'GET',
            url: '/contactsroutes',
            headers: {
                id_token: idToken
            }
        }).then(function(response) {
            // console.log('response from factory: ', response);
            // console.log('response.data from factory: ', response.data);
            allContacts.list = response.data;
        });
    }


    return {
        allContacts: allContacts
    };
}]);
