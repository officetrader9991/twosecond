# Bunny Breeding Simulator

An interactive web application that simulates rabbit breeding with a spacebar-based pounding mechanism, using real rabbit breeding photos.

![Bunny Breeding Simulator](screenshot.png)
*Note: Replace this with an actual screenshot after deployment*

## Overview

This website provides a unique interactive experience where users click a "START POUNDING" button and then use the spacebar to simulate rabbit breeding. The application includes a timer that records how long it takes the user to complete the action.

## Images

The simulation uses three real photos of rabbits breeding:
- **Photo A**: Initial position (tan rabbit mounting a darker rabbit)
- **Photo B**: Slight variation of position A (for animation when pressing spacebar)
- **Photo C**: Final position shown after completion

## Setup Instructions

### Option 1: Local Setup

#### 1. Add Your Photos

The simulator needs three images:
1. **photo-a.jpg** - Initial rabbit breeding position 
2. **photo-b.jpg** - Alternate position (shown when pressing spacebar)
3. **photo-c.jpg** - Final "completion" position shown after inactivity

Make sure these images are saved in the root folder of the project with the exact filenames listed above.

#### 2. Start the Server

Run the included server script to start a local web server:

```bash
# Make the script executable (if needed)
chmod +x start_server.sh

# Run the server
./start_server.sh
```

The script will automatically open your default web browser and display the website.

### Option 2: Vercel Deployment

For deploying to Vercel, follow the instructions in the [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md) file.

## How to Use

1. When the page loads, you'll see a blurred version of the first breeding photo with a "START POUNDING" button
2. Click the button to begin
3. Rapidly press the spacebar key to alternate between Photo A and Photo B, creating an animation
4. Continue pressing the spacebar until you're ready to finish
5. Stop pressing the spacebar for 2+ seconds to complete the process
6. View your final time and click "POUND AGAIN" to restart

## Technical Details

The application uses:
- HTML5, CSS3, and JavaScript
- CSS transitions and animations for visual effects
- Event listeners to detect spacebar presses
- Inactivity timer to detect when to show the completion state
- Mobile support with touch events

## Customization

You can customize this application by:
- Replacing the photos with your own images
- Adjusting the CSS styles in `styles.css`
- Modifying the timing and animations in `app.js`

## Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS3 transitions and animations
- KeyboardEvent API
- Touch events for mobile devices

## Deployment

This application can be deployed to any static site hosting service:

1. **Vercel** (recommended) - See [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md)
2. **GitHub Pages** - Push to a GitHub repository and enable GitHub Pages
3. **Netlify** - Connect to a GitHub repository or upload the files directly
4. **Any web server** - Simply copy all files to your web server's public directory

## License

This project is licensed under the MIT License - see the LICENSE file for details. 