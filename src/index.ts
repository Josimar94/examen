import { Medicamento } from "./interfaces/medicamento.interface";

type Usuario = { 
    usuarioId: number;
    nombre: string;
    password: string;
    rol: 'admin' | 'doctor' | 'recepcionista';
    habilitado: boolean;
};

type Paciente = {
    pacienteId: number;
    nombre: string;
    fechaNacimiento: string; 
    direccion: string;
    telefono: string;
    alergias: string[];
    medicamentosActuales: string[];
    condicionesMedicas: string[];
    recetas: Receta[];
};

type Doctor = {
    doctorId: number;
    nombre: string;
    especialidad: string;
    horarios: Horario[];
};

type Horario = {
    dia: string; 
   horaInicio: string; 
    horaFin: string; 
};

type Cita = {
    citaId: number;
    pacienteId: number;
    doctorId: number;
    fecha: string; 
    hora: string; 
    descripcion: string;
    estado: 'programada' | 'cancelada' | 'completada';
};

type Receta = {
    recetaId: number;
    doctorId: number;
    pacienteId: number;
    fecha: string; 
    medicamentos: Medicamento[];
};

// type Medicamento = {
//     nombre: string;
//     dosis: string;
//     frecuencia: string;
//     duracion: string;
// };

type ProductoServicio = {
    id: number;
    nombre: string;
    tipo: 'producto' | 'servicio';
    precio: number;
};

type Factura = {
    facturaId: number;
    clienteId: number; 
    fecha: string; 
    serviciosConsumidos: ItemFactura[];
    total: number;
};

type ItemFactura = {
    nombre: string;
    precio: number;
};

let usuarioAutenticado: Usuario | null = null;

const usuarios: Usuario[] = [];
const pacientes: Paciente[] = [];
const doctores: Doctor[] = [];
const citas: Cita[] = [];
const recetas: Receta[] = [];
const productosServicios: ProductoServicio[] = [];
const facturas: Factura[] = [];

// Funciones de Autenticación de Usuario
function crearUsuario(nombre: string, password: string, rol: 'admin' | 'doctor' | 'recepcionista'): void {
    const nuevoUsuario: Usuario = {
        usuarioId: usuarios.length + 1,
        nombre,
        password,
        rol,
        habilitado: true,
    };
    usuarios.push(nuevoUsuario);
    console.log(`Usuario creado: ${nombre}`);
}

function editarUsuario(usuarioId: number, nombre?: string, password?: string, rol?: 'admin' | 'doctor' | 'recepcionista', habilitado?: boolean): void {
    const usuario = usuarios.find(u => u.usuarioId === usuarioId);
    if (!usuario) {
        console.log('Usuario no encontrado.');
        return;
    }
    if (nombre) usuario.nombre = nombre;
    if (password) usuario.password = password;
    if (rol) usuario.rol = rol;
    if (habilitado !== undefined) usuario.habilitado = habilitado;
    console.log(`Usuario actualizado: ${usuario.nombre}`);
}

function deshabilitarUsuario(usuarioId: number): void {
    const usuario = usuarios.find(u => u.usuarioId === usuarioId);
    if (!usuario) {
        console.log('Usuario no encontrado.');
        return;
    }
    usuario.habilitado = false;
    console.log(`Usuario deshabilitado: ${usuario.nombre}`);
}

function autenticarUsuario(nombre: string, password: string): void {
    const usuario = usuarios.find(usr => usr.nombre === nombre && usr.password === password && usr.habilitado);
    if (usuario) {
        usuarioAutenticado = usuario;
        console.log(`Usuario autenticado: ${usuario.nombre}`);
    } else {
        console.log('Error: Credenciales incorrectas o usuario deshabilitado.');
    }
}

function desautenticarUsuario(): void {
    if (usuarioAutenticado) {
        console.log(`Usuario desautenticado: ${usuarioAutenticado.nombre}`);
        usuarioAutenticado = null;
    }
}

