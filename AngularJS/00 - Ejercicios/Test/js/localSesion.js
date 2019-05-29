var app = angular.module('myApp', ['ngStorage']);
app.controller('controller', function ($scope, $localStorage, $sessionStorage) {

    $scope.localName = $localStorage.name
    $scope.localValue = $localStorage.value
    $scope.sessionName = $sessionStorage.name
    $scope.sessionValue = $sessionStorage.value

    $scope.guardar = function () {

        // Guardamos en localStorage y en 
        // sessionStorage las variables de
        // los inputs.
        $localStorage.name = $scope.inputName
        $localStorage.value = $scope.inputValue
        $sessionStorage.name = $scope.inputName
        $sessionStorage.value = $scope.inputValue

        // Y aqui los mostramos en la lista
        // ul
        $scope.localName = $localStorage.name
        $scope.localValue = $localStorage.value
        $scope.sessionName = $sessionStorage.name
        $scope.sessionValue = $sessionStorage.value
    }

    $scope.reset = function () {
        $localStorage.name = ""
        $localStorage.value = ""
        $sessionStorage.name = ""
        $sessionStorage.value = ""
        $scope.inputName = ""
        $scope.inputValue = ""
        $scope.localName = ""
        $scope.localValue = ""
        $scope.sessionName = ""
        $scope.sessionValue = ""
    }

})
