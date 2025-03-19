// This script creates a simple placeholder image for the bunny breeding simulator
// Run it with: node create-placeholder-image.js

const fs = require('fs');

// Create a simple SVG image of a cartoon rabbit
const createRabbitSVG = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#1a1a1a"/>
    <text x="400" y="100" font-family="Arial" font-size="32" text-anchor="middle" fill="#ff6b6b">Bunny Breeding Simulator</text>
    <text x="400" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#fff">Add your own photos named photo-a.jpg, photo-b.jpg, and photo-c.jpg</text>
    
    <!-- First rabbit (male) -->
    <g transform="translate(300, 300) scale(1.5)">
      <path d="M30,30 C20,20 25,15 40,20 C55,10 65,15 70,25 C75,35 75,45 70,50 C60,60 50,50 40,55 C30,55 25,45 30,30 Z" fill="#d3b17d"/>
      <path d="M40,55 C35,60 35,75 50,75 C65,75 65,60 60,55 C60,65 40,65 40,55 Z" fill="#d3b17d"/>
      <circle cx="50" cy="25" r="3" fill="black"/>
      <path d="M40,25 C45,20 55,20 60,25" stroke="black" stroke-width="1"/>
      <path d="M50,30 A2,3 0 0 1 50,35" fill="brown" stroke="none"/>
      <path d="M30,25 L20,20 M30,30 L20,35" stroke="#d3b17d" stroke-width="2" stroke-linecap="round"/>
      <path d="M70,25 L80,20 M70,30 L80,35" stroke="#d3b17d" stroke-width="2" stroke-linecap="round"/>
    </g>
    
    <!-- Second rabbit (female) -->
    <g transform="translate(450, 350) scale(1.5)">
      <path d="M30,30 C20,20 25,15 40,20 C55,10 65,15 70,25 C75,35 75,45 70,50 C60,60 50,50 40,55 C30,55 25,45 30,30 Z" fill="#997755"/>
      <path d="M40,55 C35,60 35,75 50,75 C65,75 65,60 60,55 C60,65 40,65 40,55 Z" fill="#997755"/>
      <circle cx="50" cy="25" r="3" fill="black"/>
      <path d="M40,25 C45,20 55,20 60,25" stroke="black" stroke-width="1"/>
      <path d="M50,30 A2,3 0 0 1 50,35" fill="brown" stroke="none"/>
      <path d="M30,25 L20,20 M30,30 L20,35" stroke="#997755" stroke-width="2" stroke-linecap="round"/>
      <path d="M70,25 L80,20 M70,30 L80,35" stroke="#997755" stroke-width="2" stroke-linecap="round"/>
    </g>
    
    <text x="400" y="500" font-family="Arial" font-size="24" text-anchor="middle" fill="#ff6b6b">Press "START POUNDING" to begin</text>
  </svg>`;
};

// Convert SVG to data URL
const svgToDataUrl = (svg) => {
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
};

// Create an HTML file that contains the image data
const createHTMLWithImage = (dataUrl) => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Placeholder Image</title>
  <style>
    body { margin: 0; padding: 0; background: #1a1a1a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    img { max-width: 100%; height: auto; }
    .download-section { position: fixed; bottom: 20px; left: 0; right: 0; text-align: center; }
    a.download-button { display: inline-block; background: #ff6b6b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-family: Arial; }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="Bunny Breeding Placeholder" />
  <div class="download-section">
    <a href="${dataUrl}" download="photo-a.jpg" class="download-button">Download as photo-a.jpg</a>
  </div>
  <script>
    // Also save data to localStorage
    localStorage.setItem('bunnyPlaceholderImage', '${dataUrl}');
  </script>
</body>
</html>`;
};

// Generate the SVG
const svg = createRabbitSVG();
const dataUrl = svgToDataUrl(svg);

// Save the HTML file
fs.writeFileSync('placeholder-image.html', createHTMLWithImage(dataUrl));

console.log('Created placeholder-image.html - Open this file in your browser to see and download the placeholder image'); 