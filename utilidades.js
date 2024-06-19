const valida = (e) => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    validaRadio('pdominante')
    e.preventDefault()
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}
const validaRadio =(name) =>{
    const radio = document.querySelector('input[name="'+ name +'"]:checked')
    const div = document.getElementById('e-'+name)
    const all = document.querySelectorAll('input[name="'+ name +'"]')
    if(!radio){
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item => {
            item.classList.add('is-invalid')
        })
    }
    else{
        div.innerHTML = ''
        all.forEach(item => {
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid') 
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') 
        div.innerHTML = ''
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        if (id == 'edad'){
            if (input.value < 18) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">No puede ser menor de edad para poder postular a este equipo</span>';
            }
            if (input.value >= 35) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No puedes ingresar a este equipo con una edad mayor a 35 años</span>'
            }
        }
        if (id == 'fono') {
            if (input.value.length != 9) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Debe tener 9 dígitos </span>'
            }
        }
        if (id == 'posicion'){
            if (!validarPosicion(input.value.trim())){
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Esa no es una posicion dentro del campo de juego</span>'
            }
        }
        if (id == 'email'){
            if (!validarEmail(input.value.trim())){
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Ese no es el formato correcto</span>'
            }
        }
        if (id == 'nacionalidad'){
            if (!validarPais(input.value.trim())){
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Ese pais no existe</span>'
            }
        }
    }
}



const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true
    return false 
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    if (!formato.test(email))
        return false 
    return true
}


function validarPosicion(posicion) {
    const posicionesValidas = new Set([
        "portero",
        "defensa",
        "lateral derecho",
        "lateral izquierdo",
        "defensa central",
        "líbero",
        "centrocampista",
        "mediocentro defensivo",
        "mediocentro",
        "mediocentro ofensivo",
        "extremo derecho",
        "extremo izquierdo",
        "delantero",
        "delantero centro",
        "segundo delantero"
    ]);

    return posicionesValidas.has(posicion.toLowerCase());
}



function validarPais(pais) {
    const paisValido = new Set([
        "chile",
        "paraguay",
        "brasil",
        "argentina",
        "venezuela",
        "colombia",
        "ecuador",
        "mexico",
        "puerto Rico",
        "uruguay",
        "peru",
        "bolivia",
        "honduras",
        "nicaragua",
        "salvador",
        "guatemala",
        "republica dominicana",
        "panama",
        "costa Rica",
        "honduras"
    ]);

    return paisValido.has(pais.toLowerCase());
}