function crearPaciente(nombre: string, fechaNacimiento: string, direccion: string, telefono: string, alergias: string[], medicamentosActuales: string[], condicionesMedicas: string[]): void {
    const nuevoPaciente: Paciente = {
        pacienteId: pacientes.length + 1,
        nombre,
        fechaNacimiento,
        direccion,
        telefono,
        alergias,
        medicamentosActuales,
        condicionesMedicas,
        recetas: [],
    };
    pacientes.push(nuevoPaciente);
    console.log(`Paciente creado: ${nombre}`);
}

function editarPaciente(pacienteId: number, nombre?: string, fechaNacimiento?: string, direccion?: string, telefono?: string, alergias?: string[], medicamentosActuales?: string[], condicionesMedicas?: string[]): void {
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (!paciente) {
        console.log('Paciente no encontrado.');
        return;
    }
    if (nombre) paciente.nombre = nombre;
    if (fechaNacimiento) paciente.fechaNacimiento = fechaNacimiento;
    if (direccion) paciente.direccion = direccion;
    if (telefono) paciente.telefono = telefono;
    if (alergias) paciente.alergias = alergias;
    if (medicamentosActuales) paciente.medicamentosActuales = medicamentosActuales;
    if (condicionesMedicas) paciente.condicionesMedicas = condicionesMedicas;
    console.log(`Paciente actualizado: ${paciente.nombre}`);
}

function eliminarPaciente(pacienteId: number): void {
    const index = pacientes.findIndex(p => p.pacienteId === pacienteId);
    if (index === -1) {
        console.log('Paciente no encontrado.');
        return;
    }
    pacientes.splice(index, 1);
    console.log(`Paciente eliminado: ID ${pacienteId}`);
}

function obtenerPaciente(pacienteId: number): Paciente | undefined {
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (paciente) {
        console.log(`Paciente encontrado: ${paciente.nombre}`);
        return paciente;
    } else {
        console.log('Paciente no encontrado.');
        return undefined;
    }
}

function obtenerEdadPaciente(pacienteId: number): number | undefined {
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (!paciente) {
        console.log('Paciente no encontrado.');
        return undefined;
    }
    const nacimiento = new Date(paciente.fechaNacimiento);
    const edadDifMs = Date.now() - nacimiento.getTime();
    const edadDate = new Date(edadDifMs);
    const edad = Math.abs(edadDate.getUTCFullYear() - 1970);
    console.log(`Edad del paciente ${paciente.nombre}: ${edad} años`);
    return edad;
}

function obtenerTodosPacientes(): Paciente[] {
    console.log(`Total de pacientes: ${pacientes.length}`);
    return pacientes;
}

function contarPacientes(): number {
    const total = pacientes.length;
    console.log(`Conteo total de pacientes: ${total}`);
    return total;
}

function obtenerUltimasRecetas(pacienteId: number): Receta[] {
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (!paciente) {
        console.log('Paciente no encontrado.');
        return [];
    }
    const ultimasRecetas = paciente.recetas.slice(-5);
    console.log(`Últimas 5 recetas del paciente ${paciente.nombre}:`, ultimasRecetas);
    return ultimasRecetas;
}

function programarCita(pacienteId: number, doctorId: number, fecha: string, hora: string, descripcion: string): void {
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
    console.log(`Cita programada para el paciente ID ${pacienteId} con el doctor ID ${doctorId} en ${fecha} a las ${hora}`);
}

function cancelarCita(citaId: number): void {
    const cita = citas.find(c => c.citaId === citaId);
    if (!cita) {
        console.log('Cita no encontrada.');
        return;
    }
    cita.estado = 'cancelada';
    console.log(`Cita cancelada: ID ${citaId}`);
}

function reprogramarCita(citaId: number, nuevaFecha: string, nuevaHora: string): void {
    const cita = citas.find(c => c.citaId === citaId);
    if (!cita) {
        console.log('Cita no encontrada.');
        return;
    }
    cita.fecha = nuevaFecha;
    cita.hora = nuevaHora;
    cita.estado = 'programada';
    console.log(`Cita reprogramada: ID ${citaId} para ${nuevaFecha} a las ${nuevaHora}`);
}

