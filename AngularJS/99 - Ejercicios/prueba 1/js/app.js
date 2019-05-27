var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {

    $scope.myResults = [{
        "name": "John",
        "status": "Approved",
        "Notes": "None"
    },
    {
        "name": "Jamie",
        "status": "Approved",
        "Notes": "Requires call"
    },
    {
        "name": "Jill",
        "status": "Denied",
        "Notes": "None"
    }];

    var aprobados = 0
    angular.forEach($scope.myResults, function (value, key) {

        if (value.status == "Approved") {
            aprobados = aprobados + 1;
        }
    })
    $scope.approveds = aprobados

    $scope.spanini = $scope.myResults.length;

    $scope.addUser = function () {
        $scope.approveds = 0
        $scope.myResults.push({
            "name": $scope.nameUsuario,
            "status": $scope.statusUsuario,
            "Notes": $scope.notesUsuario
        })
        $scope.spanini = $scope.myResults.length;

        angular.forEach($scope.myResults, function (value, key) {
            if (value.status == "Approved") {
                aprobados = aprobados + 1;
            }
        })
        $scope.approveds = aprobados

        $scope.nameUsuario = ""
        $scope.statusUsuario = ""
        $scope.notesUsuario = ""

    }

    $scope.DeleteUser = function (index) {
        $scope.approveds = 0
        $scope.myResults.splice(index, 1)
        $scope.spanini = $scope.myResults.length;
        angular.forEach($scope.myResults, function (value, key) {
            if (value.status == "Approved") {
                aprobados = aprobados + 1;
            }
        })
        $scope.approveds = aprobados
    }
});