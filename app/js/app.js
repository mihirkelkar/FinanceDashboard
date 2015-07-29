angular.module("Finance", ["ngRoute", "ngStorage", "dataService"])

  .config(function($routeProvider, $httpProvider){
    $routeProvider.when('/',{
      templateUrl : './finance/home.html',
      controller: "FinCtrl"
    }).when('/cash',{
      templateUrl: "./finance/cash.html",
      controller : "CashCtrl"
    }).when('/stocks', {
      templateUrl : './stocks/stocks.html',
      controller: "StockCtrl"
    }).when('/error', {
      template : "<p> This is the wrong page</p>"
    }).otherwise('/error');

    //$httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.headers.common["Accept"] = "application/json";
    //$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

  })
