var xtendify = angular.module('ngXtendify', [
    'ui.router',
    'ngResource',
    'ngtimeago',
    'infinite-scroll',
    'ngSanitize',
    'gettext',
    'angularFileUpload',
    'ngMaterial',
    'ngMessages'
]);

xtendify.run(function ($templateCache, $http, $state, $rootScope, $stateParams, $timeout, gettextCatalog, Resource, Page, $location, $sce, $upload, $mdToast, $mdDialog, $mdSidenav) {

    // assigning providers to rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.Page = Page;
    $rootScope.Resource = Resource;
    $rootScope.gettextCatalog = gettextCatalog;
    $rootScope.$timeout = $timeout;
    $rootScope.$location = $location;
    $rootScope.$sce = $sce;
    $rootScope.$upload = $upload;
    $rootScope.$mdToast = $mdToast;
    $rootScope.$mdDialog = $mdDialog;
    $rootScope.$mdSidenav = $mdSidenav;

    $rootScope.gettextCatalog.currentLanguage = 'en';
    $rootScope.gettextCatalog.debug = true; //todo change for production

    $rootScope.Resource.run('get','webservice/common',null).then(function(data) {
        $rootScope.common = data;
    })

    //prefetch all the templates here.
    $timeout(function () {
        $http.get(template('home'), {cache: $templateCache});
    }, 1000);

    $rootScope.currentTemplate = function () {
        return $rootScope.$state.current.templateUrl;
    }

    $rootScope.checkTemplate = function (view) {
        return $rootScope.$state.current.templateUrl == template(view) ? true : false;
    }

    $rootScope.currentState = function () {
        return $rootScope.$state.current.name;
    }
    
    $rootScope.checkState = function (state) {
        return $rootScope.$state.current.name == state ? true : false;
    }

    $rootScope.timeout = function() {
        $rootScope.$timeout(function () {
            // initAll();
        }, 100);
    }

    $rootScope.wrapper = function (response) {
       // console.log(response);
        var error = false;
        if (typeof response.notification != 'undefined' && response.notification) {
            for (index = 0; index < response.notification.length; ++index) {
                $rootScope.toast(response.notification[index].text, response.notification[index].sticky);
            }
        }
        if (typeof response.exception != 'undefined' && response.exception) {
            $rootScope.exception = response.exception;
            error = true;
        }
        if (typeof response.reload != 'undefined' && response.reload) {
            window.location.reload();
            error = true;
        }
        if (typeof response.redirectTo != 'undefined' && response.redirectTo) {
            window.location.href = response.redirectTo;
            error = true;
        }
        if(typeof response.transitionTo != 'undefined' && response.transitionTo) {
            params = typeof response.transitionTo.params == 'undefined' ? null : response.transitionTo.params;
            setTimeout( function() {
                $rootScope.transitionTo(response.transitionTo.state,params); 
            }, 1000);
        }
        if (typeof response.login != 'undefined' && response.login) {
            $rootScope.toast($rootScope.gettextCatalog.getString('You need to be logged in.'));
            error = true;
        }
        if (typeof response.alert != 'undefined' && response.alert) {
            alert(response.alert);
        }
        if (typeof response.error != 'undefined' && response.error) {
           $rootScope.toast($rootScope.gettextCatalog.getString('Invalid request'));
            error = true;
        }
        if (typeof response.pageTitle != 'undefined' && response.pageTitle) {
            $rootScope.Page.setTitle(response.pageTitle);
        }
        if (typeof response.description != 'undefined' && response.description) {
            $rootScope.Page.setDescription(response.description);
        }
        if (typeof response.version != 'undefined' && response.version && parseFloat(version) < parseFloat(response.version)) {
            //todo don't do this if post request
            $("a").click(function() { return false; });
            $rootScope.toast($rootScope.gettextCatalog.getString('A new version of Xtendify is available. Reloading page in 5 seconds.'));
            setTimeout(function(){ window.location.reload(1); }, 5000);
        }
        if (!error && typeof response.data != 'undefined' && response.data) {
            return response.data;
        } else {
            return false;
        }
    }

    $rootScope.transitionTo = function (state, params) {
        $rootScope.$state.transitionTo(state, params, { location: true, inherit: true, relative: $rootScope.$state.$current, notify: true });
    }

    $rootScope.toast = function(text, sticky) {
        $rootScope.$mdToast.show(
            $rootScope.$mdToast.simple()
                .content(text)
                .hideDelay(typeof sticky == 'undefined' || !sticky ? 3000 : 0)
        );
    };
});

// angular.bootstrap(document, ["ngXtendify"]);