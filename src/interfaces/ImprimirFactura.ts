interface Medicamento {
    nombre: string;
    cantidad: number;
    precioUnitario: number;
}

interface Tratamiento {
    problemaMedico: string;
    medicamentos: Medicamento[];
    costoTotal: number;
}

function imprimirFactura(tratamiento: Tratamiento): void {
    console.log("======= FACTURA =======");
    console.log("Problema Médico: " + tratamiento.problemaMedico);
    console.log("Medicamentos:");
    tratamiento.medicamentos.forEach((medicamento, index) => {
        console.log(`- ${medicamento.nombre}: ${medicamento.cantidad} unidades x $${medicamento.precioUnitario} c/u`);
    });
    console.log("Costo Total: $" + tratamiento.costoTotal);
}


const medicamentosRecetados: Medicamento[] = [
    { nombre: "Paracetamol", cantidad: 2, precioUnitario: 5 },
    { nombre: "Amoxicilina", cantidad: 1, precioUnitario: 8 },
];

const tratamientoEjemplo: Tratamiento = {
    problemaMedico: "Caries dentales",
    medicamentos: medicamentosRecetados,
    costoTotal: 18, 
};

imprimirFactura(tratamientoEjemplo);
