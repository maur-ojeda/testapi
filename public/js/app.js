var url = window.location.href;
var swLocation = '/twittor/sw.js';
var apiUrl = "api";

if (navigator.serviceWorker) {


    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register(swLocation);
}





// Referencias de jQuery

var titulo = $('#titulo');
var nuevoBtn = $('#nuevo-btn');
var salirBtn = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn = $('#post-btn');
var avatarSel = $('#seleccion');
var timeline = $('#timeline');

var modal = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns = $('.seleccion-avatar');
var txtMensaje = $('#txtMensaje');

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;

// =====  muestra usuario
function muestraUsuarioHtml(nombre, apellido) {
    $('#userName').html(nombre + ' ' + apellido);

    $('#userData').click(function() {
        document.location = '/paginados.html';
        //ir user data
    });
}

/*TODO: leer listado*/
function muestraFixedAssetsHTML(fixedAssets) {


    var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;


    $('#fixedAssetsProcess').append(content)




}

// ===== Codigo de la aplicaciÃ³n

function crearMensajeHTML(mensaje, personaje) {

    var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

}


// Globals
function logIn(ingreso) {

    if (ingreso) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');

        titulo.text('Seleccione Personaje');

    }

}

// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {
    logIn(false);
});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({
        marginTop: '-=1000px',
        opacity: 1
    }, 200);

});

// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
    if (!modal.hasClass('oculto')) {
        modal.animate({
            marginTop: '+=1000px',
            opacity: 0
        }, 200, function() {
            modal.addClass('oculto');
            txtMensaje.val('');
        });
    }
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if (mensaje.length === 0) {
        cancelarBtn.click();
        return;
    }

    var data = {
        mensaje: mensaje,
        user: usuario
    }

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log('app.js', res))
        .catch(err => console.log('app.js error:', err));

    crearMensajeHTML(mensaje, usuario);

});



// obtener mensajes del servidor
function getMensajes() {

    fetch(apiUrl)
        .then(res => res.json())
        .then(posts => {
            console.log(posts);
            posts.forEach(post => {
                crearMensajeHTML(post.mensaje, post.user);
            });
        })


}
getMensajes();



//obtener usuario
function getUser() {
    fetch('api/user')
        .then(res => res.json())
        .then(users => {
            console.log(users);
            users.forEach(user => {
                muestraUsuarioHtml(user.name, user.last_name);
            });
        })

}
getUser();




// obtener fixedAsets del servidor
function getFixedAssets() {

    fetch('api/fixedassets')
        .then(res => res.json())
        .then(fixedAssets => {
            console.log(fixedAssets);
            fixedAssets.forEach(fixedAsset => {
                muestraFixedAssetsHTML(
                    fixedAsset._id,
                    fixedAsset.acreedor,
                    fixedAsset.agnosVidaUtil,
                    fixedAsset.area,
                    fixedAsset.centro,
                    fixedAsset.centroCosto,
                    fixedAsset.claseActivoFijo,
                    fixedAsset.codigo,
                    fixedAsset.codigoRfid,
                    fixedAsset.condicion,
                    fixedAsset.creadoPor,
                    fixedAsset.cuenta,
                    fixedAsset.denominacion,
                    fixedAsset.edificio,
                    fixedAsset.especie,
                    fixedAsset.fabricante,
                    fixedAsset.fechaCreacion,
                    fixedAsset.gestionHistorica,
                    fixedAsset.listaInventario,
                    fixedAsset.piso,
                    fixedAsset.sala,
                    fixedAsset.sociedad

                );
            });
        })


}
getFixedAssets();



// Detectar cambios de conexión
function isOnline() {

    if (navigator.onLine) {
        // tenemos conexión
        // console.log('online');
        $.mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });


    } else {
        // No tenemos conexión
        $.mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }

}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();




function CallWebAPI() {
    var userName = "mobile_user";
    var passWord = "testing";

    function authenticateUser(user, password) {
        var token = user + ":" + password;
        // Should i be encoding this value????? does it matter???
        // Base64 Encoding -> btoa
        var hash = btoa(token);
        return "Basic " + hash;
    }


    // New XMLHTTPRequest
    var request = new XMLHttpRequest();
    request.open("POST", "https://afsaval.agenciasur.cl/webservice/rest/ping", false);
    request.setRequestHeader("Authorization", authenticateUser(userName, passWord));
    request.send();
    // view request status
    alert(request.status);
    response.innerHTML = request.responseText;





}