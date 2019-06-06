var app = angular.module('angular', []);
app.controller('controller', ['$scope', '$timeout', function ($scope, $timeout) {

    /* varible de estado del gif de loading */
    $scope.estadoLoad = false

    /* Funciona de carga del gif */
    $scope.onLoad = function () {
        $scope.estadoLoad = true
        $("#buttonLogin").css({ "padding": 0 })

        /* Volver a dejar como estaba */
        $timeout(function () {
            $("#buttonLogin").css({ "padding": "" });
            $(".btn-success:focus").blur()
            $scope.estadoLoad = false
        }, 211111500);

    }

}])

