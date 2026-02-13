package com.example.OMA.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.DTO.CategorySurveyDTO;
import com.example.OMA.DTO.MainQuestionResponseDTO;
import com.example.OMA.DTO.OptionResponseDTO;
import com.example.OMA.DTO.SubQuestionResponseDTO;
import com.example.OMA.Model.Category;
import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Model.Option;
import com.example.OMA.Model.SubQuestion;
import com.example.OMA.Repository.CategoryRepo;

@Service
public class CategoryService {
    
    private final CategoryRepo categoryRepo;
    private final MainQuestionService mainQuestionService;
    private final SubQuestionService subQuestionService;
    private final OptionService optionService;

    public CategoryService(CategoryRepo categoryrepo, MainQuestionService mainQuestionService,
                          SubQuestionService subQuestionService, OptionService optionService){
        this.categoryRepo = categoryrepo;
        this.mainQuestionService = mainQuestionService;
        this.subQuestionService = subQuestionService;
        this.optionService = optionService;
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

    // Get complete survey structure with nested questions and options
    public List<CategorySurveyDTO> getSurveyStructure(){
        List<CategorySurveyDTO> surveyList = new ArrayList<>();
        List<Category> categories = getCategory();

        for(Category category : categories) {
            List<MainQuestion> mainQuestions = mainQuestionService.getQuestionsByCategory(category);
            List<MainQuestionResponseDTO> questionDTOs = new ArrayList<>();

            for(MainQuestion mainQ : mainQuestions) {
                // First, get sub-questions for this main question
                List<SubQuestion> subQuestions = subQuestionService.getSubQuestionsByMainQuestion(mainQ);
                List<SubQuestionResponseDTO> subQuestionDTOs = new ArrayList<>();
                List<OptionResponseDTO> mainOptionDTOs = new ArrayList<>();

                if(!subQuestions.isEmpty()) {
                    // If sub-questions exist, get options for each sub-question
                    for(SubQuestion subQ : subQuestions) {
                        List<Option> subOptions = optionService.getOptionsBySubQuestion(subQ);
                        List<OptionResponseDTO> subOptionDTOs = new ArrayList<>();
                        for(Option opt : subOptions) {
                            subOptionDTOs.add(new OptionResponseDTO(
                                opt.getOptionId(),
                                opt.getOptionText(),
                                opt.getScore() != null ? opt.getScore().doubleValue() : null
                            ));
                        }

                        subQuestionDTOs.add(new SubQuestionResponseDTO(
                            subQ.getSubQuestionId(),
                            subQ.getQuestionText(),
                            subQ.getWeight(),
                            subOptionDTOs
                        ));
                    }
                    // mainOptionDTOs stays empty for questions with sub-questions
                } else {
                    // No sub-questions, so get options directly for this main question
                    List<Option> mainOptions = optionService.getOptionsByMainQuestion(mainQ);
                    for(Option opt : mainOptions) {
                        mainOptionDTOs.add(new OptionResponseDTO(
                            opt.getOptionId(),
                            opt.getOptionText(),
                            opt.getScore() != null ? opt.getScore().doubleValue() : null
                        ));
                    }
                }

                questionDTOs.add(new MainQuestionResponseDTO(
                    mainQ.getMainQuestionId(),
                    mainQ.getQuestionText(),
                    mainQ.getQuestionType(),
                    mainQ.getWeight(),
                    mainOptionDTOs,
                    subQuestionDTOs
                ));
            }

            surveyList.add(new CategorySurveyDTO(
                category.getCategoryId().intValue(),
                category.getName(),
                category.getWeight(),
                questionDTOs
            ));
        }

        return surveyList;
    }
}
