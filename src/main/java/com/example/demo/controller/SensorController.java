package com.example.demo.controller;

import com.example.demo.model.AddSensor;
import com.example.demo.model.DeleteSensor;
import com.example.demo.model.Sensor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.repos.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class SensorController {
    private final SimpMessagingTemplate template;

    @Autowired
    private SensorRepository repository;

    @Autowired
    SensorController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/sensor")
    public List<Sensor> index() {
        return repository.findAll();

    }

    @RequestMapping(value = "/sensor/{id}", method = RequestMethod.GET)
    public Sensor get(@PathVariable("id") String id) {
        return repository.findById(id).get();
    }


    @RequestMapping(value = "/sensor/{id}", method = RequestMethod.PUT)
    public Sensor update(@PathVariable("id") String id, @Valid @RequestBody Sensor sensor) {
        sensor.set_id(id);
        repository.save(sensor);
        AddSensor sensorInfo=new AddSensor("update",sensor.get_id(),sensor.getName(),
                sensor.getDescription(),sensor.getworkTime(),sensor.getData(),sensor.getGpsData());
        this.template.convertAndSend("/send/sensor",sensorInfo.toString()) ;
        return sensor;
    }

    @RequestMapping(value = "/sensor", method = RequestMethod.POST)
    public Sensor store(@Valid @RequestBody Sensor sensor) {
        repository.save(sensor);
        AddSensor sensorInfo=new AddSensor("post",sensor.get_id(),sensor.getName(),
                  sensor.getDescription(),sensor.getworkTime(),sensor.getData(),sensor.getGpsData());
        this.template.convertAndSend("/send/sensor", sensorInfo.toString());
        System.out.println(sensorInfo.toString());
        return sensor;
    }

    @RequestMapping(value = "/sensor/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) {
        repository.delete(repository.findById(id).get());
        DeleteSensor sensorInfo=new DeleteSensor("delete",id) ;
        this.template.convertAndSend("/send/sensor", sensorInfo.toString());
    }
}
