import { Cita } from "./cita.interface";

export class GestionCitas {
    listaCitas: Cita[];

    constructor() {
        this.listaCitas = [];
    }

    private nombreRepetido(id: string, tipoEntidad: 'paciente' | 'doctor'): boolean {
        return this.listaCitas.some(cita => {
            if (tipoEntidad === 'paciente') {
                return cita.id_paciente.toString() === id;
            } else {
                return cita.id_doctor.toString() === id;
            }
        });
    }

    agendarCita(nuevaCita: Cita): void {
        const idPacienteRepetido = this.nombreRepetido(nuevaCita.id_paciente.toString(), 'paciente');
        const idDoctorRepetido = this.nombreRepetido(nuevaCita.id_doctor.toString(), 'doctor');

        if (!idPacienteRepetido && !idDoctorRepetido) {
            this.listaCitas.push(nuevaCita);
        } else {
            console.log("El paciente o el doctor ya tienen una cita programada.");
        }
    }

    obtenerCitasPorPaciente(idPaciente: number): Cita[] {
        return this.listaCitas.filter(cita => cita.id_paciente === idPaciente);
    }

    obtenerCitasPorDoctor(idDoctor: number): Cita[] {
        return this.listaCitas.filter(cita => cita.id_doctor === idDoctor);
    }

    obtenerCitasPorFecha(fecha: Date): Cita[] {
        return this.listaCitas.filter(cita => 
            cita.fecha_hora.toDateString() === fecha.toDateString()
        );
    }

    cancelarCita(idCita: number): void {
        this.listaCitas = this.listaCitas.filter(cita => cita.id_paciente !== idCita);
    }
}

// Ejemplo de uso
const gestionCitas = new GestionCitas();

// Simulación de datos de cita
const nuevaCita: Cita = {
    fecha_hora: new Date(2024, 6, 10),
    id_paciente: 1,
    id_doctor: 1
};

gestionCitas.agendarCita(nuevaCita);

console.log(gestionCitas.listaCitas);

const citasPaciente = gestionCitas.obtenerCitasPorPaciente(1);
console.log("Citas del paciente:", citasPaciente);

const citasDoctor = gestionCitas.obtenerCitasPorDoctor(1);
console.log("Citas del doctor:", citasDoctor);

const citasFecha = gestionCitas.obtenerCitasPorFecha(new Date(2024, 6, 10));
console.log("Citas para la fecha:", citasFecha);

gestionCitas.cancelarCita(1);
console.log(gestionCitas.listaCitas);
