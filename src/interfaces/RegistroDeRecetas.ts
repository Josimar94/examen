export { servicioReceta, usuarios, pacientes, recetas, medicamentos };
interface Usuario {
    id: string;
    nombre: string;
    carnet: string;
    correo: string;
    habilitado: boolean;
}

interface Paciente {
    id: string;
    nombre: string;
    fechaNacimiento: string;
    direccion: string;
    telefono: string;
    alergias: string[];
    medicamentos: string[];
    condiciones: string[];
}

interface Receta {
    id: string;
    pacienteId: string;
    doctorId: string;
    fecha: string;
    medicamentos: Medicamento[];
    dosis: string;
    frecuencia: string;
    duracion: string;
}

interface Medicamento {
    nombre: string;
    categoria: string;
    descripcion: string;
}

const usuarios: Usuario[] = [];
const pacientes: Paciente[] = [];
const recetas: Receta[] = [];
const medicamentos: Medicamento[] = [
    { nombre: "Ibuprofeno", categoria: "Analgésicos", descripcion: "Utilizado para el dolor y la inflamación." },
];

const servicioReceta = {
    crearReceta(pacienteId: string, doctorId: string, fecha: string, medicamentos: Medicamento[], dosis: string, frecuencia: string, duracion: string): Receta {
        const receta: Receta = { id: generarIdUnico(), pacienteId, doctorId, fecha, medicamentos, dosis, frecuencia, duracion };
        recetas.push(receta);
        return receta;
    },
    editarReceta(id: string, recetaActualizada: Partial<Receta>): Receta | undefined {
        const receta = recetas.find(r => r.id === id);
        if (receta) {
            Object.assign(receta, recetaActualizada);
            return receta;
        }
        return undefined;
    },
    eliminarReceta(id: string): boolean {
        const indice = recetas.findIndex(r => r.id === id);
        if (indice !== -1) {
            recetas.splice(indice, 1);
            return true;
        }
        return false;
    },
    obtenerRecetasPorPaciente(pacienteId: string): Receta[] {
        return recetas.filter(r => r.pacienteId === pacienteId);
    },
    obtenerMedicamentosDeReceta(id: string): Medicamento[] | undefined {
        const receta = recetas.find(r => r.id === id);
        return receta?.medicamentos;
    }
};

function generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9);
}


