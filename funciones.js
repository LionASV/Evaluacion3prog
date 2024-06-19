import { getData, getDocumento, remove, save, update, checkEmailExists } from './firestore.js'

let id = 0

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault()

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    const email = document.getElementById('email').value.trim();

    if (document.querySelectorAll('.is-invalid').length == 0) {
            const piernaDominante = document.querySelector('input[name="pdominante"]:checked').value;

            const equ = {
                run: document.getElementById('run').value,
                nom: document.getElementById('nombre').value,
                ape: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                fono: document.getElementById('fono').value,
                nacion: document.getElementById('nacionalidad').value,
                posicion: document.getElementById('posicion').value,
                camiseta: document.getElementById('ncamiseta').value,
                pierna: piernaDominante,
                email: email,
                msj: document.getElementById('msj').value
            }

            if (id == 0) {
                if (await checkEmailExists(email)) {
                    Swal.fire('Error', 'El correo electrónico ya está registrado', 'error');
                    document.getElementById('email').classList.add('is-invalid');
                }
                else {save(equ);
                Swal.fire('Guardado', '', 'success');
                }
            } else {
                update(id, equ);
            }
            id = 0;
            limpiar();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''
        datos.forEach((equ) => {
            const item = equ.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.edad}</td>
                <td>${item.fono}</td>
                <td>${item.nacion}</td>
                <td>${item.posicion}</td>
                <td>${item.camiseta}</td>
                <td>${item.pierna}</td>
                <td>${item.email}</td>
                <td>${item.msj}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${equ.id}">Editar</button>
                    <button class="btn btn-danger" id="${equ.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        limpiar(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await getDocumento(btn.id)
                const equ = doc.data()

                document.getElementById('run').value = equ.run
                document.getElementById('nombre').value = equ.nom
                document.getElementById('apellido').value = equ.ape
                document.getElementById('edad').value = equ.edad
                document.getElementById('fono').value = equ.fono
                document.getElementById('nacionalidad').value = equ.nacion
                document.getElementById('posicion').value = equ.posicion
                document.getElementById('ncamiseta').value = equ.camiseta
                document.getElementById('email').value = equ.email
                document.getElementById('msj').value = equ.msj

                if (equ.pierna === 'Derecha') {
                    document.getElementById('pierna_derecha').checked = true;
                } else if (equ.pierna === 'izquierda') {
                    document.getElementById('pierna_izquierda').checked = true;
                }

                id = doc.id

                document.getElementById('run').readOnly = true
                document.getElementById('btnSave').value = 'Editar'
            })
        })
    })
})
