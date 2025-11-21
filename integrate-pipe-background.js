const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app', 'page.tsx');

console.log('📝 Reading page.tsx...');
let content = fs.readFileSync(pagePath, 'utf8');

// Step 1: Add import after line 31
console.log('✅ Step 1: Adding import...');
const importLine = "import PipeBackground from '../components/PipeBackgroundClient';";
if (!content.includes(importLine)) {
  content = content.replace(
    "import React, { useEffect, useState } from 'react';",
    "import React, { useEffect, useState } from 'react';\nimport PipeBackground from '../components/PipeBackgroundClient';"
  );
}

// Step 2: Replace background section
console.log('✅ Step 2: Replacing hero background...');
const oldBackground =
  /\s*{\/\* Background Images & Effects \*\/}[\s\S]*?{\/\* The "Glossy Pipe" Texture that gets revealed \*\/}[\s\S]*?<\/div>\s*<\/div>/;

const newBackground = `        {/* Background: Three.js OCTG Pipe with Laser Scan */}
        <PipeBackground />

        {/* Shop Image as subtle backdrop (reduced opacity) */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <Image
              src="/images/shop.png"
              alt="MPS 136 Acre Facility"
              fill
              className="object-cover opacity-10 brightness-50 contrast-125 grayscale mix-blend-overlay"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[#050505]/60"></div>
        </div>`;

content = content.replace(oldBackground, newBackground);

console.log('💾 Writing changes...');
fs.writeFileSync(pagePath, content, 'utf8');

console.log('✨ Done! Integration complete!');
console.log('\n🚀 The 3D pipe background is now active');
console.log('   Check http://localhost:3000 to see it in action!\n');
