package com.example.OMA.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OMA.Service.CategoryService;

import java.util.HashMap;
import java.util.Map;

/**
 * Cache Management REST API
 * 
 * Endpoints:
 * - GET /api/cache/status        - View cache configuration
 * - GET /api/cache/statistics    - View cache hit/miss statistics
 * - POST /api/cache/warm         - Preload cache manually
 * - DELETE /api/cache/clear      - Clear all caches (admin only)
 */
@RestController
@RequestMapping("/api/cache")
public class CacheController {
    private static final Logger logger = LoggerFactory.getLogger(CacheController.class);

    @Autowired
    private CacheManager cacheManager;
    
    @Autowired
    private CategoryService categoryService;

    /**
     * Get cache status and configuration
     * Returns info about active caches and their settings
     */
    @GetMapping("/status")
    public ResponseEntity<?> getCacheStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            status.put("backend", "In-Memory (ConcurrentHashMap)");
            status.put("caches", cacheManager.getCacheNames());
            status.put("configuration", Map.of(
                "surveyStructure_ttl_minutes", 30,
                "categoryList_ttl_minutes", 15,
                "questionList_ttl_minutes", 15,
                "subQuestionList_ttl_minutes", 15,
                "optionList_ttl_minutes", 10
            ));
            status.put("message", "Cache system is operational");
            
            logger.info("📊 Cache status requested");
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            logger.error("⚠️  Cache status check failed: {}", e.getMessage());
            status.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(status);
        }
    }

    /**
     * Get cache statistics
     * Shows cache names and monitoring info
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getCacheStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            stats.put("active_caches", cacheManager.getCacheNames());
            stats.put("message", "Monitor application logs for cache hit/miss messages");
            stats.put("timestamp", System.currentTimeMillis());
            stats.put("log_patterns", Map.of(
                "cache_hit", "✓ CACHE HIT [cacheName]",
                "cache_miss", "⚡ CACHE MISS: [message]",
                "invalidation", "💾 Saving/Updating... | Cache invalidated"
            ));
            
            logger.info("📈 Cache statistics requested");
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            logger.error("⚠️  Cache statistics retrieval failed: {}", e.getMessage());
            stats.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(stats);
        }
    }

    /**
     * Manually warm/preload cache
     * Useful for testing or forcing cache refresh
     */
    @PostMapping("/warm")
    public ResponseEntity<?> warmCache() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            long startTime = System.currentTimeMillis();
            
            logger.info("🔥 Cache warmup initiated manually");
            categoryService.getSurveyStructure();
            
            long warmupTime = System.currentTimeMillis() - startTime;
            
            result.put("status", "SUCCESS");
            result.put("action", "Cache preloaded");
            result.put("warmup_time_ms", warmupTime);
            result.put("cache_names", cacheManager.getCacheNames());
            result.put("message", "Survey structure cache warmed successfully");
            
            logger.info("✅ Manual cache warmup completed in {}ms", warmupTime);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("⚠️  Manual cache warmup failed: {}", e.getMessage());
            result.put("status", "ERROR");
            result.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(result);
        }
    }

    /**
     * Clear all caches
     * WARNING: Use with caution in production
     */
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCache() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            logger.warn("🗑️  CLEARING ALL CACHES - This will force database queries for next request");
            
            // Clear all caches
            cacheManager.getCacheNames().forEach(cacheName -> {
                if (cacheManager.getCache(cacheName) != null) {
                    cacheManager.getCache(cacheName).clear();
                    logger.info("   Cleared cache: {}", cacheName);
                }
            });
            
            result.put("status", "SUCCESS");
            result.put("action", "All caches cleared");
            result.put("cleared_caches", cacheManager.getCacheNames());
            result.put("warning", "Next surveys query will rebuild cache");
            
            logger.info("✅ All caches cleared successfully");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("⚠️  Cache clear failed: {}", e.getMessage());
            result.put("status", "ERROR");
            result.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(result);
        }
    }

}

