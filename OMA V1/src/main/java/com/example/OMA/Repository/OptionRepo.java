package com.example.OMA.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Option;

@Repository
public interface OptionRepo extends JpaRepository<Option, Long> {
    
}
