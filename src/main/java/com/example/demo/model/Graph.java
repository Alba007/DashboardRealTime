package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "graph")
public class Graph {
    @Id
    private String _id;
    private String name;
    private String description;
    private String type;
    private String datasource;
    private String dashboard ;
    private Graph() {
    }

    public Graph(String _id, String name, String description, String type, String datasource,String dashboard) {
        this._id = _id;
        this.name = name;
        this.description=description ;
        this.type=type ;
        this.datasource=datasource ;
        this.dashboard=dashboard ;
    }

    public String get_id() {
        return _id;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDatasource() {
        return datasource;
    }

    public String getDashboard() {
        return dashboard;
    }

    public void setDashboard(String dashboard) {
        this.dashboard = dashboard;
    }

    public void setDatasource(String datasource) {
        this.datasource = datasource;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
    }