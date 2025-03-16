
package com.jobmatch.service;

import com.jobmatch.model.User;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }
                user.setSkills(updatedUser.getSkills());
                return userRepository.save(user);
            });
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    public boolean authenticate(String email, String password) {
        return userRepository.findByEmail(email)
            .map(user -> passwordEncoder.matches(password, user.getPassword()))
            .orElse(false);
    }
    
    /**
     * Change user's password
     * @param id User ID
     * @param currentPassword Current password for verification
     * @param newPassword New password to set
     * @return true if password changed successfully, false otherwise
     */
    public boolean changePassword(Long id, String currentPassword, String newPassword) {
        return userRepository.findById(id)
            .filter(user -> passwordEncoder.matches(currentPassword, user.getPassword()))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            })
            .orElse(false);
    }
}
