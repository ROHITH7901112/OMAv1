package com.example.OMA.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    
}
