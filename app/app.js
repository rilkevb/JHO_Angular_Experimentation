angular
    .module("JHO", ['ui.router'])

.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {

            // Add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within the app.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its descendants is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on("$stateChangeError", console.log.bind(console));

            $state.transitionTo('welcome');
        }
    ]
)

.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
    function($urlRouterProvider, $stateProvider, $httpProvider) {

        $httpProvider.defaults.headers.common({
            "Accept": "application/json, text/plain, * / *",
            "Content-Type": "application/json"
        });

        $stateProvider
        // Welcome state
        .state('welcome', {
            url: '/',
            templateUrl: "/templates/welcome.html",
            controller: 'welcomeCtrl',
            data {
                requireLogin: false
            }
        })

        .state('app', {
            abstract: true,
            // ...
            data: {
                requireLogin: true // this property will apply to all children of 'app'
            }
        })
            .state('app.dashboard', {
                // child state of `app`
                // requireLogin === true
            })

        // .state('about', {
        //     url: '/about',
        //     templateUrl: '/templates/about.html',
        //     controller: 'aboutCtrl'
        // })

        // .state('contact', {
        //     url: '/about',
        //     templateUrl: '/templates/contact.html',
        //     controller: 'contactCtrl'
        // })

        //         // Register state
        //         .state('register', {
        //             url: '/register',
        //             templateUrl: "/register.html",
        //             controller: function($scope) {
        //                 $scope.pageTitle = "Register New User";
        //             }
        //         })
        $urlRouterProvider.otherwise('/');
    }
])

// .config([
//     // These strings are annotations of dependencies being injected
//     // This is for properly tracking dependencies in minified code
//     '$urlRouterProvider',
//     '$stateProvider',
//     '$httpProvider',
//     function($urlRouterProvider, $stateProvider, $httpProvider) {
//         // $httpProvider.defaults.headers.common({
//         //     "Accept": "application/json, text/plain, * / *",
//         //     "Content-Type": "application/json"
//         // });

//         // If client doesn't hit an existing route, go to '/'
//         $urlRouterProvider.otherwise('/');
//         // $urlRouterProvider.when('/foo', {
//         //     redirectTo: '/'
//         // });

//         // States are comprised of a state name and a configuration object
//         // Common config options include:
//         // url => the url of the state
//         // template || templateUrl || templateProvider => the HTML for that state
//         // controller => define values for {{ expressions }} in HTML
//         // ===> Can also reference an already defined controller
//         // controllerAs => specify alias for controller, e.g., 'ItemController as item'
//         $stateProvider

//         // Welcome state
//         .state('welcome', {
//             url: '/',
//             templateUrl: "/templates/welcome.html",
//             controller: 'WelcomeController',
//             controllerAs: 'welcomeCtrl'
//         })

//         // Register state
//         .state('register', {
//             url: '/register',
//             templateUrl: "/register.html",
//             controller: function($scope) {
//                 $scope.pageTitle = "Register New User";
//             }
//         })

//         // Login state

//     }
// ])