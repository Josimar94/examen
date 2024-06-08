import { Horario } from './horario.interface'

export interface Doctor {
    doctorId: number
    nombre: string
    especialidad: 'Odontología' | 'Cirujano Oral'
    horario: Horario[]
}
