var RestaurantOrdersApp = angular.module('OrdersApp', ['ngRoute', ]);

RestaurantOrdersApp.controller('OrdersController', function OrdersController($scope, $location) {
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

    $scope.validateCategory = false;
    $scope.validateMeal = false;
    $scope.validateQuantity = false;

    $scope.newOrder = function() {
        $location.path('/new_meal');
        console.log($location.path() + '***');
    }
    $scope.goTo = function(path) {
        $location.path(path);
    };
    $scope.addCategoryPrice = function() {
        //clear validation messages
        $scope.validateCategory = false;

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
    };
    $scope.addSpicy = function() {
        if ($scope.spicy) {
            $scope.totalPrice += 1;
            $scope.addOn += " Spicy";

        } else {
            $scope.totalPrice -= 1;
        }
    };
    //updates total price after quantity is updated
    $scope.addQuantity = function() {
        $scope.validateQuantity = false;

        if ($scope.quantity && $scope.quantity > 0)
            $scope.totalPrice *= $scope.quantity;
        console.log($scope.quantity + "***");
    };
    //validates form, updates the list of orders in the invoice with the new order and clears form
    $scope.addOrder = function() {
        console.log($scope.mealSelected + "///")
        if ($scope.categorySelected === '') {
            $scope.validateCategory = true;
            // return false;
        }
        if ($scope.mealSelected === '') {
            $scope.validateMeal = true;
            // return false;
        }
        if ($scope.quantity <= 0) {
            $scope.validateQuantity = true;
        }
        if ($scope.validateMeal || $scope.validateCategory || $scope.validateQuantity) {
            return false;
        }
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
        $scope.totalPrice = 0;
    };
    //clear all when clicking new order
    $scope.clearOrders = function() {
        $scope.orders = [];
        $scope.totalMealsPrice = 0;
        //clearing form
        $scope.addOn = '';
        $scope.categorySelected = '';
        $scope.mealSelected = '';
        $scope.quantity = 1;
        $scope.combo = false;
        $scope.spicy = false;
        $scope.totalPrice = 0;

    };
});

RestaurantOrdersApp.controller('MealsController', function MealController($scope, $location) {
    $scope.categorySelected = '';
    $scope.mealName = '';
    $scope.mealPrice = '';
    $scope.mealDesc = '';

    $scope.invalidCategory = false;
    $scope.invalidName = false;
    $scope.invalidPrice = false;
    $scope.invalidDesc = false;
    $scope.invalidForm = false;

    $scope.clearValidations = function() {
        $scope.invalidCategory = false;
        $scope.invalidName = false;
        $scope.invalidPrice = false;
        $scope.invalidDesc = false;
        $scope.invalidForm = false;
    }
    $scope.validateForm = function(form) {
        if ($scope.categorySelected === '') {
            $scope.invalidCategory = true;
            $scope.invalidForm = true;
        }
        if ($scope.mealName === '') {
            $scope.invalidName = true;
            $scope.invalidForm = true;
        }
        if ($scope.mealPrice === '') {
            $scope.invalidPrice = true;
            $scope.invalidForm = true;
        }
        if ($scope.mealDesc === '') {
            $scope.invalidDesc = true;
            $scope.invalidForm = true;
        }
        if ($scope.invalidForm) {
            return false;
        }
    };
    $scope.uploadImg = function(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#mealImg')
                    .attr('src', e.target.result)
                    // .width(150)
                    // .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };
});
//routing configuration
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
