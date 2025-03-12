
package com.jobmatch.controller;

import com.jobmatch.dto.AuthRequestDTO;
import com.jobmatch.dto.AuthResponseDTO;
import com.jobmatch.dto.UserDTO;
import com.jobmatch.model.User;
import com.jobmatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        
        // Convert to DTO
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setName(createdUser.getName());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setSkills(createdUser.getSkills());
        
        // Generate mock token (in a real app, use JWT)
        String token = UUID.randomUUID().toString();
        
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setUser(userDTO);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        boolean isAuthenticated = userService.authenticate(request.getEmail(), request.getPassword());
        
        if (isAuthenticated) {
            User user = userService.getUserByEmail(request.getEmail()).orElseThrow();
            
            // Convert to DTO
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setEmail(user.getEmail());
            userDTO.setSkills(user.getSkills());
            
            // Generate mock token (in a real app, use JWT)
            String token = UUID.randomUUID().toString();
            
            AuthResponseDTO response = new AuthResponseDTO();
            response.setToken(token);
            response.setUser(userDTO);
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
