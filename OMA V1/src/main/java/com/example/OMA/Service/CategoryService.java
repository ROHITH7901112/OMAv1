package com.example.OMA.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.example.OMA.Repository.MainQuestionRepo;
import com.example.OMA.Repository.SubQuestionRepo;
import com.example.OMA.Repository.OptionRepo;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;
    private final MainQuestionRepo mainQuestionRepo;
    private final SubQuestionRepo subQuestionRepo;
    private final OptionRepo optionRepo;

    public CategoryService(CategoryRepo categoryRepo,
                           MainQuestionRepo mainQuestionRepo,
                           SubQuestionRepo subQuestionRepo,
                           OptionRepo optionRepo) {
        this.categoryRepo = categoryRepo;
        this.mainQuestionRepo = mainQuestionRepo;
        this.subQuestionRepo = subQuestionRepo;
        this.optionRepo = optionRepo;
    }

    // Create and update
    public Category saveCategory(Category category) {
        return categoryRepo.save(category);
    }

    // Read all
    public List<Category> getCategory() {
        return categoryRepo.findAll();
    }

    // Read by id
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElse(null);
    }

    // Delete
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    /**
     * Builds the complete nested survey structure using the four-query bulk fetch approach.
     * multi query aggregation method to efficiently build the entire survey structure in memory.
     * Step 1: Fetch all categories (ordered).
     * Step 2: Fetch all main questions in one query.
     * Step 3: Fetch all sub questions in one query.
     * Step 4: Fetch all options in one query.
     *
     * Then rebuild the hierarchy using HashMap-based grouping in O(n) time.
     */
    public List<CategorySurveyDTO> getSurveyStructure() {

        // ── Step 1: Bulk fetch all four tables (4 queries total) ──
        List<Category> allCategories        = categoryRepo.findAllByOrderByCategoryId();
        List<MainQuestion> allMainQuestions  = mainQuestionRepo.findAllByOrderByMainQuestionId();
        List<SubQuestion> allSubQuestions    = subQuestionRepo.findAllByOrderBySubQuestionId();
        List<Option> allOptions              = optionRepo.findAllByOrderByOptionId();

        // ── Step 2: Group children using HashMaps with computeIfAbsent ──

        // MainQuestions grouped by categoryId
        Map<Long, List<MainQuestion>> mainQsByCategoryId = new HashMap<>();
        for (MainQuestion mq : allMainQuestions) {
            mainQsByCategoryId.computeIfAbsent(mq.getCategoryId(), k -> new ArrayList<>()).add(mq);
        }

        // SubQuestions grouped by mainQuestionId
        Map<Integer, List<SubQuestion>> subQsByMainQId = new HashMap<>();
        for (SubQuestion sq : allSubQuestions) {
            subQsByMainQId.computeIfAbsent(sq.getMainQuestionId(), k -> new ArrayList<>()).add(sq);
        }

        // Options grouped by subQuestionId (for options that belong to a sub-question)
        Map<Integer, List<Option>> optionsBySubQId = new HashMap<>();
        // Options grouped by mainQuestionId (for options that belong directly to a main question)
        Map<Integer, List<Option>> optionsByMainQId = new HashMap<>();

        for (Option opt : allOptions) {
            if (opt.getSubQuestionId() != null) {
                optionsBySubQId.computeIfAbsent(opt.getSubQuestionId(), k -> new ArrayList<>()).add(opt);
            } else {
                optionsByMainQId.computeIfAbsent(opt.getMainQuestionId(), k -> new ArrayList<>()).add(opt);
            }
        }

        // ── Step 3: Assemble the nested DTO hierarchy ──

        List<CategorySurveyDTO> surveyResult = new ArrayList<>();

        for (Category category : allCategories) {

            List<MainQuestion> mainQuestions =
                    mainQsByCategoryId.getOrDefault(category.getCategoryId(), Collections.emptyList());

            List<MainQuestionResponseDTO> mainQuestionDTOs = new ArrayList<>();

            for (MainQuestion mq : mainQuestions) {

                List<SubQuestion> subQuestions =
                        subQsByMainQId.getOrDefault(mq.getMainQuestionId(), Collections.emptyList());

                List<SubQuestionResponseDTO> subQuestionDTOs = new ArrayList<>();
                List<OptionResponseDTO> directOptionDTOs = new ArrayList<>();

                if (!subQuestions.isEmpty()) {
                    // Attach options to each sub-question
                    for (SubQuestion sq : subQuestions) {
                        List<Option> subOpts =
                                optionsBySubQId.getOrDefault(sq.getSubQuestionId(), Collections.emptyList());

                        List<OptionResponseDTO> subOptDTOs = new ArrayList<>();
                        for (Option opt : subOpts) {
                            subOptDTOs.add(new OptionResponseDTO(
                                    opt.getOptionId(),
                                    opt.getOptionText(),
                                    opt.getScore() != null ? opt.getScore().doubleValue() : null
                            ));
                        }

                        subQuestionDTOs.add(new SubQuestionResponseDTO(
                                sq.getSubQuestionId(),
                                sq.getQuestionText(),
                                sq.getWeight(),
                                subOptDTOs
                        ));
                    }
                } else {
                    // No sub-questions — attach options directly to the main question
                    List<Option> mainOpts =
                            optionsByMainQId.getOrDefault(mq.getMainQuestionId(), Collections.emptyList());

                    for (Option opt : mainOpts) {
                        directOptionDTOs.add(new OptionResponseDTO(
                                opt.getOptionId(),
                                opt.getOptionText(),
                                opt.getScore() != null ? opt.getScore().doubleValue() : null
                        ));
                    }
                }

                mainQuestionDTOs.add(new MainQuestionResponseDTO(
                        mq.getMainQuestionId(),
                        mq.getQuestionText(),
                        mq.getQuestionType(),
                        mq.getWeight(),
                        subQuestionDTOs,
                        directOptionDTOs
                ));
            }

            surveyResult.add(new CategorySurveyDTO(
                    category.getCategoryId(),
                    category.getName(),
                    category.getWeight(),
                    mainQuestionDTOs
            ));
        }

        return surveyResult;
    }
}
