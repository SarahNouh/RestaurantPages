angular.
module('OrdersApp').
config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider.
        when('/', {
            templateUrl: 'index.html',
            controller: 'OrdersController'
        });
        when('/new_order', {
            templateUrl: 'new_order.html',
            controller: 'OrdersController'
        });
    }
]);
console.log('blaaa');
