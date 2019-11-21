package com.example.demo.repos;

import com.example.demo.model.Dashboard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DashboardRepository extends MongoRepository<Dashboard,String> {

}
