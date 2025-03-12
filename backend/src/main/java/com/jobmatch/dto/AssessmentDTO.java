
package com.jobmatch.dto;

import java.util.Map;

public class AssessmentDTO {
    private Long id;
    private Long userId;
    private String type;
    private Integer score;
    private Map<Integer, Integer> answers;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    
    public Map<Integer, Integer> getAnswers() { return answers; }
    public void setAnswers(Map<Integer, Integer> answers) { this.answers = answers; }
}
