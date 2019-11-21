package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sensors")
public class Sensor {
    @Id
    private String id;
    private String name;
    private String description;
    private double workTime;
    private Data data;
    private GpsData gpsData;

    private Sensor() {

    }

    public Sensor(String id, String name, String description, double workTime, Data data, GpsData gpsData) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workTime = workTime;
        this.data = data;
        this.gpsData = gpsData;
    }

    public String get_id() {
        return id;
    }

    public void set_id(String _id) {
        this.id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getworkTime() {
        return workTime;
    }

    public void setworkTime(Double workTime) {
        this.workTime = workTime;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public GpsData getGpsData() {
        return gpsData;
    }

    public void setGpsData(GpsData dataGps) {
        this.gpsData = dataGps;
    }
}
