export class Dispositivo {
    _id?: number;
    Temperatura: string;
    Movimiento: string;
    Estado: number;

    constructor(Temperatura: string, Movimiento: string, Estado: number) {
        this.Temperatura = Temperatura;
        this.Movimiento = Movimiento;
        this.Estado = Estado;
    }
}
