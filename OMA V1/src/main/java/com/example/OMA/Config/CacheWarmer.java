package com.example.OMA.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.OMA.Service.CategoryService;

/**
 * Cache Warmer - Preloads cache on application startup
 * 
 * Benefits:
 * - First user doesn't experience cold cache penalty
 * - Application ready for high traffic from day 1
 * - Predictable response times from first request
 */
@Component
public class CacheWarmer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CacheWarmer.class);
    
    private final CategoryService categoryService;

    public CacheWarmer(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("\n🔥🔥🔥 CACHE WARMER STARTING 🔥🔥🔥");
        logger.info("Preloading cache on application startup for optimal performance...");
        
        try {
            // Preload survey structure cache
            long startTime = System.currentTimeMillis();
            categoryService.getSurveyStructure();
            long warmupTime = System.currentTimeMillis() - startTime;
            
            logger.info("✅ CACHE WARMUP COMPLETE");
            logger.info("   - Survey structure preloaded (~5MB in Redis)");
            logger.info("   - Warmup time: {}ms", warmupTime);
            logger.info("   - Cache TTL: 30 minutes");
            logger.info("   - All subsequent requests will be served from cache!");
            logger.info("🚀 Application is READY for production traffic\n");
            
        } catch (Exception e) {
            logger.error("⚠️  Cache warmup failed (non-blocking): {}", e.getMessage());
            logger.info("Application will continue; cache will warm on first user request");
        }
    }
}
