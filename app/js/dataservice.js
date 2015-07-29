angular.module('dataService', [])
  .factory('getRupee', function($http){
    return function(){
      return $http({
        method : "GET",
        url : "http://api.fixer.io/latest?base=USD&symbols=USD,INR"
      })
    }
  })
