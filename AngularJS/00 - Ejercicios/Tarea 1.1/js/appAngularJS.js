var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $filter) {

    /* Variable que guarda la lista de tareas que 
    visualizaremos en la tabla */
    $scope.listaTareas = [{
        "autor": "John",
        "desc": "Limpieza del cuarto de baño",
        "fecha": "28/05/2019",
        "check": false
    },
    {
        "autor": "Lucía",
        "desc": "Sacar a los perros a pasear",
        "fecha": "26/05/2019",
        "check": true
    }];

    $scope.inputsEdicion = {
        "valueAutor": $scope.valueAutor,
        "valueDesc": $scope.valueDesc,
        "valueFecha": $scope.valueFecha,
        "valueCheck": $scope.valueCheck
    };

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
        actual seleccionado de la tarea */
        $scope.listaTareas.splice(index, 1)
    }

    $scope.Cancelar = function () {
        // Volvemos a deshabilitarlo
        $scope.noEditable = true
        /* Borramos los campos y habilitamos 
        el boton de nuevo */

        $scope.setValorInputs()
        $scope.deleteValorInputs()

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
        $scope.valueAutor = $scope.listaTareas[i].autor
        $scope.valueDesc = $scope.listaTareas[i].desc
        //$scope.valueFecha = $scope.listaTareas[i].fecha
        $("label:eq(2)").text("Fecha original: " + $scope.listaTareas[i].fecha)
        $scope.valueCheck = $scope.listaTareas[i].check

        $("td a").hide()
    }
    $scope.Save = function () {

        // Dependiendo de si entramos en la vista de edicion
        // en modo Editar o Crear nuvea tarea
        // El guardar funcionara de una manera u otra

        if ($scope.modo == "crear") {
            // Creando nueva tarea

            /* Formateamos la fecha del input de edicion y la guardamos
            en otra variable a parte */
            $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");
            /* Hacemos push en la variable de la lista de las tareas */
            $scope.listaTareas.push({
                "autor": $scope.valueAutor,
                "desc": $scope.valueDesc,
                "fecha": $scope.valueFechaGG,
                "check": $scope.valueCheck
            })
            $("label:eq(2)").text("Fecha de la tarea")

        } else {
            // Editando una tarea

            $scope.setValorInputs()
            /* guardamos en "i" el indice de la tarea que estamos editando
             y volvemos a formatear la fecha nueva*/
            var i = $scope.indiceEditar
            $scope.valueFechaGG = $filter('date')($scope.valueFecha, "dd/MM/yyyy");

            /* Asignamos los nuevos valores a la tarea que estamos editando */
            $scope.listaTareas[i].autor = $scope.valueAutor
            $scope.listaTareas[i].desc = $scope.valueDesc
            if ($scope.valueFecha == undefined
                || $scope.valueFechaGG == undefined
                || $scope.valueFechaGG == ""
                || $scope.valueFechaGG == null) {
                // Any What else?
            } else {
                $scope.listaTareas[i].fecha = $scope.valueFechaGG
            }
            $scope.listaTareas[i].check = $scope.valueCheck

            $scope.valueFechaGG = undefined
            $("label:eq(2)").text("Fecha de la tarea")
        }

        /* Volvemos a deshabilitar los inputs y los vaciamos, y
        volvemos a activar el boton de Añadir */

        $scope.noEditable = true
        $scope.deleteValorInputs()
        $("td a").show()
        $("label:eq(2)").text("Fecha de la tarea")
        $scope.apagarBoton = false

    }

    $scope.setColorRow = function (index, classYes, classNo) {
        /* Si la tarea que esta mostrando la tabla, su campo check
        esta en true (Realizada) se mostrara en verde su fondo, sino
        en color rojo */
        if ($scope.listaTareas[index].check == true) {
            return classYes
        } else {
            return classNo
        }
    }

    $scope.setValorInputs = function () {
        $scope.inputsEdicion = {
            "valueAutor": $scope.valueAutor,
            "valueDesc": $scope.valueDesc,
            "valueFecha": $scope.valueFecha,
            "valueCheck": $scope.valueCheck
        };
    }

    $scope.deleteValorInputs = function () {
        $scope.valueAutor = ""
        $scope.valueDesc = ""
        $scope.valueFecha = ""
        $scope.valueCheck = ""
    };

});