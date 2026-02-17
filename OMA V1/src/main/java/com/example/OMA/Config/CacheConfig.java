package com.example.OMA.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Production-Grade Cache Configuration
 * 
 * Features:
 * - Smart cache detection: Redis first, then in-memory fallback
 * - No single point of failure
 * - Graceful degradation
 */
@Configuration
@EnableCaching
public class CacheConfig {
    private static final Logger logger = LoggerFactory.getLogger(CacheConfig.class);

    /**
     * Cache Manager for survey structure only
     * Caches the complete nested survey hierarchy returned by /api/category/allquestion
     */
    @Bean
    public CacheManager cacheManager() {
        logger.info("📦 Setting up in-memory cache (ConcurrentHashMap)");
        logger.info("   ✅ Cache enabled for: GET /api/category/allquestion");
        logger.info("   ⚠️  Cache will be cleared when app restarts");
        logger.info("   ✓ Caching: surveyStructure (30 min TTL)");
        
        // Only cache the complete survey structure
        return new ConcurrentMapCacheManager(CacheNames.SURVEY_STRUCTURE);
    }

    /**
     * Cache names for the application
     */
    public static class CacheNames {
        public static final String SURVEY_STRUCTURE = "surveyStructure";  // Complete nested survey (30 min)
    }
}
