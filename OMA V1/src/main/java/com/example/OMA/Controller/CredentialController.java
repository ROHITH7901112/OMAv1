package com.example.OMA.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.servlet.http.HttpServletResponse;

import com.example.OMA.Model.Credentials;
import com.example.OMA.Service.CredentialService;
import com.example.OMA.Repository.CredentialsRepo;
import com.example.OMA.Util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/credential")
public class CredentialController {
    
    private final CredentialService credentialService;
    private final CredentialsRepo credentialsRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public CredentialController(CredentialService credentialService, CredentialsRepo credentialsRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.credentialService = credentialService;
        this.credentialsRepo = credentialsRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Credentials user) {
        credentialService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials, HttpServletResponse response) {
        try {
            var existingUser = credentialsRepo.findByUsername(credentials.getUsername());
            
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
            
            Credentials user = existingUser.get();
            
            // Verify password
            if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());
            
            // Set JWT in httpOnly cookie (more secure than localStorage)
            response.addHeader("Set-Cookie", 
                String.format("jwt=%s; Path=/; HttpOnly; SameSite=Strict; Max-Age=%d", 
                    token, 
                    30 * 60  // 30 minutes in seconds
                )
            );
            
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("username", user.getUsername());
            responseBody.put("message", "Login successful");
            
            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
        }
    }
    
    @GetMapping("/check")
    public String simple(){
        return "success";
    }
}
