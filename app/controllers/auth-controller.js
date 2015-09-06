angular.module("JHO", [])
.controller('AuthController', ['user', 'auth', function AuthController(user, auth) {
        var self = this;
        console.log("in AuthController")

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if (token) {
                console.log('JWT:', token);
            }
            self.message = res.data.message;
        }

        self.login = function() {
            user.login(self.username, self.password)
                .then(handleRequest, handleRequest)
        }
        self.register = function() {
            user.register(self.username, self.password)
                .then(handleRequest, handleRequest)
        }
        self.getQuote = function() {
            user.getQuote()
                .then(handleRequest, handleRequest)
        }
        self.logout = function() {
            auth.logout && auth.logout()
        }
        self.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }
    }])