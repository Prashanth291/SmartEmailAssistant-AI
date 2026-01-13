package com.email.writer.controller;


import com.email.writer.model.EmailRequest;
import com.email.writer.service.EmailGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService service;
    public EmailGeneratorController(EmailGeneratorService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest)
    {
        String response = service.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
