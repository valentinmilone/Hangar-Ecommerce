window.addEventListener("load", function () {
    let formulario = document.querySelector("form.registro");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        let campoNombre = document.querySelector("input.full_name");

             if (campoNombre.value == "") {
            alert("Tienes que escribir un nombre y apellido");
        }   else if (campoNombre.value.length < 3) {
            alert("elcampo de nombre de tener mas de 3 caracteres")
        }

        let campoFecha = document.querySelector("input.email");

            if (campoFecha.value == "") {
            alert("Tienes que escribir un email");

        let campoContraseña = document.querySelector("input.password");

        }
            if (campoContraseña.value == "") {
            alert("Tienes que escribir un nombre y apellido");
        }

        let campofechaNacimiento = document.querySelector("input.fnac");

        if (campofechaNacimiento.value == "") {
        alert("Selecciona tu fecha de nacimiento");
    }
    })

})

