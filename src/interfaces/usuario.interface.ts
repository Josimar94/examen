export interface Usuario {
    id_usuario: number
    nombre: string
    carnet: number
    clave: string
    habilitado : boolean
    rol :'admin' | 'doctor' | 'recepcionista'
}
