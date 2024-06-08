import { Receta } from "./receta.interface"

export interface Paciente {
    pacienteId: number
    nombre: string
    fechaNacimiento: string
    direccion: string
    telefono: string
    alergias: string[]
    medicamentosActuales: string[]
    condicionesMedicas: string[]
    recetas : Receta[]
}
