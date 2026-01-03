// Node.js script to generate basic PNG icons
// Run with: node generate-icons.js (requires canvas package: npm install canvas)

const fs = require('fs');

try {
    const { createCanvas } = require('canvas');

    function generateIcon(size, filename) {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // Background gradient (simplified to solid color for Node.js)
        ctx.fillStyle = '#2a5298';
        ctx.fillRect(0, 0, size, size);

        // Draw crosshair
        ctx.strokeStyle = 'white';
        ctx.lineWidth = size * 0.03;

        // Outer circle
        ctx.beginPath();
        ctx.arc(size/2, size/2, size * 0.35, 0, 2 * Math.PI);
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(size/2, size/2, size * 0.05, 0, 2 * Math.PI);
        ctx.stroke();

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(size/2, size * 0.15);
        ctx.lineTo(size/2, size * 0.85);
        ctx.stroke();

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(size * 0.15, size/2);
        ctx.lineTo(size * 0.85, size/2);
        ctx.stroke();

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = `bold ${size * 0.12}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('MOA', size/2, size * 0.88);

        // Save to file
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(filename, buffer);
        console.log(`Created ${filename}`);
    }

    generateIcon(192, 'icon-192.png');
    generateIcon(512, 'icon-512.png');
    console.log('Icons generated successfully!');

} catch (error) {
    console.log('Canvas package not installed. To generate icons:');
    console.log('1. Run: npm install canvas');
    console.log('2. Then run: node generate-icons.js');
    console.log('\nOR use the create-icons.html file in a browser instead.');
}
