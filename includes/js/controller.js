var controllers = {};
controllers.HomeController = function ($rootScope, $scope) {
    $rootScope.Resource.run('get','webservice/common',null).then(function(data) {
        $scope.home = data;
    })
}

controllers.CommonController = function ($rootScope, $scope) {
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 
        $rootScope.common_local = {
        }
        if(toState.templateUrl != fromState.templateUrl) {
        }
    })
    $scope.toggleLeft = function() {
	    $rootScope.$mdSidenav('left').toggle();
  	};
}

xtendify.controller(controllers);