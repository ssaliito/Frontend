// metodo listar todos los usuarios

$(document).ready(function () {

    const url = 'http://localhost:4000/materias/viewMateria'
    $.get(
        url,
        function (data) {

            if (data.result.length > 0) {

                const materias = data.result;
                let content = '';

                materias.forEach(materia => {
                    content += `
                <div class="card">
                    <div class="card-content">
                        <h3>Nombre: `+ materia.nombre + `</h3>
                        <p>Horas: `+ materia.horas	 + `</p>
                        <p>Docentes: `+ materia.docente + `</p>
                        <p>Día: `+ materia.dia + `</p>
                        <p>id: `+ materia.id + `</p>
                    </div>
                    <div class="card-actions">
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn" data-id="`+ materia.id + `">Eliminar</button>
                    </div>
                </div>`;
                });

                // Insertar los nuevos usuarios en el contenedor content

                $('#main-content .content').append(content);
                $('body').append('<script src="/asset/js/script.js"></script>')

                // Mensaje sweet alet

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Materias consultadas correctamente"
                });
            }else{
                $('body').append('<script src="/asset/js/script.js"></script>')
            };

        });
});


//Metodo que envia la información para la edición
$('#formEdit').on('submit', function (event) {
    event.preventDefault();

    const formData = {
        id: $("#editId").val(),
        nombre: $("#editNombre").val(),
        horas: $("#editHoras").val(),
        docente: $("#editDocente").val(),
        dia: $("#editDia").val()
    }

    $.ajax({
        url: 'http://localhost:4000/materias/updateMateria',
        type: 'PUT',
        data: formData,
        success: function (data) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: data.result.message
            });

            setTimeout(function () {
                window.location.href = 'http://localhost:5500/materias.html';
            }, 2000)

        }
    });
});

//Metodo que envia la información para la eliminación
$(document).on('click', '.delete-btn', function (event) {
    event.preventDefault();

    const formData = {
        id: $(this).data('id')
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: "¿Quiere eliminar esta materia?",
        text: "¨Despues de aceptar, no podras recuperar la información.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                url: 'http://localhost:4000/materias/deleteMateria',
                type: 'DELETE',
                data: formData,
                success: function (data) {
                    swalWithBootstrapButtons.fire({
                        title: "Eliminado",
                        text: data.result.messagge,
                        icon: "success"
                    });

                    setTimeout(function () {
                        window.location.href = 'http://localhost:5500/materias.html';
                    }, 2000)
    
                }
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelar",
                text: "El registro no ha sido afectado.",
                icon: "error"
            });
        }

    });
});

//Metodo para crear usuario
$('#formCreate').on('submit', function(event){
    event.preventDefault();

    const formData={
        nombre: $('input[name="nombre"]').val(), 
        horas: $('input[name="horas"]').val(), 
        docente: $('input[name="docente"]').val(), 
        dia: $('input[name="dia"]').val(),
    }

    console.log(formData)

    $.post('http://localhost:4000/materias/createMateria', formData, function(data){

        // Tiempo de espera para redireccionar
        setTimeout(function () {
            window.location.href='http://localhost:5500/materias.html';
        }, 2000)

        //  SweetAlrt2

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: data.result.message
          });
    })
});

function checkAuth(){
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [nombre, value] = cookie.split('=').map(c=> c.trim());
        acc[nombre]= value;
        return acc;
    },{})

    if(cookies.isLoggedIn != 'true'){
        window.location
    }else{
        $("#name-log").text(cookies.nombre);
    }
}

checkAuth();