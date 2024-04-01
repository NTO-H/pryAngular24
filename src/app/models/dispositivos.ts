export class Dispositivo {
    _id?: number;
    devName: string;
    devLabel: string;
    userId: string; // Nuevo campo para el ID del usuario

    constructor(devLabel: string, devName: string, userId: string) {
        this.devName = devName;
        this.devLabel = devLabel;
        this.userId = userId; // Asignar el ID del usuario al campo userId
    }
}
