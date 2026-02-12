package com.example.OMA.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.OMA.Model.Assessment;
import com.example.OMA.Model.User;
import com.example.OMA.Model.UserResponse;
import com.example.OMA.Repository.UserResponseRepo;

@Service
public class UserResponseService {
    
    @Autowired
    private UserResponseRepo userResponseRepo;
    
    public List<UserResponse> getAllResponses() {
        return userResponseRepo.findAll();
    }
    
    public Optional<UserResponse> getResponseById(Long response_id) {
        return userResponseRepo.findById(response_id);
    }
    
    public UserResponse createResponse(UserResponse userResponse) {
        return userResponseRepo.save(userResponse);
    }
    
    public UserResponse updateResponse(Long response_id, UserResponse userResponse) {
        if (userResponseRepo.existsById(response_id)) {
            return userResponseRepo.save(userResponse);
        }
        return null;
    }
    
    public void deleteResponse(Long response_id) {
        userResponseRepo.deleteById(response_id);
    }
    
    public List<UserResponse> getResponsesByUser(User user) {
        return userResponseRepo.findByUser(user);
    }
    
    public List<UserResponse> getResponsesByAssessment(Assessment assessment) {
        return userResponseRepo.findByAssessment(assessment);
    }
    
    public List<UserResponse> getResponsesByUserAndAssessment(User user, Assessment assessment) {
        return userResponseRepo.findByUserAndAssessment(user, assessment);
    }
}
