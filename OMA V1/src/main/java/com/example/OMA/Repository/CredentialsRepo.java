package com.example.OMA.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Credentials;

@Repository
public interface CredentialsRepo extends JpaRepository<Credentials, Long> {
    Optional<Credentials> findByUsername(String username);
}
