package com.example.demo.controller;

import com.example.demo.model.Graph;
import com.example.demo.repos.GraphRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class GraphController {


    private GraphRepository repository;
    private GraphRepository repository1;


    public GraphController(GraphRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/graph")
    public List<Graph> index() {
        return repository.findAll();

    }

    @RequestMapping(value = "/graph/{id}", method = RequestMethod.GET)
    public Graph get(@PathVariable("id") String id) {
        return repository.findById(id).get();
    }


    @RequestMapping(value = "/graph/{id}", method = RequestMethod.PUT)
    public Graph update(@PathVariable("id") String id, @Valid @RequestBody Graph graph) {
        graph.set_id(id);
        repository.save(graph);
        return graph;
    }

    @RequestMapping(value = "/graph", method = RequestMethod.POST)
    public Graph store(@Valid @RequestBody Graph graph) {
        repository.save(graph);

        return graph;
    }

    @RequestMapping(value = "/graph/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        repository.delete(repository.findById(id).get());
    }
//    @RequestMapping(value = "/graph/{id}", method = RequestMethod.DELETE)
//    public void test(@PathVariable String id) {
////        repository1 = repository;
////        repository.delete(repository.get);
//    }
}
