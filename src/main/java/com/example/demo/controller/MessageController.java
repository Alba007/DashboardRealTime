//package com.example.demo.controller;
//import com.example.demo.repos.SensorRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.CrossOrigin;
//
//@CrossOrigin
//@Controller
//public class MessageController {
//    @Autowired
//    private SensorRepository repository;
//
//    @MessageMapping("/send/message")
//    @SendTo("/sensor")
//    public String get(String message)   {
//        System.out.println(message);
//        return message ;
//    }
//}
