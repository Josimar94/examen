import { Paciente } from "./paciente.interface";
export { CrearCuenta, EditarPaciente, EliminarPaciente, ObtenerPaciente, ObtenerEdadPaciente, ObtenerTodosPacientes, ConteoPacientes, ObtenerUltimas5Recetas };

let nextId = 1;
let pacientes: Paciente[] = [];

function CrearCuenta(paciente: Paciente) {
    paciente.id_paciente = nextId++;
    pacientes.push(paciente);
    console.log(`Paciente ${paciente.nombre} ha sido creado con ID: ${paciente.id_paciente}`)
};

function EditarPaciente(id: number, nuevosDatos: Partial<Paciente>) {
    const pacienteIndex = pacientes.findIndex(p => p.id_paciente === id);

    if (pacienteIndex !== -1) {
        pacientes[pacienteIndex] = { ...pacientes[pacienteIndex], ...nuevosDatos };
        console.log(`Paciente con ID: ${id} ha sido actualizado.`);
    } else {
        console.log(`Paciente con ID: ${id} no encontrado.`);
    }
}

function EliminarPaciente(id: number) {
    pacientes = pacientes.filter(p => p.id_paciente !== id);
    console.log(`Paciente con ID: ${id} ha sido eliminado.`);
}

function ObtenerPaciente(id: number): Paciente | undefined {
    return pacientes.find(p => p.id_paciente === id);
}

function ObtenerEdadPaciente(id: number): number | undefined {
    const paciente = ObtenerPaciente(id);
    if (paciente) {
        const edadDifMs = Date.now() - new Date(paciente.fecha_nacimiento).getTime();
        const edadFecha = new Date(edadDifMs);
        return Math.abs(edadFecha.getUTCFullYear() - 1970);
    }
    return undefined;
}

function ObtenerTodosPacientes(): Paciente[] {
    return pacientes;
}

function ConteoPacientes(): number {
    return pacientes.length;
}

function ObtenerUltimas5Recetas(id: number): string[] | undefined {
    const paciente = ObtenerPaciente(id);
    return paciente ? paciente.medicamentos_actuales.slice(-5) : undefined;
}

// Ejemplo de uso
const nuevoPaciente: Paciente = {
    id_paciente: 0, 
    nombre: "Juan Perez",
    fecha_nacimiento: new Date('1990-01-01'),
    direccion: "Calle Falsa 123",
    telefono: 123456789,
    alergias: ["Polen"],
    medicamentos_actuales: ["Ibuprofeno"],
    condiciones_medicas: ["Dolor de Dientes"]
};

CrearCuenta(nuevoPaciente)