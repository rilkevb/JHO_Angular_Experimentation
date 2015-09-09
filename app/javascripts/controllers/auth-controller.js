angular.module("JHO")
    .controller('AuthController', ['user', 'auth', '$window', '$location',
        function AuthController(user, auth, $window, $location) {
            var self = this;
            console.log("in AuthController")

            function handleRequest(res) {
                var token = res.data ? res.data.token : null;
                if (token) {
                    console.log('JWT:', token);
                } else {
                    console.log("server error / bad request: ", res);
                }
                self.message = res.data;
            }

            self.toBoard = function($location) {
                $location.path('/board').replace();
            }

            self.login = function(returningUser) {
                user.login(returningUser)
                    .then(handleRequest, handleRequest)
            }
            self.register = function(newUser) {
                user.register(newUser)
                    .then(handleRequest, handleRequest)
            }

            self.logout = function() {
                auth.logout && auth.logout()
            }
            self.isAuthed = function() {
                return auth.isAuthed ? auth.isAuthed() : false
            }
        }
    ])