package com.example.OMA.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.OMA.Model.User;
import com.example.OMA.Repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;
    
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    
    public Optional<User> getUserById(Long user_id) {
        return userRepo.findById(user_id);
    }
    
    public User createUser(User user) {
        return userRepo.save(user);
    }
    
    public User updateUser(Long userId, User user) {
        if (userRepo.existsById(userId)) {
            return userRepo.save(user);
        }
        return null;
    }
    
    public void deleteUser(Long user_id) {
        userRepo.deleteById(user_id);
    }
    
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
    
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}
