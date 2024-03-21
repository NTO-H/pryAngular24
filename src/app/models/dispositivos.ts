export class Dispositivo {
    _id?: number;
    Temperatura: string;
    Movimiento: string;
    EstadoLed: number;



    constructor(Temperatura: string, EstadoLed:number,Movimiento: string) {
        this.Temperatura = Temperatura;
        this.Movimiento = Movimiento;
        this.EstadoLed = EstadoLed;
    }

}
