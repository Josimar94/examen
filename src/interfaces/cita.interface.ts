export interface Cita {
    citaId: number;
    pacienteId: number;
    doctorId: number;
    fecha: string; 
    hora: string; 
    descripcion: string;
    estado: 'programada' | 'cancelada' | 'completada';
}