package com.example.OMA.Service;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.Credentials;
import com.example.OMA.Repository.CredentialsRepo;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class CredentialService implements UserDetailsService{

    private final CredentialsRepo credentialsRepo;
    private final PasswordEncoder passwordEncoder;


    public CredentialService(CredentialsRepo credentialsRepo, PasswordEncoder passwordEncoder){
        this.credentialsRepo = credentialsRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(Credentials user) {

        if (credentialsRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set role safely
        if (!user.getRole().startsWith("ROLE_")) {
            user.setRole("ROLE_" + user.getRole());
        }

        credentialsRepo.save(user);
    }    


    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Credentials user = credentialsRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getRole())  // ROLE_ADMIN
                .build();
    }


}
