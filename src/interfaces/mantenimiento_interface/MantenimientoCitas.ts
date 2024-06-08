import { readFileSync, writeFileSync } from 'fs';
import { Cita } from '../cita.interface';

const direccionArchivoCitas = './data/citas.json';

// Función para leer citas desde el archivo
const lecturaCitas = (): Cita[] => {
    const archivo: string = readFileSync(direccionArchivoCitas, 'utf8');
    if (archivo.trim() === '') return [];
    return JSON.parse(archivo) as Cita[];
}

// Función para escribir citas en el archivo
const escrituraCitas = (citas: Cita[]) => {
    writeFileSync(direccionArchivoCitas, JSON.stringify(citas, null, 2));
}

// Función para programar una nueva cita
const programarCita = (pacienteId: number, doctorId: number, fecha: string, hora: string, descripcion: string): void => {
    const citas = lecturaCitas();
    const nuevaCita: Cita = {
        citaId: citas.length + 1,
        pacienteId,
        doctorId,
        fecha,
        hora,
        descripcion,
        estado: 'programada',
    };
    citas.push(nuevaCita);
    escrituraCitas(citas);
    console.log(`Cita programada para el paciente ID ${pacienteId} con el doctor ID ${doctorId} en ${fecha} a las ${hora}`);
}

// Función para cancelar una cita
const cancelarCita = (citaId: number): void => {
    const citas = lecturaCitas();
    const cita = citas.find(c => c.citaId === citaId);
    if (!cita) {
        console.log('Cita no encontrada.');
        return;
    }
    cita.estado = 'cancelada';
    escrituraCitas(citas);
    console.log(`Cita cancelada: ID ${citaId}`);
}

// Función para reprogramar una cita
const reprogramarCita = (citaId: number, nuevaFecha: string, nuevaHora: string): void => {
    const citas = lecturaCitas();
    const cita = citas.find(c => c.citaId === citaId);
    if (!cita) {
        console.log('Cita no encontrada.');
        return;
    }
    cita.fecha = nuevaFecha;
    cita.hora = nuevaHora;
    cita.estado = 'programada';
    escrituraCitas(citas);
    console.log(`Cita reprogramada: ID ${citaId} para ${nuevaFecha} a las ${nuevaHora}`);
}

// Función para obtener citas de un doctor
const obtenerCitasDoctor = (doctorId: number): Cita[] => {
    const citas = lecturaCitas();
    const citasDoctor = citas.filter(c => c.doctorId === doctorId);
    console.log(`Citas del doctor ID ${doctorId}:`, citasDoctor);
    return citasDoctor;
}

// Función para obtener citas de un paciente
const obtenerCitasPaciente = (pacienteId: number): Cita[] => {
    const citas = lecturaCitas();
    const citasPaciente = citas.filter(c => c.pacienteId === pacienteId);
    console.log(`Citas del paciente ID ${pacienteId}:`, citasPaciente);
    return citasPaciente;
}

// Función para obtener citas por fecha
const obtenerCitasPorFecha = (fecha: string): Cita[] => {
    const citas = lecturaCitas();
    const citasFecha = citas.filter(c => c.fecha === fecha);
    console.log(`Citas para la fecha ${fecha}:`, citasFecha);
    return citasFecha;
}

export { programarCita, cancelarCita, reprogramarCita, obtenerCitasDoctor, obtenerCitasPaciente, obtenerCitasPorFecha };
