package com.example.OMA.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.OMA.Model.UserResponse;
import com.example.OMA.Service.UserResponseService;

@RestController
@RequestMapping("/api/responses")
public class UserResponseController {
    
    @Autowired
    private UserResponseService userResponseService;
    
    @GetMapping
    public List<UserResponse> getAllResponses() {
        return userResponseService.getAllResponses();
    }
    
    @GetMapping("/{response_id}")
    public UserResponse getResponseById(@PathVariable Long response_id) {
        return userResponseService.getResponseById(response_id).orElse(null);
    }
    
    @PostMapping
    public UserResponse createResponse(@RequestBody UserResponse userResponse) {
        return userResponseService.createResponse(userResponse);
    }
    
    @PutMapping("/{response_id}")
    public UserResponse updateResponse(@PathVariable Long response_id, @RequestBody UserResponse userResponse) {
        return userResponseService.updateResponse(response_id, userResponse);
    }
    
    @DeleteMapping("/{response_id}")
    public void deleteResponse(@PathVariable Long response_id) {
        userResponseService.deleteResponse(response_id);
    }
}
