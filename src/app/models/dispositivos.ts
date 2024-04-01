export class Dispositivo {
    _id?: number;
    deviceName: string;
    deviceLabel: string;
    userId: string; // Nuevo campo para el ID del usuario

    constructor(deviceLabel: string, deviceName: string, userId: string) {
        this.deviceName = deviceName;
        this.deviceLabel = deviceLabel;
        this.userId = userId; // Asignar el ID del usuario al campo userId
    }
}
