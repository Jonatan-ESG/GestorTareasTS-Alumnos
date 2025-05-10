/*titulo, descripcion, estado de completado, estado*/

enum PrioridadTarea {
    ALTA = '🔴',
    MEDIA = '🟡',
    BAJA = '🔵',
}

interface Tarea {
    id: number
    titulo: string
    descripcion: string
    completada: boolean
    estado: string
    prioridad: PrioridadTarea
}

class GestorTareas {
    almacenTareas: Tarea[]
    nombre: string
    constructor(nombre?: string) {
        this.almacenTareas = []
        this.nombre = nombre || ''
    }

    agregarTarea(titulo: string, descripcion: string, prioridadTarea: PrioridadTarea): void {
        const nuevaTarea: Tarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            completada: false,
            estado: 'Pendiente',
            prioridad: prioridadTarea,
        }
        this.almacenTareas.push(nuevaTarea)
        console.log(`La tarea ${nuevaTarea.titulo} fue agregada`)
    }

    completarTarea(titulo: string) {
        const indiceTarea = this.almacenTareas.findIndex((tarea: Tarea) => tarea.titulo == titulo)
        if (indiceTarea == -1) return console.log('No fue posible encontrar la tarea indicada')
        const tarea = this.almacenTareas[indiceTarea]
        tarea.completada = true
        tarea.estado = 'Completada'
        this.almacenTareas[indiceTarea] = tarea

        console.log(`La tarea ${tarea.titulo} fue completada`)
    }

    eliminarTarea(titulo: string) {
        const nuevoArregloTareas: Tarea[] = []
        this.almacenTareas.forEach((tarea: Tarea) => {
            if (tarea.titulo != titulo) nuevoArregloTareas.push(tarea)
        })

        this.almacenTareas = nuevoArregloTareas
        console.log(`La tarea ${titulo} fue eliminada`)
    }

    contarTareasPendientes(): number {
        let tareasPendientes = 0
        this.almacenTareas.forEach((tarea: Tarea) => {
            if (tarea.estado == 'Pendiente') {
                tareasPendientes++
            }
        })
        return tareasPendientes
    }

    listarTareas() {
        if (this.almacenTareas.length === 0) {
            console.log('No hay tareas registradas.')
        } else {
            console.log('Listado de tareas:')
            for (let i = 0; i < this.almacenTareas.length; i++) {
                const tarea = this.almacenTareas[i]
                console.log(`Título: ${tarea.titulo} Descripción: ${tarea.descripcion} | ${tarea.estado} | ${tarea.prioridad}`)
            }
        }
    }
}

const store = new GestorTareas()
store.agregarTarea('Limpiar el balcon', 'Limpiar el balcon bien', PrioridadTarea.BAJA)
store.agregarTarea('Comprar víveres', 'Ir al supermercado y comprar frutas, verduras y leche', PrioridadTarea.BAJA)
store.agregarTarea('Llamar al plomero', 'Agendar cita para revisar la fuga en el baño', PrioridadTarea.BAJA)
store.agregarTarea('Estudiar para el examen', 'Revisar los capítulos 4 al 6 del libro de historia', PrioridadTarea.MEDIA)
store.agregarTarea('Sacar la basura', 'Sacar la basura reciclable y orgánica antes de las 8 PM', PrioridadTarea.BAJA)
store.agregarTarea('Pagar la luz', 'Entrar al sitio web y hacer el pago antes del viernes', PrioridadTarea.ALTA)
store.agregarTarea('Regar las plantas', 'Regar las plantas del balcón y del interior del departamento', PrioridadTarea.MEDIA)

store.completarTarea('Limpiar el balcon')
store.completarTarea('Sacar la basura')
store.completarTarea('Regar las plantas')

store.eliminarTarea('Comprar víveres')
store.listarTareas()
const tareasPendientes = store.contarTareasPendientes()
console.log(tareasPendientes)

const nuevogestor = new GestorTareas('Tareas de la oficina')
