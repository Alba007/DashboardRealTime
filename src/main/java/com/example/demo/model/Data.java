package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "data")
public class Data {
    private double temperature ;
    private double humidity ;
    private  double tempForc;


    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }
    public double getHumidity() {
        return humidity ;
    }

    public double getTempForc() {
        return tempForc;
    }
    public void setTempForce(double tempForceing) {
        this.tempForc=tempForceing ;
    }
    }

