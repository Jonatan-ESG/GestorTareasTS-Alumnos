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
}

const store = new GestorTareas()
store.agregarTarea('Limpiar el balcon', 'Limpiar el balcon bien')
