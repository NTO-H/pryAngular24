export class Dispositivo {
    _id?: number;
    devName: String;
    devLabel: String;
    // Temperatura: string;
    // humedad: string;
    // Movimiento: string;
    // EstadoLed: number;



    constructor( devLabel: string, devName: string) {
    // constructor(Temperatura: string, devLabel: string, devName: string, EstadoLed: number, humedad: string, Movimiento: string) {
        
        this.devName= devName;
        this.devLabel= devLabel;
        // this.Temperatura = Temperatura;
        // this.humedad = humedad;
        // this.Movimiento = Movimiento;
        // this.EstadoLed = EstadoLed;
    }

}
