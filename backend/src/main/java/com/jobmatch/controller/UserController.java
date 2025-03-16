
package com.jobmatch.controller;

import com.jobmatch.dto.UserDTO;
import com.jobmatch.model.User;
import com.jobmatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setName(user.getName());
                userDTO.setEmail(user.getEmail());
                userDTO.setSkills(user.getSkills());
                return ResponseEntity.ok(userDTO);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser)
            .map(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setName(user.getName());
                userDTO.setEmail(user.getEmail());
                userDTO.setSkills(user.getSkills());
                return ResponseEntity.ok(userDTO);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/skills")
    public ResponseEntity<java.util.List<String>> getUserSkills(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(user -> ResponseEntity.ok(user.getSkills()))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id, 
            @RequestBody Map<String, String> passwordData) {
        
        String currentPassword = passwordData.get("currentPassword");
        String newPassword = passwordData.get("newPassword");
        
        if (currentPassword == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Current password and new password are required");
        }
        
        boolean changed = userService.changePassword(id, currentPassword, newPassword);
        
        if (changed) {
            return ResponseEntity.ok().body(Map.of("message", "Password updated successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to update password. Current password may be incorrect."));
        }
    }
}
