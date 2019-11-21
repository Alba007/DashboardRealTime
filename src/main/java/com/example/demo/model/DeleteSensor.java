package com.example.demo.model;

import com.google.gson.Gson;

public class DeleteSensor {
    String type ;
    String id ;
    public DeleteSensor(String type, String id) {
        this.type = type;
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
         return new Gson().toJson(this);
    }

    public void setId(String id) {
        this.id = id;
    }


}
