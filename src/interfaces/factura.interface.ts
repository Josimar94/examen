import { ItemFactura } from "./itemfactura.interface";
export interface Factura {
    facturaId: number;
    clienteId: number; 
    fecha: string; 
    serviciosConsumidos: ItemFactura[];
    total: number;
}
