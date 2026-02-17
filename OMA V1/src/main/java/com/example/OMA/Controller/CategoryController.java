package com.example.OMA.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OMA.DTO.CategorySurveyDTO;
import com.example.OMA.Service.CategoryService;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    
    private final CategoryService categoryService;
    
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

<<<<<<< HEAD
=======
    // Get complete survey structure with all questions, sub-questions, and options
>>>>>>> e87a8a4daeaec5336e6f8a76b9070e58f8803296
    @GetMapping("/allquestion")
    public List<CategorySurveyDTO> getAllQuestions(){
        return categoryService.getSurveyStructure();
    }

}
