$('#formRegister').on('submit', function(event){
  event.preventDefault();

  const formData={
      nombre: $('input[name="nombre"]').val(), 
      apellido: $('input[name="apellido"]').val(), 
      email: $('input[name="email"]').val(), 
      contrasena: $('input[name="contrasena"]').val(),
      documento: $('input[name="documento"]').val(),
      rol: $('select[name="rol"]').val(),  
      estado: $('input[name="estado"]').val()
  }

  $.post('http://localhost:4000/auth/createUser', formData, function(data){

      // Limpiar formulario de registro
      $('#formRegister')[0].reset();

      // Tiempo de espera para redireccionar
      setTimeout(function () {
          window.location.href='http://localhost:5500/login.html';
      },3000)

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