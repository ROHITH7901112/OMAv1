package com.example.OMA.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Cache Performance Monitor for Production Observability
 * 
 * Tracks:
 * - Cache hits vs misses
 * - Hit rate percentage
 * - Active request counts
 * - Performance metrics
 */
@Component
public class CacheMonitor {
    private static final Logger logger = LoggerFactory.getLogger(CacheMonitor.class);

    private final ConcurrentHashMap<String, AtomicLong> cacheHits = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, AtomicLong> cacheMisses = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> executionTimes = new ConcurrentHashMap<>();

    /**
     * Record cache hit
     */
    public void recordHit(String cacheName) {
        cacheHits.computeIfAbsent(cacheName, k -> new AtomicLong(0)).incrementAndGet();
        
        long hits = cacheHits.get(cacheName).get();
        long misses = cacheMisses.getOrDefault(cacheName, new AtomicLong(0)).get();
        double hitRate = (hits / (double)(hits + misses)) * 100;
        
        logger.info("✓ CACHE HIT [{}] | Hit Rate: {:.2f}% | Hits: {} | Misses: {}", 
            cacheName, hitRate, hits, misses);
    }

    /**
     * Record cache miss
     */
    public void recordMiss(String cacheName, long executionTimeMs) {
        cacheMisses.computeIfAbsent(cacheName, k -> new AtomicLong(0)).incrementAndGet();
        executionTimes.put(cacheName, executionTimeMs);
        
        long hits = cacheHits.getOrDefault(cacheName, new AtomicLong(0)).get();
        long misses = cacheMisses.get(cacheName).get();
        double hitRate = (hits / (double)(hits + misses)) * 100;
        
        logger.warn("⚠️  CACHE MISS [{}] | Execution: {}ms | Hit Rate: {:.2f}% | Hits: {} | Misses: {}", 
            cacheName, executionTimeMs, hitRate, hits, misses);
    }

    /**
     * Get cache statistics
     */
    public void printStatistics() {
        logger.info("=== CACHE STATISTICS ===");
        cacheHits.forEach((cacheName, hits) -> {
            long misses = cacheMisses.getOrDefault(cacheName, new AtomicLong(0)).get();
            long totalRequests = hits.get() + misses;
            double hitRate = totalRequests > 0 ? (hits.get() / (double)totalRequests) * 100 : 0;
            long executionTime = executionTimes.getOrDefault(cacheName, 0L);
            
            logger.info("Cache: {} | Hits: {} | Misses: {} | Total: {} | Hit Rate: {:.2f}% | Last Execution: {}ms",
                cacheName, hits.get(), misses, totalRequests, hitRate, executionTime);
        });
        logger.info("========================");
    }

    /**
     * Reset statistics (useful for testing)
     */
    public void reset() {
        cacheHits.clear();
        cacheMisses.clear();
        executionTimes.clear();
        logger.info("Cache statistics reset");
    }
}
