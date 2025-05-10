/*titulo, descripcion, estado de completado, estado*/

interface Tarea {
    id: number
    titulo: string
    descripcion: string
    completada: boolean
    estado: string
}

class GestorTareas {
    almacenTareas: Tarea[]
    nombre: string
    constructor(nombre?: string) {
        this.almacenTareas = []
        this.nombre = nombre || ''
    }

    agregarTarea(titulo: string, descripcion: string): void {
        const nuevaTarea: Tarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            completada: false,
            estado: 'Pendiente',
        }
        this.almacenTareas.push(nuevaTarea)
    }

    completarTarea(titulo: string) {
        const indiceTarea = this.almacenTareas.findIndex((tarea: Tarea) => tarea.titulo == titulo)
        if (indiceTarea == -1) return console.log('No fue posible encontrar la tarea indicada')
        const tarea = this.almacenTareas[indiceTarea]
        tarea.completada = true
        tarea.estado = 'Completada'
        this.almacenTareas[indiceTarea] = tarea
    }

    eliminarTarea(titulo: string) {
        const nuevoArregloTareas: Tarea[] = []
        this.almacenTareas.forEach((tarea: Tarea) => {
            if (tarea.titulo != titulo) nuevoArregloTareas.push(tarea)
        })

        this.almacenTareas = nuevoArregloTareas
    }

    listarTareas() {
        if (this.almacenTareas.length === 0) {
            console.log('No hay tareas registradas.')
        } else {
            console.log('Listado de tareas pendientes:')
            for (let i = 0; i < this.almacenTareas.length; i++) {
                const tarea = this.almacenTareas[i]
                console.log(`Título: ${tarea.titulo}`)
                console.log(`Descripción: ${tarea.descripcion}`)
            }
        }
    }
}

const store = new GestorTareas()
store.agregarTarea('Limpiar el balcon', 'Limpiar el balcon bien')
store.completarTarea('Limpia el balcon')
console.log(store.almacenTareas)

const nuevogestor = new GestorTareas('Tareas de la oficina')
