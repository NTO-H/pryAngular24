
#include <WiFi.h>
#include <PubSubClient.h>
#include <Stepper.h>
#include <DHT.h>
#include <LiquidCrystal_I2C.h>
  #include <HX711.h>
#include <ArduinoJson.h>
// Configuración WiFi
const char* ssid = "INFINITUMD4FA";
const char* password = "Padilla270104";

// Configuración del servidor MQTT
const char* server = "broker.emqx.io";
const int port = 1883;



// Configuración de dispositivos
const int releFocoPin = 18;
const int releCerraduraPin = 23;
const int releVentiladorPin = 5;
const int releVentilador2Pin = 15;
const int DHTPIN = 33;
const int DHTTYPE = DHT11;
const int STEPS_PER_REV = 200;
const int MOTOR_SPEED = 100;
const int ledPin = 4; // Pin del LED para indicar el estado de la cerradura

DHT dht(DHTPIN, DHTTYPE);
Stepper stepper_NEMA17(STEPS_PER_REV, 27, 14, 25, 26);
WiFiClient esp32Client;
PubSubClient mqttClient(esp32Client);

// Inicialización del LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

bool modoAutomatico = false; // Variable para almacenar el modo de operación


void wifiInit() {
    Serial.print("Conectándose a ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nConectado a WiFi");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Mensaje recibido [");
    Serial.print(topic);
    Serial.print("] ");
    payload[length] = '\0'; // Asegura la terminación de la cadena
    String message = String((char*)payload);

    Serial.println(message);

    // Verificar el mensaje recibido
    if (message == "controlarDeFormaAutomatica") {
        modoAutomatico = true;
    } else if (message == "controlarDeFormaManual") {
        modoAutomatico = false;
    }
    // Control manual
    else if (!modoAutomatico) {
        if (message == "focoOn") {
            digitalWrite(releFocoPin, LOW);
        } else if (message == "focoOff") {
            digitalWrite(releFocoPin, HIGH);
        } else if (message == "cerraduraOpen") {
            digitalWrite(releCerraduraPin, LOW);
            digitalWrite(ledPin, HIGH); // Encender el LED cuando la cerradura está abierta
        } else if (message == "cerraduraClose") {
            digitalWrite(releCerraduraPin, HIGH);
            digitalWrite(ledPin, LOW); // Apagar el LED cuando la cerradura está cerrada
        } else if (message == "ventiladorOn") {
            digitalWrite(releVentiladorPin, LOW);
        } else if (message == "ventiladorOff") {
            digitalWrite(releVentiladorPin, HIGH);
        } else if (message == "ventilador2On") {
            digitalWrite(releVentilador2Pin, LOW);
        } else if (message == "ventilador2Off") {
            digitalWrite(releVentilador2Pin, HIGH);
        }
        // Control para el motor a pasos
        else if (message == "motorStart") {
            stepper_NEMA17.step(STEPS_PER_REV * 6); // Ejemplo: 6 revoluciones
        }
    }
}

void reconnect() {
    while (!mqttClient.connected()) {
        Serial.print("Intentando conectarse a MQTT...");
        if (mqttClient.connect("esp32Client")) {
                    Serial.println("Conectado");
            mqttClient.subscribe("Entrada/01");
        } else {
            Serial.print("Fallo, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" intentar de nuevo en 5 segundos");
            delay(5000);
        }
    }
}

void setup() {
    Serial.begin(115200);
    pinMode(releFocoPin, OUTPUT);
    pinMode(releCerraduraPin, OUTPUT);
    pinMode(releVentiladorPin, OUTPUT);
    pinMode(releVentilador2Pin, OUTPUT);
    pinMode(ledPin, OUTPUT); // Configurar el pin del LED

   digitalWrite(releFocoPin, HIGH);
    digitalWrite(releCerraduraPin, HIGH);
    digitalWrite(releVentiladorPin, HIGH);
    digitalWrite(releVentilador2Pin, HIGH);
    digitalWrite(ledPin, LOW);




    wifiInit();
    mqttClient.setServer(server, port);
    mqttClient.setCallback(callback);
    // Configurar el motor a pasos
    stepper_NEMA17.setSpeed(MOTOR_SPEED);

    dht.begin();
    lcd.init();
    lcd.backlight();
}

void loop() {
    if (!mqttClient.connected()) {
        reconnect();
    }
    mqttClient.loop();
    int temperatura = dht.readTemperature();
    int humedad = dht.readHumidity();

    static unsigned long lastPublishTime = 0;

    unsigned long currentMillis = millis();
    if (currentMillis - lastPublishTime > 10000) { // Publicar cada 10 segundos
        lastPublishTime = currentMillis;

        // Preparar el documento JSON
       StaticJsonDocument<512> doc; // Aumentamos el tamaño del documento JSON para acomodar la temperatura
    doc["temperatura"] = temperatura;
    doc["humedad"] = humedad;
        // Serializar JSON a String
        char jsonBuffer[512];
        serializeJson(doc, jsonBuffer);

        // Publicar el JSON en el topic de estado
        mqttClient.publish("Entrada/01/estado", jsonBuffer);

        // Muestra de valores en el LCD (sin cambios)
        lcd.clear();
            lcd.print("Temp: ");
            lcd.print(temperatura);
            lcd.print(" C");
            lcd.setCursor(0, 1); // Mover a la segunda línea
            lcd.print("Hum: ");
            lcd.print(humedad);
            lcd.print("%");


        if (modoAutomatico) {
                // Si la temperatura supera los 32.5 grados, apagar el foco
                if (temperatura > 35) {
                    digitalWrite(releFocoPin, HIGH);
                } else {
                    digitalWrite(releFocoPin, LOW);
                }

                // Si la humedad supera el 60%, encender los ventiladores
                if (humedad > 60) {
                    digitalWrite(releVentiladorPin, LOW);
                    digitalWrite(releVentilador2Pin, LOW);
                } else {
                    digitalWrite(releVentiladorPin, HIGH);
                    digitalWrite(releVentilador2Pin, HIGH);
                }
            }
    delay(100); // Pequeño retardo para evitar uso excesivo del CPU
}
