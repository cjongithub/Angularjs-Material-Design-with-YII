function config($stateProvider, $urlRouterProvider, $locationProvider) {
    var id = '/{id:[0-9]+\-?.*}';

    $stateProvider
            .state('common', {
                abstract: true,
                url: '',
                views: {
                    'header': {
                        templateUrl: template('header'),
                    },
                    'content': {
                        templateUrl: template('content'),
                    },
                    'footer': {
                        templateUrl: template('footer'),
                    }
                }
            })
            .state('home', {
                url: '',
                parent: 'common',
                templateUrl: template('home'),
                controller: 'HomeController'
            });
    
    $urlRouterProvider.rule(function($injector, $location) {
        //todo deal with http://localhost/xtendify/product/111 and http://localhost/xtendify and http://localhost/xtendify/
        // console.log($location);
        var path = $location.path();

        //deal with uppercase letters in url
        if (path != path.toLowerCase()) {
           path = path.toLowerCase();
        }

        //deal with trailing slash(es) in url
        if (path[path.length-1] == '/') {
            for(var i in path) {
                if (path[path.length-1] == '/') { //remove multiple occurrences
                    var n = path.lastIndexOf('/');
                    path = path.slice(0, n) + path.slice(n).replace('/', '');
                }
            }
        }

        if(path != $location.path()) {
            $location.replace().path(path);
        }
    });

}

xtendify.config(config);