function obtenerCitasDoctor(doctorId: number): Cita[] {
    const citasDoctor = citas.filter(c => c.doctorId === doctorId);
    console.log(`Citas del doctor ID ${doctorId}:`, citasDoctor);
    return citasDoctor;
}

function obtenerCitasPaciente(pacienteId: number): Cita[] {
    const citasPaciente = citas.filter(c => c.pacienteId === pacienteId);
    console.log(`Citas del paciente ID ${pacienteId}:`, citasPaciente);
    return citasPaciente;
}

function obtenerCitasPorFecha(fecha: string): Cita[] {
    const citasFecha = citas.filter(c => c.fecha === fecha);
    console.log(`Citas para la fecha ${fecha}:`, citasFecha);
    return citasFecha;
}

function crearDoctor(nombre: string, especialidad: string, horarios: Horario[]): void {
    const nuevoDoctor: Doctor = {
        doctorId: doctores.length + 1,
        nombre,
        especialidad,
        horarios,
    };
    doctores.push(nuevoDoctor);
    console.log(`Doctor creado: ${nombre}`);
}

function editarDoctor(doctorId: number, nombre?: string, especialidad?: string, horarios?: Horario[]): void {
    const doctor = doctores.find(d => d.doctorId === doctorId);
    if (!doctor) {
        console.log('Doctor no encontrado.');
        return;
    }
    if (nombre) doctor.nombre = nombre;
    if (especialidad) doctor.especialidad = especialidad;
    if (horarios) doctor.horarios = horarios;
    console.log(`Doctor actualizado: ${doctor.nombre}`);
}

function eliminarDoctor(doctorId: number): void {
    const index = doctores.findIndex(d => d.doctorId === doctorId);
    if (index === -1) {
        console.log('Doctor no encontrado.');
        return;
    }
    doctores.splice(index, 1);
    console.log(`Doctor eliminado: ID ${doctorId}`);
}

function obtenerDoctor(doctorId: number): Doctor | undefined {
    const doctor = doctores.find(d => d.doctorId === doctorId);
    if (doctor) {
        console.log(`Doctor encontrado: ${doctor.nombre}`);
        return doctor;
    } else {
        console.log('Doctor no encontrado.');
        return undefined;
    }
}

function obtenerDoctoresDisponibles(fecha: string): Doctor[] {
    const dia = new Date(fecha).toLocaleString('es-ES', { weekday: 'long' });
    const doctoresDisponibles = doctores.filter(d =>
        d.horarios.some(h => h.dia.toLowerCase() === dia.toLowerCase())
    );
    console.log(`Doctores disponibles para la fecha ${fecha}:`, doctoresDisponibles);
    return doctoresDisponibles;
}

function obtenerTodosDoctores(): Doctor[] {
    console.log(`Total de doctores: ${doctores.length}`);
    return doctores;
}

function contarDoctores(): number {
    const total = doctores.length;
    console.log(`Conteo total de doctores: ${total}`);
    return total;
}

function validarDisponibilidadDoctor(doctorId: number, fecha: string): boolean {
    const doctor = doctores.find(d => d.doctorId === doctorId);
    if (!doctor) {
        console.log('Doctor no encontrado.');
        return false;
    }
    const dia = new Date(fecha).toLocaleString('es-ES', { weekday: 'long' });
    const disponible = doctor.horarios.some(h => h.dia.toLowerCase() === dia.toLowerCase());
    console.log(`Disponibilidad del doctor ${doctor.nombre} para la fecha ${fecha}: ${disponible}`);
    return disponible;
}


function crearReceta(doctorId: number, pacienteId: number, fecha: string, medicamentos: Medicamento[]): void {
    const nuevaReceta: Receta = {
        recetaId: recetas.length + 1,
        doctorId,
        pacienteId,
        fecha,
        medicamentos,
    };
    recetas.push(nuevaReceta);
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (paciente) {
        paciente.recetas.push(nuevaReceta);
        console.log(`Receta creada para el paciente ID ${pacienteId} por el doctor ID ${doctorId}`);
    } else {
        console.log('Paciente no encontrado.');
    }
}

