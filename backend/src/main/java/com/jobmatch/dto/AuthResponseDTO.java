
package com.jobmatch.dto;

public class AuthResponseDTO {
    private String token;
    private UserDTO user;
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
}
