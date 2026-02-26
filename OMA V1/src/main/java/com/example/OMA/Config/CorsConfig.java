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

    // @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
    // @Value("${app.cors.allowed-origins}")
     @Value("${app.cors.allowed-origins:http}")
    private List<String> allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //m - Allow only frontend domain
        corsConfiguration.setAllowedOrigins(allowedOrigins); 

        //m - set allow header and expose header
        corsConfiguration.setAllowedHeaders(List.of("content-type"));

        corsConfiguration.setExposedHeaders(List.of());

        corsConfiguration.setAllowCredentials(true);

        //m - set allowed methods
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS"));

        //m - cache
        corsConfiguration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
