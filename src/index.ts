interface Usuario {
    id: string;
    nombre: string;
    carnet: string;
    correo: string;
    habilitado: boolean;
}

const listaUsuarios: Usuario[] = [];

const servicioUsuario = {
    crearUsuario(nombre: string, carnet: string, correo: string): Usuario {
        const usuario: Usuario = { id: generarIdUnico(), nombre, carnet, correo, habilitado: true };
        listaUsuarios.push(usuario);
        return usuario;
    },
    editarUsuario(id: string, nuevoNombre: string, nuevoCarnet: string, nuevoCorreo: string): Usuario | undefined {
        const usuario = listaUsuarios.find(u => u.id === id);
        if (usuario) {
            usuario.nombre = nuevoNombre;
            usuario.carnet = nuevoCarnet;
            usuario.correo = nuevoCorreo;
            return usuario;
        }
        return undefined;
    },
    deshabilitarUsuario(id: string): boolean {
        const usuario = listaUsuarios.find(u => u.id === id);
        if (usuario) {
            usuario.habilitado = false;
            return true;
        }
        return false;
    },
    autenticarUsuario(carnet: string, correo: string): Usuario | undefined {
        return listaUsuarios.find(u => u.carnet === carnet && u.correo === correo && u.habilitado);
    },
    desautenticarUsuario(): void {

    }
};

function generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9);
}


const nuevoUsuario = servicioUsuario.crearUsuario("Juan", "12345", "juan@example.com");
console.log(nuevoUsuario);

const usuarioEditado = servicioUsuario.editarUsuario(nuevoUsuario.id, "Juan Pérez", "54321", "juan.perez@example.com");
console.log(usuarioEditado);

const usuarioAutenticado = servicioUsuario.autenticarUsuario("54321", "juan.perez@example.com");
if (usuarioAutenticado) {
    console.log("Usuario autenticado:", usuarioAutenticado);
} else {
    console.log("Credenciales incorrectas o usuario deshabilitado.");
}

const usuarioDeshabilitado = servicioUsuario.deshabilitarUsuario(nuevoUsuario.id);
console.log("Usuario deshabilitado:", usuarioDeshabilitado);
