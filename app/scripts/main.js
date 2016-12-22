var RestaurantOrdersApp = angular.module('OrdersApp', ['ngRoute', ]);

// Define the `PhoneListController` controller on the `phonecatApp` module
RestaurantOrdersApp.controller('OrdersController', function OrdersController($scope, $location) {
    $scope.phones = [{
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
    }, {
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
    }, {
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
    }];
    $scope.italianBasePrice = 50;
    $scope.chineseBasePrice = 60;
    $scope.lebaneseBasePrice = 70;

    $scope.totalPrice = 0;
    $scope.categorySelected = '';
    $scope.mealSelected = '';
    $scope.combo = false;
    $scope.spicy = false;
    $scope.quantity = 1;

    //array of all orders to add to the invoice
    $scope.orders = [];
    //text to specify addOns in the invoice
    $scope.addOn = '';
    //specifies the meal price without addOns
    $scope.mealPrice = 0;
    $scope.totalMealsPrice = 0;

    $scope.newOrder = function() {
        $location.path('/new_meal');
        console.log($location.path() + '***');
    }
    $scope.goTo = function(path) {
        $location.path(path);
        $scope.active = "active";
        console.log('sdadad')
    };
    $scope.addCategoryPrice = function() {
        if ($scope.categorySelected === 'Italian') {
            $scope.totalPrice = $scope.italianBasePrice;
            $scope.mealPrice = $scope.italianBasePrice;

        } else {
            if ($scope.categorySelected === 'Chinese') {
                $scope.totalPrice = $scope.chineseBasePrice;
                $scope.mealPrice = $scope.chineseBasePrice;

            } else {
                if ($scope.categorySelected === 'Lebanese') {
                    $scope.totalPrice = $scope.lebaneseBasePrice;
                    $scope.mealPrice = $scope.lebaneseBasePrice;

                }
            }
        }
        $scope.combo = false;
        $scope.spicy = false;
    }
    $scope.addCombo = function() {
        if ($scope.combo) {
            $scope.totalPrice += 2;
            $scope.addOn += " Combo";
        } else {
            $scope.totalPrice -= 2;
        }
    }
    $scope.addSpicy = function() {
            if ($scope.spicy) {
                $scope.totalPrice += 1;
                $scope.addOn += " Spicy";

            } else {
                $scope.totalPrice -= 1;
            }
        }
        //updates total price after quantity is updated
    $scope.addQuantity = function() {
            if ($scope.quantity)
                $scope.totalPrice *= $scope.quantity;
            console.log($scope.quantity + "***");
        }
        //updates the list of orders in the invoice with the new order and clears form
    $scope.addOrder = function() {
        $scope.orders.push({ item: $scope.mealSelected, quantity: $scope.quantity, price: $scope.mealPrice, addOns: $scope.addOn, total: $scope.totalPrice });
        //update total price in the invoice
        $scope.totalMealsPrice += $scope.totalPrice;
        //clearing form
        $scope.addOn = '';
        $scope.categorySelected = '';
        $scope.mealSelected = '';
        $scope.quantity = 1;
        $scope.combo = false;
        $scope.spicy = false;
    }
});

RestaurantOrdersApp.config(['$routeProvider',
    function($routeProvider) {
        // $locationProvider.hashPrefix('');
        $routeProvider.
        when('/new_order', {
            templateUrl: 'new_order.html',
            controller: 'OrdersController'
        }).
        when('/', {
            templateUrl: 'new_order.html',
            controller: 'OrdersController'
        }).
        when('/new_meal', {
            templateUrl: 'new_meal.html',
            controller: 'OrdersController'
        }).
        otherwise('/');
    }
]);
