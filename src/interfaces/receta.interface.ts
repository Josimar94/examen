import { Medicamento } from './medicamento.interface'

export interface Receta {
    recetaId: number
    doctorId: number
    pacienteId:number
    fecha:string
    medicamentos: Medicamento[]
    
}