function editarReceta(recetaId: number, fecha?: string, medicamentos?: Medicamento[]): void {
    const receta = recetas.find(r => r.recetaId === recetaId);
    if (!receta) {
        console.log('Receta no encontrada.');
        return;
    }
    if (fecha) receta.fecha = fecha;
    if (medicamentos) receta.medicamentos = medicamentos;
    console.log(`Receta actualizada: ID ${recetaId}`);
}

function eliminarReceta(recetaId: number): void {
    const index = recetas.findIndex(r => r.recetaId === recetaId);
    if (index === -1) {
        console.log('Receta no encontrada.');
        return;
    }
    recetas.splice(index, 1);
    pacientes.forEach(p => p.recetas = p.recetas.filter(r => r.recetaId !== recetaId));
    console.log(`Receta eliminada: ID ${recetaId}`);
}

function obtenerRecetasPaciente(pacienteId: number): Receta[] {
    const paciente = pacientes.find(p => p.pacienteId === pacienteId);
    if (paciente) {
        console.log(`Recetas del paciente ${paciente.nombre}:`, paciente.recetas);
        return paciente.recetas;
    } else {
        console.log('Paciente no encontrado.');
        return [];
    }
}

function obtenerMedicamentosReceta(recetaId: number): Medicamento[] {
    const receta = recetas.find(r => r.recetaId === recetaId);
    if (receta) {
        console.log(`Medicamentos en la receta ID ${recetaId}:`, receta.medicamentos);
        return receta.medicamentos;
    } else {
        console.log('Receta no encontrada.');
        return [];
    }
}

function crearProductoServicio(nombre: string, tipo: 'producto' | 'servicio', precio: number): void {
    const nuevoProductoServicio: ProductoServicio = {
        id: productosServicios.length + 1,
        nombre,
        tipo,
        precio,
    };
    productosServicios.push(nuevoProductoServicio);
    console.log(`Producto/Servicio creado: ${nombre}`);
}

function editarProductoServicio(id: number, nombre?: string, tipo?: 'producto' | 'servicio', precio?: number): void {
    const productoServicio = productosServicios.find(p => p.id === id);
    if (!productoServicio) {
        console.log('Producto/Servicio no encontrado.');
        return;
    }
    if (nombre) productoServicio.nombre = nombre;
    if (tipo) productoServicio.tipo = tipo;
    if (precio) productoServicio.precio = precio;
    console.log(`Producto/Servicio actualizado: ${productoServicio.nombre}`);
}

function eliminarProductoServicio(id: number): void {
    const index = productosServicios.findIndex(p => p.id === id);
    if (index === -1) {
        console.log('Producto/Servicio no encontrado.');
        return;
    }
    productosServicios.splice(index, 1);
    console.log(`Producto/Servicio eliminado: ID ${id}`);
}

function obtenerProductoServicio(id: number): ProductoServicio | undefined {
    const productoServicio = productosServicios.find(p => p.id === id);
    if (productoServicio) {
        console.log(`Producto/Servicio encontrado: ${productoServicio.nombre}`);
        return productoServicio;
    } else {
        console.log('Producto/Servicio no encontrado.');
        return undefined;
    }
}

function obtenerTodosProductosServiciosPorTipo(tipo: 'producto' | 'servicio'): ProductoServicio[] {
    const items = productosServicios.filter(p => p.tipo === tipo);
    console.log(`Productos/Servicios de tipo ${tipo}:`, items);
    return items;
}

function crearFactura(clienteId: number, serviciosConsumidos: ItemFactura[]): void {
    const total = serviciosConsumidos.reduce((acc, item) => acc + item.precio, 0);
    const nuevaFactura: Factura = {
        facturaId: facturas.length + 1,
        clienteId,
        fecha: new Date().toISOString().split('T')[0],
        serviciosConsumidos,
        total,
    };
    facturas.push(nuevaFactura);
    console.log(`Factura creada para el cliente ID ${clienteId}, total: ${total}`);
}

