package com.example.fullstackappexample;

import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class FullstackAppExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackAppExampleApplication.class, args);
	}

//	PasswordEncoder passwordEncoder(){
//		return new BCryptPasswordEncoder();
//	}
//	@Bean
//	CommandLineRunner commandLineRunner(UserRepository user){
//		return args -> {
//			user.save(new User("admin", passwordEncoder().encode("password"), LocalDate.of(2023, 01, 01)));
//		};
//	}

}
