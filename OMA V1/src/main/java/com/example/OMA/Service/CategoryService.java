package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.Category;
import com.example.OMA.Repository.CategoryRepo;

@Service
public class CategoryService {
    
    private final CategoryRepo categoryRepo;
    public CategoryService(CategoryRepo categoryrepo){
        this.categoryRepo = categoryrepo;
    }

    //create and update
    public Category saveCategory(Category category){
        return categoryRepo.save(category);
    }

    //read
    public List<Category> getCategory(){
        return categoryRepo.findAll();
    }

    //read by id
    public Category getCategoryById(Long id){
        return categoryRepo.findById(id).orElse(null);
    }

    //delete
    public void deleteCategory(Long id){
        categoryRepo.deleteById(id);
    }
}
