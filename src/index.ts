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
    constructor() {
        this.almacenTareas = []
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
}

const store = new GestorTareas()
store.agregarTarea('Limpiar el balcon', 'Limpiar el balcon bien')
store.completarTarea('Limpia el balcon')
console.log(store.almacenTareas)
