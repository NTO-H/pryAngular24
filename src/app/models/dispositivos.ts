export class Dispositivo {
    _id?: number;
    Temperatura: string;
    humedad: string;
    Movimiento: string;
    EstadoLed: number;



    constructor(Temperatura: string, EstadoLed: number, humedad: string, Movimiento: string) {
        this.Temperatura = Temperatura;
        this.humedad = humedad;
        this.Movimiento = Movimiento;
        this.EstadoLed = EstadoLed;
    }

}
