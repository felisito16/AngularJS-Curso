var app = angular.module('myApp', ['ngStorage']);
app.controller('controller', function ($scope, $localStorage, $filter) {

    $scope.listaTareasLocal = [];

    /* Comprobamos si existen datos en el localStorage, 
    si no existen declaramos la lista en el localStorage,
    inpendientemente de esto, despues definimos que la lista
    de tareas del $scope se asociara siempre a la lista
    de tareas del $localStorage. */
    if (!$localStorage.listaTareas) {
        $localStorage.listaTareas = [];
    }
    $scope.listaTareasLocal = $localStorage.listaTareas;

    /* Variable que guarda la lista de tareas que 
    visualizaremos en la tabla */
    /* $localStorage.listaTareas = []; */

    /* Por defecto, la vista de edicion
    inhabilitada y boton de Añadir habilitado*/
    $scope.noEditable = true
    $scope.apagarBoton = false

    $scope.Add = function () {
        /* Activamos los inputs y marcamos que el modo
        de visualizacion sera del modo "crear" */
        $scope.noEditable = false
        $scope.modo = "crear";
    }

    $scope.Delete = function (index) {
        /* Hacemos un slice con el index
        actual seleccionado de la tarea tanto
        en el scope como en el localStorage */
        $localStorage.listaTareas.splice(index, 1)
        /* $scope.listaTareasLocal.splice(index, 1) */
    }

    $scope.Cancelar = function () {
        // Volvemos a deshabilitarlo
        $scope.noEditable = true
        /* Borramos los campos y habilitamos 
        el boton de nuevo */
        $scope.valueAutor = ""
        $scope.valueDesc = ""
        $scope.valueFecha = ""
        $scope.valueCheck = ""
        $("label:eq(2)").text("Fecha de la tarea")
        $("td a").show()
        $scope.apagarBoton = false
    }
    $scope.Editar = function (index) {
        /* Activamos los inputs de edicion, seleccionamos
        el modo de editar y deshabilitamos el boton de Añadir
        */
        $scope.noEditable = false;
        $scope.modo = "editar";
        $scope.apagarBoton = true

        // Guardamos la fila a la que hacemos referencia
        // al editar
        $scope.indiceEditar = index
        var i = $scope.indiceEditar
        // Pasamos lo valores actuales a la vista de 
        // edicion
        $scope.valueAutor = $scope.listaTareasLocal[i].autor
        $scope.valueDesc = $scope.listaTareasLocal[i].desc
        //$scope.valueFecha = $scope.listaTareasLocal[i].fecha
        $("label:eq(2)").text("Fecha original: "
            + $scope.listaTareasLocal[i].fecha)
        $scope.valueCheck = $scope.listaTareasLocal[i].check

        $("td a").hide()
    }
    $scope.save = function () {
        var error = false;
        $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");

        // Dependiendo de si entramos en la vista de edicion
        // en modo Editar o Crear nuvea tarea
        // El guardar funcionara de una manera u otra

        if ($scope.modo == "crear") {
            if ($scope.valueAutor == "" || $scope.valueAutor == undefined
                || $scope.valueDesc == "" || $scope.valueDesc == undefined
                || $scope.valueFecha == "" || $scope.valueFecha == undefined) {

                error = true
                alert("Faltan datos por rellenar")

            } else {
                console.log("UFF")
                // Creando nueva tarea

                /* Formateamos la fecha del input de edicion y la guardamos
                en otra variable a parte */
                $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");
                !$scope.valueCheck ? $scope.valueCheck = false : $scope.valueCheck = true

                /* Hacemos push en la variable de la lista de las tareas 
                en el localStorage */
                $localStorage.listaTareas.push({
                    "autor": $scope.valueAutor,
                    "desc": $scope.valueDesc,
                    "fecha": $scope.valueFechaGG,
                    "check": $scope.valueCheck
                })

                $("label:eq(2)").text("Fecha de la tarea")
            }

        } else {
            // Editando una tarea

            /* guardamos en "i" el indice de la tarea que estamos editando
             y volvemos a formatear la fecha nueva*/
            var i = $scope.indiceEditar
            console.log(i)
            $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");
            if ($scope.valueAutor == "" || $scope.valueAutor == undefined
                || $scope.valueDesc == "" || $scope.valueDesc == undefined) {

                error = true
                alert("Faltan datos por rellenar")

            } else {
                /* Asignamos los nuevos valores a la tarea de la lista de tareas del 
                localStorage que estamos editando  */
                $localStorage.listaTareas[i].autor = $scope.valueAutor
                $localStorage.listaTareas[i].desc = $scope.valueDesc
                if ($scope.valueFecha == undefined
                    || $scope.valueFechaGG == undefined
                    || $scope.valueFechaGG == ""
                    || $scope.valueFechaGG == null) {
                    // Any What else?
                    $localStorage.listaTareas[i].fecha = $localStorage.listaTareas[i].fecha
                } else {
                    $localStorage.listaTareas[i].fecha = $scope.valueFechaGG
                }
                $localStorage.listaTareas[i].check = $scope.valueCheck

                /* Redefinimos el valor de valueFechaGG para la proxima vez que
                editemos */
                $scope.valueFechaGG = undefined

                $("label:eq(2)").text("Fecha de la tarea")
            }
        }

        /* Volvemos a deshabilitar los inputs y los vaciamos, y
        volvemos a activar el boton de Añadir */
        if (error == false) {
            $scope.noEditable = true
            $scope.valueAutor = ""
            $scope.valueDesc = ""
            $scope.valueFecha = ""
            $scope.valueCheck = ""
            $("td a").show()
            $("label:eq(2)").text("Fecha de la tarea")
            $scope.apagarBoton = false
        }
    }


    $scope.setColorRow = function (index, classYes, classNo) {
        /* Si la tarea que esta mostrando la tabla, su campo check
        esta en true (Realizada) se mostrara en verde su fondo, sino
        en color rojo */
        if ($scope.listaTareasLocal[index].check == true) {
            return classYes
        } else if ($scope.listaTareasLocal[index].check == false) {
            return classNo
        } else {
            // Any what else?
        }
    }

});