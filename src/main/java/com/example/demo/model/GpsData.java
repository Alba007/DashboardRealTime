package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "gpsData")
public  class  GpsData {
    private double longitude;
    private double latitude;

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}