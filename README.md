# MOA Scope Click Calculator

A mobile-friendly web application for calculating rifle scope click adjustments based on shot placement, target distance, and optional wind speed.

## Features

- **Real-time Calculations**: Results update instantly as you enter data
- **Metric System**: Uses meters for distance, centimeters for offsets, and km/h for wind speed
- **Mobile Optimized**: Touch-friendly interface designed for use in the field
- **1/4 MOA Clicks**: Configured for standard 1/4 MOA per click rifle scopes
- **Wind Compensation**: Optional wind speed input for basic drift estimation
- **Fully Offline**: Works completely offline - perfect for hunting with no cell signal
- **Installable App**: Add to your phone's home screen like a native app (PWA)

## Install on Your Phone

### iPhone/iPad (iOS):
1. Open in **Safari** browser: https://lucareynoldssa-gif.github.io/MOAcalc/
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Done! Works offline from your home screen

### Android:
1. Open in **Chrome** browser: https://lucareynoldssa-gif.github.io/MOAcalc/
2. Tap the menu (three dots)
3. Tap "Install app" or "Add to Home screen"
4. Done! Works offline from your home screen

**Once installed, no internet connection is needed!** Perfect for hunting and range use.

## How to Use

1. Open `index.html` in your web browser (Chrome, Firefox, Safari, or mobile browser)
2. Enter the **distance to target** in meters
3. Enter your shot **vertical offset** in centimeters:
   - Positive number if your shot was HIGH
   - Negative number if your shot was LOW
4. Enter your shot **horizontal offset** in centimeters:
   - Positive number if your shot was RIGHT
   - Negative number if your shot was LEFT
5. (Optional) Enter **wind speed** in km/h for wind drift estimation
6. Read the calculated scope adjustments:
   - Number of clicks to adjust
   - Direction to turn the turrets (UP/DOWN, LEFT/RIGHT)

## Example

**Scenario**: Shooting at 200 meters, your shot hits 10 cm high and 5 cm to the right.

**Input**:
- Distance: 200
- Vertical offset: 10
- Horizontal offset: 5

**Output**:
- Vertical: Adjust DOWN 7 clicks
- Horizontal: Adjust LEFT 3 clicks

## Technical Details

- **MOA Conversion**: 1 MOA = 2.908 cm at 100 meters
- **Click Value**: 1/4 MOA per click (0.25 MOA)
- **Calculation**: Offset (cm) ÷ Distance (m) × 100 ÷ 2.908 = MOA
- **Rounding**: Results rounded to nearest whole click

## Files

- `index.html` - Main application structure
- `styles.css` - Responsive mobile-first styling
- `calculator.js` - MOA calculation logic
- `service-worker.js` - Enables offline functionality
- `manifest.json` - PWA configuration for installation
- `create-icons.html` - Tool to generate app icons (see INSTALL.md)

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (desktop and mobile)
- Firefox (desktop and mobile)
- Safari (desktop and iOS)

## License

Free to use for personal and educational purposes.
