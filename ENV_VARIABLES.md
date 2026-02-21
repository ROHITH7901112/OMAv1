# Environment Variables Reference

## Overview

All configuration for the OMA backend is driven by **environment variables**. No hardcoded values, no defaults. This ensures:
- ✅ Development and production use the same code
- ✅ Secrets are never in code or config files
- ✅ Easy configuration across different environments

---

## Required Environment Variables

### Database Configuration

| Variable | Example | Description |
|----------|---------|-------------|
| `DB_URL` | `jdbc:postgresql://localhost:5432/omav1` | PostgreSQL connection URL |
| `DB_USER` | `postgres` | Database username |
| `DB_PASS` | `your-password` | Database password |

**Example:**
```bash
export DB_URL="jdbc:postgresql://localhost:5432/omav1"
export DB_USER="postgres"
export DB_PASS="madhan@123"
```

---

### Logging Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `LOG_LEVEL_ROOT` | `WARN` | `WARN` | Root logger level |
| `LOG_LEVEL_OMA` | `INFO` | `WARN` | OMA application logger |
| `LOG_LEVEL_SERVICE` | `INFO` | `WARN` | Service layer logging |
| `LOG_LEVEL_CONTROLLER` | `INFO` | `WARN` | Controller layer logging |
| `SHOW_SQL` | `true` | `false` | Show SQL queries |

**Levels:** `TRACE` > `DEBUG` > `INFO` > `WARN` > `ERROR`

**Example:**
```bash
export LOG_LEVEL_ROOT="WARN"
export LOG_LEVEL_OMA="INFO"
export SHOW_SQL="true"  # Dev only
```

---

### Cache Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `CACHE_TYPE` | `simple` | `redis` | Cache implementation |

**Options:**
- `simple` - In-memory cache (development)
- `redis` - Distributed cache (production)

**Example:**
```bash
export CACHE_TYPE="simple"  # Development
# OR
export CACHE_TYPE="redis"   # Production (requires Redis server)
```

---

### reCAPTCHA v3 Configuration

| Variable | Example | Description |
|----------|---------|-------------|
| `RECAPTCHA_SECRET_KEY` | `6LePxXAs...` | Secret key from Google Console |

**How to get:**
1. Go to https://www.google.com/recaptcha/admin
2. Select your reCAPTCHA project
3. Copy the "Secret key"

**Example:**
```bash
export RECAPTCHA_SECRET_KEY="6LePxXAsAAAAABbqmqL6gZiPpSIjDGV19BmM0Wa-"
```

---

### CORS Configuration

| Variable | Example | Description |
|----------|---------|-------------|
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Comma-separated allowed domains |

**Development:**
```bash
export ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"
```

**Production:**
```bash
export ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
```

---

### Optional: Redis Configuration

If using `CACHE_TYPE=redis`:

| Variable | Example | Description |
|----------|---------|-------------|
| `REDIS_HOST` | `redis.example.com` | Redis server hostname |
| `REDIS_PORT` | `6379` | Redis server port |

**Example:**
```bash
export REDIS_HOST="your-redis-host.com"
export REDIS_PORT="6379"
```

---

## Quick Start Scripts

### Development Setup

Run once before starting backend:

```bash
source scripts/dev-env.sh
cd "OMA V1"
./mvnw spring-boot:run
```

Or manually:

```bash
export DB_URL="jdbc:postgresql://localhost:5432/omav1"
export DB_USER="postgres"
export DB_PASS="madhan@123"
export SHOW_SQL="true"
export LOG_LEVEL_ROOT="WARN"
export LOG_LEVEL_OMA="INFO"
export LOG_LEVEL_SERVICE="INFO"
export LOG_LEVEL_CONTROLLER="INFO"
export CACHE_TYPE="simple"
export RECAPTCHA_SECRET_KEY="6LePxXAsAAAAABbqmqL6gZiPpSIjDGV19BmM0Wa-"
export ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"

./mvnw spring-boot:run
```

---

### Production Setup

1. Edit `scripts/prod-env.sh` with your actual values:
```bash
# Update with your production values
export DB_URL="jdbc:postgresql://prod-db.com:5432/omav1"
export DB_USER="produser"
export DB_PASS="your-secure-password"
# ... etc
```

2. Load environment variables:
```bash
source scripts/prod-env.sh
```

3. Run with production profile:
```bash
java -jar target/OMA-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
```

---

## Security Checklist

✅ **Never in code:**
- Database passwords
- reCAPTCHA secret keys
- API secrets

✅ **Never in Git:**
- `.env` files (frontend only, ignored)
- `prod-env.sh` with real values
- Application properties with secrets

✅ **Always use:**
- Environment variables
- Secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.)
- Docker secrets for containerized deployments

---

## Troubleshooting

### "Error creating bean with name 'dataSource'"
**Cause:** Missing `DB_URL`, `DB_USER`, or `DB_PASS`

**Fix:**
```bash
export DB_URL="jdbc:postgresql://localhost:5432/omav1"
export DB_USER="postgres"
export DB_PASS="your-password"
```

### "reCAPTCHA Verification failed"
**Cause:** Missing or invalid `RECAPTCHA_SECRET_KEY`

**Fix:**
```bash
export RECAPTCHA_SECRET_KEY="your-valid-secret-key"
```

### "CORS policy blocked"
**Cause:** Frontend domain not in `ALLOWED_ORIGINS`

**Fix:**
```bash
# For localhost:5173
export ALLOWED_ORIGINS="http://localhost:5173"

# For production
export ALLOWED_ORIGINS="https://yourdomain.com"
```

---

## All Variables at a Glance

| Category | Variable | Dev | Prod | Required |
|----------|----------|-----|------|----------|
| Database | `DB_URL` | localhost | prod-db | ✅ Yes |
| Database | `DB_USER` | postgres | produser | ✅ Yes |
| Database | `DB_PASS` | password | secure-pass | ✅ Yes |
| Logging | `LOG_LEVEL_ROOT` | WARN | WARN | ✅ Yes |
| Logging | `LOG_LEVEL_OMA` | INFO | WARN | ✅ Yes |
| Logging | `LOG_LEVEL_SERVICE` | INFO | WARN | ✅ Yes |
| Logging | `LOG_LEVEL_CONTROLLER` | INFO | WARN | ✅ Yes |
| Logging | `SHOW_SQL` | true | false | ✅ Yes |
| Cache | `CACHE_TYPE` | simple | redis | ✅ Yes |
| reCAPTCHA | `RECAPTCHA_SECRET_KEY` | dev-key | prod-key | ✅ Yes |
| CORS | `ALLOWED_ORIGINS` | localhost | yourdomain.com | ✅ Yes |
| Redis | `REDIS_HOST` | - | redis.com | ⚠️ If Redis |
| Redis | `REDIS_PORT` | - | 6379 | ⚠️ If Redis |

---

## Manual Testing

Test if environment variables are set correctly:

```bash
# On macOS/Linux
echo $DB_URL
echo $RECAPTCHA_SECRET_KEY
echo $ALLOWED_ORIGINS

# On Windows (PowerShell)
$env:DB_URL
$env:RECAPTCHA_SECRET_KEY
$env:ALLOWED_ORIGINS
```

---

## Related Files

- [PRODUCTION_SETUP.md](../PRODUCTION_SETUP.md) - Full production deployment guide
- [scripts/dev-env.sh](dev-env.sh) - Development environment setup
- [scripts/prod-env.sh](prod-env.sh) - Production environment template
- [application.properties](../OMA%20V1/src/main/resources/application.properties) - Configuration reference
