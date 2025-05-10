/*titulo, descripcion, estado de completado, estado*/

enum PrioridadTarea {
    ALTA = '🔴',
    MEDIA = '🟡',
    BAJA = '🔵',
}

enum EstadoTarea {
    PENDIENTE = 'Pendiente',
    EN_PROGRESO = 'En Progreso',
    FINALIZADA = 'Finalizada',
}

interface Tarea {
    id: number
    titulo: string
    descripcion: string
    completada: boolean
    estado: EstadoTarea
    prioridad: PrioridadTarea
}

interface UpdateTareaDTO {
    titulo?: string
    descripcion?: string
    completada?: boolean
    estado?: EstadoTarea
    prioridad?: PrioridadTarea
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
            estado: EstadoTarea.PENDIENTE,
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
        tarea.estado = EstadoTarea.FINALIZADA
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
            if (tarea.estado == EstadoTarea.PENDIENTE) {
                tareasPendientes++
            }
        })
        return tareasPendientes
    }

    actualizarTarea(titulo: string, nuevaTarea: UpdateTareaDTO) {
        const indiceTarea = this.almacenTareas.findIndex((tarea: Tarea) => tarea.titulo == titulo)
        if (indiceTarea == -1) return console.log('No fue posible encontrar la tarea indicada')
        const tarea = this.almacenTareas[indiceTarea]

        tarea.titulo = nuevaTarea.titulo || tarea.titulo
        tarea.descripcion = nuevaTarea.descripcion || tarea.descripcion
        tarea.completada = nuevaTarea.completada || tarea.completada
        if (tarea.estado == EstadoTarea.FINALIZADA) {
            console.log('No se puede modificar una tarea con estatus Finalizado')
        }
        if (tarea.estado == EstadoTarea.EN_PROGRESO && nuevaTarea.estado == EstadoTarea.PENDIENTE) {
            tarea.estado = nuevaTarea.estado
        } else if (tarea.estado == EstadoTarea.EN_PROGRESO && nuevaTarea.estado == EstadoTarea.FINALIZADA) {
            console.log('No se puede modificar una tarea a estatus Finalizado, para ellos por favor finalice la tarea')
        } else {
            tarea.estado = nuevaTarea.estado || tarea.estado
        }
        tarea.prioridad = nuevaTarea.prioridad || tarea.prioridad

        this.almacenTareas[indiceTarea] = tarea

        console.log(`La tarea ${tarea.titulo} fue actualizada`)
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
    buscarTarea(tituloBuscado: string): Tarea | undefined {
        for (let i = 0; i < this.almacenTareas.length; i++) {
            const tarea = this.almacenTareas[i]
            if (tarea.titulo === tituloBuscado) {
                console.log(`Tarea encontrada`)
                return tarea
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

store.actualizarTarea('Pagar la luz', {
    titulo: 'Pagar la energía eléctrica',
    descripcion: 'Ir a la municipalidad a pagar la mensualidad de la energía y solicitar usuario web',
})

store.listarTareas()
const tarea = store.buscarTarea('Limpiar el balcon')
console.log(tarea)
