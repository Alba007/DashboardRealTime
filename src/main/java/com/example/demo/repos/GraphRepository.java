package com.example.demo.repos;

import com.example.demo.model.Graph;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GraphRepository extends MongoRepository<Graph,String> {

}
