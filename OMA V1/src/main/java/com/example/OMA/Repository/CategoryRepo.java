package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

    List<Category> findAllByOrderByCategoryId();
}
