
package com.jobmatch.dto;

import java.util.List;

public class ResumeDTO {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private List<String> skills;
    private List<String> experience;
    private List<String> education;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    
    public List<String> getExperience() { return experience; }
    public void setExperience(List<String> experience) { this.experience = experience; }
    
    public List<String> getEducation() { return education; }
    public void setEducation(List<String> education) { this.education = education; }
}
