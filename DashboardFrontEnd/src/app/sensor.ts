export interface gpsData {
    longitude:number;
    latitude:number;
}

export interface Data {
    temperature:number;
    humidity:number;
    image:string;
    tempForceing:number;
}

export interface Sensor {
id: string;
name:string;
description:string ;
workTime:number;
data:Data;
gpsData:gpsData;

} 

export interface Sensor1 {
    id:string ;
      name: string;
        description: string;
            gpsData: string;
                workTime: number;
                    data: string;
}