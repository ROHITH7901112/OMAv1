package com.example.OMA.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        //m - Allow only frontend domain
        corsConfiguration.setAllowedOrigins(List.of(
            "http://localhost:5173"
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
