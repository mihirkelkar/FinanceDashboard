angular.module('Finance')
  .controller('FinCtrl', function($scope, $localStorage, getRupee){
    $scope.fdeposit = $localStorage.fdeposit;
    if($localStorage.cashed == undefined){
      $localStorage.cashed = [];
    }
    if($scope.fdeposit == undefined){
      $scope.fdeposit = [];
    }
    getRupee().then(function(data){
      $scope.cdr = data.data.rates.INR;
      $scope.currentrate = $scope.cdr;
    });

    $scope.setDeposit = function(){
      var deposit = {};
      deposit.date = $scope.date;
      deposit.netamount = $scope.prin;
      deposit.actualamount = $scope.prin - $scope.tus;
      deposit.int = $scope.int;
      deposit.years = $scope.years;
      deposit.thresh = $scope.thresh;
      deposit.cdr = $scope.cdr;
      var result = $scope.limitInr($scope.prin - $scope.tus, $scope.cdr, $scope.int, $scope.years, $scope.prin, $scope.thresh);
      //console.log(result.amr);
      //The total American earning potential is interest on net amount + transfer charges both ways.
      deposit.amrpot = result.amr + $scope.tus + $scope.tin;
      deposit.limitinr = result.inr / deposit.amrpot;
      //console.log(deposit);
      $scope.fdeposit.push(deposit);
      $localStorage.fdeposit = $scope.fdeposit;
    };
    $scope.deleteEntry = function(index){
      $scope.fdeposit.splice(index, 1);
      $localStorage.fdeposit = $scope.fdeposit;
    };
    $scope.enCash = function(index){
      var encashdep = $scope.fdeposit.splice(index, 1)[0];
      encashdep.rateofcashinr = $scope.currentrate;
      encashdep.encashdate = new Date();
      $localStorage.cashed.push(encashdep);
      $localStorage.fdeposit = $scope.fdeposit;
    }
    $scope.limitInr = function(actamt, cdr, int, years, netamt, thresh){
      //Total amount in Indian Bank account after 2 years on that interest
       var indianamount = actamt * cdr * Math.pow((1 + int * 0.01), years);
       //Total amount I could have earned in the US on US interest + transfer charge from India
       var americanamount = (netamt * Math.pow((1 + thresh * 0.01), years));
       //The currency rate at which I will break even if I had not sent my money to India.
       return {"inr": indianamount, "amr": americanamount};
    };
  })
  .controller('CashCtrl', function($scope, $localStorage, getRupee){
    $scope.cashed = $localStorage.cashed;
    console.log($scope.cashed);
  })
