package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.Question;
import com.example.OMA.Repository.QuestionRepo;

@Service
public class QuestionService {
    
    private final QuestionRepo questionRepo;
    public QuestionService(QuestionRepo questionRepo){
        this.questionRepo = questionRepo;
    }

    //create and update
    public Question saveQuestion(Question question){
        return questionRepo.save(question);
    }

    //read all
    public List<Question> readQuestion(){
        return questionRepo.findAll();
    }

    //read by id
    public Question readQuestionById(Long id){
        return questionRepo.findById(id).orElse(null);
    }

    //delete
    public void deleteQuestion(Long id){
        questionRepo.deleteById(id);
    }
}
