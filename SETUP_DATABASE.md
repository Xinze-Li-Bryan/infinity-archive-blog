# Gallery Database Setup Guide

This guide will help you set up Vercel Postgres for your gallery system.

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project (`lixinze-web`)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a database name (e.g., `lixinze-gallery`)
7. Select a region (choose closest to your users)
8. Click **Create**

## Step 2: Connect Database to Your Project

Vercel will automatically add the following environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

These are automatically available in your deployed app. For local development:

1. Run `vercel env pull .env.local` in your project directory
2. This will download all environment variables to `.env.local`

## Step 3: Initialize the Database

After deploying your code to Vercel:

1. Visit: `https://lixinze.xyz/api/gallery/init`
2. This will create the necessary tables:
   - `categories` table (for gallery categories)
   - `images` table (for gallery images)

You should see: `{"success": true}`

## Step 4: Start Using Your Gallery

Now you can:
1. Go to `https://lixinze.xyz/admin` and login
2. Create categories and upload images
3. All data is stored in Vercel Postgres
4. View your gallery at `https://lixinze.xyz/gallery`

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Images Table
```sql
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  category_id VARCHAR(255) REFERENCES categories(id) ON DELETE CASCADE,
  src TEXT NOT NULL,  -- Base64 encoded image data
  alt VARCHAR(255),
  title VARCHAR(255),
  date VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Important Notes

### Image Storage
- Images are stored as base64 data URLs in the database
- This is simple but has limitations:
  - **Maximum size**: Keep images under 1-2MB (compressed)
  - **Database size**: Vercel Postgres free tier has 256MB limit
  - For large galleries, consider upgrading to Vercel Blob storage

### Free Tier Limits
- **Storage**: 256 MB
- **Compute**: 60 hours/month
- **Rows**: No hard limit, but watch storage size

### Best Practices
1. **Compress images** before uploading (use tools like TinyPNG)
2. **Resize images** to reasonable dimensions (e.g., 1200x1200px max)
3. **Monitor database size** in Vercel dashboard
4. **Backup data** regularly (export via Vercel CLI)

## Troubleshooting

### "Database connection failed"
- Check that you've initialized the database at `/api/gallery/init`
- Verify environment variables are set in Vercel

### "Out of storage"
- Check database size in Vercel dashboard
- Delete unused images
- Consider upgrading to paid plan
- Or migrate to Vercel Blob for image storage

### Images not displaying
- Check browser console for errors
- Verify base64 data is valid
- Ensure images aren't too large

## Future Upgrades

If you need to handle more/larger images, consider:
1. **Vercel Blob**: Dedicated file storage ($0.15/GB)
2. **Cloudinary**: Image hosting and optimization
3. **AWS S3**: Large-scale storage

But for a personal gallery with moderate usage, the current setup should work well!
