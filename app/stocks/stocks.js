angular.module('Finance')
  .controller('StockCtrl', function($scope, $localStorage, $http){
    if($localStorage.stocks == undefined){
      $localStorage.stocks = [];
    }
    $scope.stocks = $localStorage.stocks;
    $scope.addStocks=function(){
        var stock = {};
        stock.symbol = $scope.stock.toUpperCase();
        stock.number = $scope.number;
        stock.buyprice = $scope.buyprice;
        $scope.getQuote(stock)
    };

    //Gets Current Price of newly entered stocks
    $scope.getQuote = function(stock){
      //I had a lot of trouble getting the JSONP Callback to work here. For the most part,
      //you might have to add callback="JSON_CALLBACK" to the url.
      //and jsonp or json after the final param in the end point
      $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+stock.symbol+'&callback=JSON_CALLBACK').success(function(data){
        stock.curprice = data.LastPrice;
        $scope.stocks.push(stock);
        $localStorage.stocks = $scope.stocks;
        console.log($scope.p);
      }).error(function(data){
        console.error(data);
      });
  };

  $scope.upDatePrices = function(){
    //Run through all of localstorage stocks and update prices one by one. every minute or so.
  }
})
