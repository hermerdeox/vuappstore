#!/usr/bin/env node

/**
 * VuAppStore Icon Generation Script
 * Generates all required PWA icons from master SVG
 * 
 * Usage: npm run pwa:generate-icons
 * 
 * Requirements:
 * - sharp: npm install sharp --save-dev
 * - Master SVG: /static/icons/vu-logo.svg
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon configurations
const iconSizes = [
  // Standard PWA icons
  { size: 16, name: 'icon-16x16.png' },
  { size: 32, name: 'icon-32x32.png' },
  { size: 48, name: 'icon-48x48.png' },
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
  
  // Favicon sizes
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  
  // Apple Touch Icons
  { size: 57, name: 'apple-touch-icon-57x57.png', background: '#000000' },
  { size: 60, name: 'apple-touch-icon-60x60.png', background: '#000000' },
  { size: 72, name: 'apple-touch-icon-72x72.png', background: '#000000' },
  { size: 76, name: 'apple-touch-icon-76x76.png', background: '#000000' },
  { size: 114, name: 'apple-touch-icon-114x114.png', background: '#000000' },
  { size: 120, name: 'apple-touch-icon-120x120.png', background: '#000000' },
  { size: 144, name: 'apple-touch-icon-144x144.png', background: '#000000' },
  { size: 152, name: 'apple-touch-icon-152x152.png', background: '#000000' },
  { size: 180, name: 'apple-touch-icon-180x180.png', background: '#000000' },
  { size: 180, name: 'apple-touch-icon.png', background: '#000000' },
  
  // Android Chrome Icons
  { size: 36, name: 'android-chrome-36x36.png' },
  { size: 48, name: 'android-chrome-48x48.png' },
  { size: 72, name: 'android-chrome-72x72.png' },
  { size: 96, name: 'android-chrome-96x96.png' },
  { size: 144, name: 'android-chrome-144x144.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 256, name: 'android-chrome-256x256.png' },
  { size: 384, name: 'android-chrome-384x384.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  
  // Microsoft Tiles
  { size: 70, name: 'mstile-70x70.png', background: '#000000' },
  { size: 144, name: 'mstile-144x144.png', background: '#000000' },
  { size: 150, name: 'mstile-150x150.png', background: '#000000' },
  { size: 310, name: 'mstile-310x310.png', background: '#000000', width: 310, height: 310 },
  { size: 310, name: 'mstile-310x150.png', background: '#000000', width: 310, height: 150 },
  
  // Maskable icons (with safe zone)
  { size: 192, name: 'icon-192x192-maskable.png', maskable: true },
  { size: 512, name: 'icon-512x512-maskable.png', maskable: true },
  
  // Shortcut icons
  { size: 192, name: 'shortcut-apps.png', variant: 'apps' },
  { size: 192, name: 'shortcut-store.png', variant: 'store' },
  { size: 192, name: 'shortcut-token.png', variant: 'token' },
  { size: 192, name: 'shortcut-privacy.png', variant: 'privacy' }
];

// Paths
const svgPath = path.join(__dirname, '../static/icons/vu-logo.svg');
const outputDir = path.join(__dirname, '../static/icons/');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if master SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('❌ Master SVG not found:', svgPath);
  console.log('📝 Please ensure /static/icons/vu-logo.svg exists');
  process.exit(1);
}

console.log('🎨 VuAppStore Icon Generation Starting...');
console.log(`📂 Source: ${svgPath}`);
console.log(`📁 Output: ${outputDir}`);
console.log(`🔢 Generating ${iconSizes.length} icon variants`);

// Generate all icons
async function generateIcons() {
  let successCount = 0;
  let errorCount = 0;

  for (const config of iconSizes) {
    try {
      const outputPath = path.join(outputDir, config.name);
      const width = config.width || config.size;
      const height = config.height || config.size;
      
      let sharpInstance = sharp(svgPath).resize(width, height);
      
      // Add background for Apple touch icons and tiles
      if (config.background) {
        sharpInstance = sharpInstance.flatten({ background: config.background });
      }
      
      // Add safe zone for maskable icons
      if (config.maskable) {
        // Add 20% padding for safe zone
        const paddedSize = Math.round(config.size * 0.8);
        const padding = Math.round((config.size - paddedSize) / 2);
        
        sharpInstance = sharp(svgPath)
          .resize(paddedSize, paddedSize)
          .extend({
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          });
      }
      
      await sharpInstance.png().toFile(outputPath);
      
      console.log(`✅ Generated: ${config.name} (${width}x${height})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed: ${config.name}`, error.message);
      errorCount++;
    }
  }

  // Generate favicon.ico
  try {
    const favicon16 = await sharp(svgPath).resize(16, 16).png().toBuffer();
    const favicon32 = await sharp(svgPath).resize(32, 32).png().toBuffer();
    const favicon48 = await sharp(svgPath).resize(48, 48).png().toBuffer();
    
    // Note: This creates individual PNGs. For true .ico, use a specialized library
    fs.writeFileSync(path.join(outputDir, '../favicon.ico'), favicon32);
    console.log('✅ Generated: favicon.ico');
    successCount++;
    
  } catch (error) {
    console.error('❌ Failed: favicon.ico', error.message);
    errorCount++;
  }

  // Summary
  console.log('\n🎉 Icon Generation Complete!');
  console.log(`✅ Success: ${successCount} icons`);
  console.log(`❌ Errors: ${errorCount} icons`);
  
  if (errorCount === 0) {
    console.log('🚀 All icons generated successfully!');
    console.log('📱 PWA is ready for installation testing');
  } else {
    console.log('⚠️  Some icons failed to generate');
    console.log('💡 Install sharp: npm install sharp --save-dev');
  }
}

// Run generation
generateIcons().catch(console.error);

module.exports = { generateIcons };
