function validarletras(e){
	var teclado = (document.all) ? e.keycode : e.which;
  		var patron = /[a-zA-ZñÑ\s]/;
  		var tec = String.fromCharCode(teclado);
  		return patron.test(tec);

}
function validarnumeros(e){
	var teclado = (document.all) ? e.keycode : e.which;
  		var patron = /[0-9]/;
  		var tec = String.fromCharCode(teclado);
  		return patron.test(tec);

}
function validarletrasynumeros(e){
	var teclado = (document.all) ? e.keycode : e.which;
  		var patron = /[0-9a-zA-Z]/;
  		var tec = String.fromCharCode(teclado);
  		return patron.test(tec);

}
