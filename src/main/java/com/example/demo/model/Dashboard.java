package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "dashboard")
public class Dashboard {
    @Id
    private String _id;
    private String name;
    private String description;

    public Dashboard() {
    }

    public Dashboard(String _id, String name, String description, List<Graph> graph) {
        this._id = _id;
        this.name = name;
        this.description = description;

    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

}