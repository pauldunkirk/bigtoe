myApp.controller('ContactsController',['ContactsFactory',function(ContactsFactory) {

console.log('Contacts controller running');

var self = this;

self.testMessage = 'This is the contacts test message';

self.contactsList = ContactsFactory.allContacts;

console.log(self.contactsList);

}]);