function editarFactura(facturaId: number, serviciosConsumidos?: ItemFactura[]): void {
    const factura = facturas.find(f => f.facturaId === facturaId);
    if (!factura) {
        console.log('Factura no encontrada.');
        return;
    }
    if (serviciosConsumidos) {
        factura.serviciosConsumidos = serviciosConsumidos;
        factura.total = serviciosConsumidos.reduce((acc, item) => acc + item.precio, 0);
    }
    console.log(`Factura actualizada: ID ${facturaId}`);
}

function eliminarFactura(facturaId: number): void {
    const index = facturas.findIndex(f => f.facturaId === facturaId);
    if (index === -1) {
        console.log('Factura no encontrada.');
        return;
    }
    facturas.splice(index, 1);
    console.log(`Factura eliminada: ID ${facturaId}`);
}

function obtenerFacturasPorCliente(clienteId: number): Factura[] {
    const facturasCliente = facturas.filter(f => f.clienteId === clienteId);
    console.log(`Facturas del cliente ID ${clienteId}:`, facturasCliente);
    return facturasCliente;
}

function obtenerProductosPorFactura(facturaId: number): ItemFactura[] {
    const factura = facturas.find(f => f.facturaId === facturaId);
    if (factura) {
        console.log(`Productos de la factura ID ${facturaId}:`, factura.serviciosConsumidos);
        return factura.serviciosConsumidos;
    } else {
        console.log('Factura no encontrada.');
        return [];
    }
}

function obtenerFacturasPorFecha(fecha: string): Factura[] {
    const facturasFecha = facturas.filter(f => f.fecha === fecha);
    console.log(`Facturas para la fecha ${fecha}:`, facturasFecha);
    return facturasFecha;
}

function obtenerTotalFacturacionPorMes(mes: number): number {
    const totalFacturacion = facturas.reduce((acc, factura) => {
        const fechaFactura = new Date(factura.fecha);
        if (fechaFactura.getMonth() + 1 === mes) {
            return acc + factura.total;
        }
        return acc;
    }, 0);
    console.log(`Total de facturación para el mes ${mes}: ${totalFacturacion}`);
    return totalFacturacion;
}

// Ejemplo de uso
crearUsuario('admin', 'admin123', 'admin');
autenticarUsuario('admin', 'admin123');

crearPaciente('Juan Pérez', '1980-05-15', 'Calle Principal 123', '123456789', ['Penicilina'], ['Aspirina'], ['Hipertensión']);
crearPaciente('María Gómez', '1990-10-20', 'Avenida Secundaria 456', '987654321', ['Ninguna'], ['Paracetamol'], ['Diabetes']);

programarCita(1, 1, '2024-06-10', '10:00', 'Limpieza Dental');
programarCita(2, 2, '2024-06-12', '15:30', 'Consulta de Ortodoncia');

crearDoctor('Dr. Carlos Martínez', 'Odontología General', [
    { dia: 'Lunes', horaInicio: '08:00', horaFin: '12:00' },
    { dia: 'Martes', horaInicio: '08:00', horaFin: '12:00' },
]);

crearDoctor('Dra. Laura Sánchez', 'Ortodoncia', [
    { dia: 'Miércoles', horaInicio: '14:00', horaFin: '18:00' },
    { dia: 'Viernes', horaInicio: '14:00', horaFin: '18:00' },
]);

crearReceta(1, 1, '2024-06-01', [
    { nombre: 'Ibuprofeno', dosis: '200mg', frecuencia_horas: 8, duracion_dias: 5},
]);

crearProductoServicio('Limpieza Dental', 'servicio', 50);
crearProductoServicio('Consulta de Ortodoncia', 'servicio', 100);

crearFactura(1, [
    { nombre: 'Limpieza Dental', precio: 50 },
]);
crearFactura(2, [
    { nombre: 'Consulta de Ortodoncia', precio: 100 },
]);

// Llamadas a funciones 
editarUsuario(1, undefined, 'newpassword');
obtenerEdadPaciente(1);
obtenerUltimasRecetas(1);
obtenerCitasPorFecha('2024-06-10');
obtenerDoctoresDisponibles('2024-06-10');
eliminarFactura(1);
obtenerTotalFacturacionPorMes(6);
