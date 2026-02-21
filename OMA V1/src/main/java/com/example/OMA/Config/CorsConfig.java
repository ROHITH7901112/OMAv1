package com.example.OMA.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
    private String allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
<<<<<<< HEAD
        //m - Allow only frontend domain
        corsConfiguration.setAllowedOrigins(List.of(
            "http://localhost:5173"
=======
        
        // Parse allowed origins from environment variable or use defaults
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        corsConfiguration.setAllowedOriginPatterns(origins);
        corsConfiguration.setAllowedHeaders(Arrays.asList(
            "Origin", "Access-Control-Allow-Origin", "Content-Type",
            "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
            "Access-Control-Request-Method", "Access-Control-Request-Headers"
>>>>>>> 271d10c8c9e03aaff7ac8203c9d5143849f18ef7
        ));

        //m - set allow header and expose header
        // corsConfiguration.setAllowedHeaders(List.of("content-type", "Authorization", "X-XSRF-TOKEN"));
        corsConfiguration.setAllowedHeaders(List.of("content-type"));

        corsConfiguration.setExposedHeaders(List.of());

        corsConfiguration.setAllowCredentials(true);

        //m - set allowed methods
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST"));

        //m - cache
        corsConfiguration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
