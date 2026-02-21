# Production Setup Guide

## Overview
The application is now configured to be **production-ready**. All sensitive values use **environment variables** that can be easily changed when you buy your domain.

---

## Current Setup (Development)

### Frontend
- **URL**: `http://localhost:5173`
- **Configuration**: `.env` file (uses localhost)

### Backend  
- **URL**: `http://localhost:8080`
- **Database**: PostgreSQL on `localhost:5432`
- **Configuration**: `application.properties` (uses localhost)

---

## When You Buy Your Domain

### Step 1: Update Frontend Configuration

Modify the frontend `docker-compose.yml` or your deployment:

```bash
# Replace with your actual domain
export VITE_API_BASE_URL=https://api.yourdomain.com
export VITE_RECAPTCHA_SITE_KEY=your-production-site-key
```

**Or** update `OMA - frontend/.env.production`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_RECAPTCHA_SITE_KEY=your-production-recaptcha-key
```

### Step 2: Update Backend Configuration

Set these environment variables before starting the backend:

```bash
# Database
export DB_URL=jdbc:postgresql://your-prod-db.com:5432/omav1-prod
export DB_USER=your-db-user
export DB_PASS=your-secure-password

# CORS - Allow your domain
export ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# reCAPTCHA
export RECAPTCHA_SECRET_KEY=your-production-secret-key

# Logging (reduce verbosity in production)
export LOG_LEVEL_ROOT=WARN
export LOG_LEVEL_OMA=INFO

# Cache type (for production, use redis instead of simple)
# export CACHE_TYPE=redis
```

### Step 3: Run Backend in Production Mode

```bash
java -jar target/OMA-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
```

Or set environment variables and run normally:
```bash
./mvnw spring-boot:run
```

---

## Environment Variables Reference

### Database
| Variable | Default | Production Example |
|----------|---------|------------------|
| `DB_URL` | `jdbc:postgresql://localhost:5432/omav1` | `jdbc:postgresql://prod-db.yourdomain.com:5432/omav1-prod` |
| `DB_USER` | `postgres` | `produser` |
| `DB_PASS` | `madhan@123` | `your-very-secure-password-here` |

### Frontend
| Variable | Default | Production Example |
|----------|---------|------------------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | `https://api.yourdomain.com` |
| `VITE_RECAPTCHA_SITE_KEY` | Dev key | Production site key from Google Console |

### Backend - CORS
| Variable | Default | Production Example |
|----------|---------|------------------|
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | `https://yourdomain.com,https://www.yourdomain.com` |

### Backend - Logging
| Variable | Default (Dev) | Production |
|----------|---------------|------------|
| `LOG_LEVEL_ROOT` | `WARN` | `WARN` |
| `LOG_LEVEL_OMA` | `INFO` | `INFO` |
| `SHOW_SQL` | `true` | `false` |

### reCAPTCHA
| Variable | Default | Production |
|----------|---------|------------|
| `RECAPTCHA_SECRET_KEY` | Dev key | Production secret from Google Console |

### Cache
| Variable | Default | Production |
|----------|---------|------------|
| `CACHE_TYPE` | `simple` | `redis` (when Redis is setup) |

---

## Google reCAPTCHA Setup

### For Production:

1. Go to [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Create a NEW reCAPTCHA project for your domain
3. Add your domain(s):
   - `yourdomain.com`
   - `www.yourdomain.com`
4. Copy the **Site Key** and **Secret Key**
5. Set environment variables:
   ```bash
   export VITE_RECAPTCHA_SITE_KEY=your-production-site-key
   export RECAPTCHA_SECRET_KEY=your-production-secret-key
   ```

---

## Deployment Checklist

### Frontend
- [ ] Build optimized bundle: `npm run build`
- [ ] Deploy `dist/` folder to CDN or web server
- [ ] Frontend URL: `https://yourdomain.com`
- [ ] API URL: `https://api.yourdomain.com`

### Backend
- [ ] Build JAR: `./mvnw clean package -DskipTests`
- [ ] Set environment variables
- [ ] Run with production profile: `java -jar app.jar --spring.profiles.active=production`
- [ ] Backend URL: `https://api.yourdomain.com:8443` (if using HTTPS)
- [ ] Database connection verified

### Database
- [ ] PostgreSQL running on production server
- [ ] Database `omav1-prod` created
- [ ] User created with secure password
- [ ] Backups configured

### Security
- [ ] SSL/HTTPS certificates installed
- [ ] Database password changed from default
- [ ] reCAPTCHA keys updated
- [ ] CORS origins restricted to your domain
- [ ] Logging set to WARN level

---

## Local Development

**No changes needed!** Continue using:

```bash
# Terminal 1 - Frontend
cd "OMA - frontend"
npm run dev
# Access at: http://localhost:5173

# Terminal 2 - Backend
cd "OMA V1"
./mvnw spring-boot:run
# Runs at: http://localhost:8080
```

---

## Quick Domain Switch

When you're ready to go production:

1. **Update `.env.production` file** in frontend:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   VITE_RECAPTCHA_SITE_KEY=your-production-key
   ```

2. **Set backend environment variables**:
   ```bash
   export DB_URL=jdbc:postgresql://your-db-server:5432/omav1
   export DB_USER=your-user
   export DB_PASS=your-password
   export ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   export RECAPTCHA_SECRET_KEY=your-production-secret
   ```

3. **Build and deploy**:
   ```bash
   npm run build       # Frontend
   ./mvnw package      # Backend
   ```

That's it! No code changes needed. 🎉

---

## Troubleshooting

### CORS Error in Production
- Check `ALLOWED_ORIGINS` includes your domain
- Ensure frontend and backend are on correct domains

### Database Connection Failed
- Verify `DB_URL`, `DB_USER`, `DB_PASS` are correct
- Check database server is accessible from backend

### reCAPTCHA Returns 0.0 Score
- Verify domain is added in Google reCAPTCHA Console
- Check `RECAPTCHA_SECRET_KEY` matches production keys

---

## Security Notes

⚠️ **NEVER commit sensitive values to Git:**
- Database passwords
- reCAPTCHA secret keys
- API keys

These files are in `.gitignore`:
- `.env.production` (local)
- `*.properties` with secrets

Use environment variables or secure secret management (AWS Secrets Manager, HashiCorp Vault, etc.)

