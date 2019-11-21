package com.example.demo.model;

import com.example.demo.model.Data;
import com.example.demo.model.GpsData;
import com.example.demo.model.Sensor;
import com.google.gson.Gson;

public class AddSensor extends Sensor {
    private String type ;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public AddSensor(String type ,String id, String name,String description, double workTime, Data data, GpsData gpsData) {
        super(id,name,description,workTime,data,gpsData);
        this.type=type ;
    }

    @Override
    public String toString() {
//        return "AddSensor{" +
//                "type='" + type + '\'' +
//                ", id='" + get_id() + '\'' +
//                ", name='" + getName() + '\'' +
//                ", description='" + getDescription() + '\'' +
//                ", workTime=" + getworkTime() +
//                ", data=" + getData() +
//                ", gpsData=" + getGpsData() +
//                '}';
        return new Gson().toJson(this);
    }
}