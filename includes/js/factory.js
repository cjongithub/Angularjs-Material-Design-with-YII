var factories = {};

factories.Page = function ($rootScope) {
    var title = 'Angularjs Material Design with YII';
    var description = '';
    return {
        title: function () {
            return title;
        },
        setTitle: function (newTitle) {
            title = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
        },
        description: function () {
            return description;
        },
        setDescription: function (newDescription) {
            description = newDescription.charAt(0).toUpperCase() + newDescription.slice(1);
        }
    };
}

factories.Resource = function ($rootScope, $resource, $q) {
    return {
        run : function(method, url, data) {
            var def = $q.defer();
            if(typeof(method) == 'undefined' || !method) {
                method = 'get';
            }
            if(method == 'get') {
                res = $resource(url).get;
            } else if(method == 'post') {
                res = $resource(url).save;
            } else {
                def.reject(false);
            }
            
            res(
                data,
                function(data){
                    // this callback will be called asynchronously
                    // when the response is available
                    response = $rootScope.wrapper(data);
                    // console.log(response);
                    if(response) {
                        def.resolve(response);
                    } else {
                        def.reject(false);
                    }
                    $rootScope.timeout();
                },
                function(reason){
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $rootScope.wrapper(reason.data);
                    def.reject(false);
                    $rootScope.timeout();
                }
            )
            return def.promise;
        }
    }
}

xtendify.factory(factories);