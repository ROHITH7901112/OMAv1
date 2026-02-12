package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.OMA.Model.Assessment;
import com.example.OMA.Model.User;
import com.example.OMA.Model.UserResponse;

@Repository
public interface UserResponseRepo extends JpaRepository<UserResponse, Long> {
    List<UserResponse> findByUser(User user);
    List<UserResponse> findByAssessment(Assessment assessment);
    List<UserResponse> findByUserAndAssessment(User user, Assessment assessment);
}
