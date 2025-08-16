# 🎄 Christmas Light Designer

An interactive web application for designing Christmas light setups on your room or any image. Create beautiful light arrangements with individual bulbs and light strands, then visualize them on your space.

## ✨ Features

### 🎨 Light Designer Mode
- **Individual Bulbs**: Add single Christmas lights with customizable colors and sizes
- **Light Strands**: Create strings of connected lights with different patterns
- **Patterns**: Choose from alternating, rainbow, or custom color patterns
- **Interactive Canvas**: Click anywhere to place lights, drag to reposition
- **Image Upload**: Upload your room photo to design lights on your actual space

### 📱 AR Viewer Mode
- **Camera Integration**: Use your device camera for real-time AR experience
- **Live Preview**: See how lights would look in your actual environment

### 🎯 Tools
- **Select Tool**: Move and manage existing lights
- **Add Bulb Tool**: Place individual bulbs with custom settings
- **Add Strand Tool**: Create connected light strings
- **Delete**: Remove unwanted lights
- **Clear All**: Start fresh with a clean canvas

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun package manager

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd ar-lights
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

### Adding Lights
1. **Select a Tool**: Choose between "Add Bulb" or "Add Strand"
2. **Configure Settings**: Adjust colors, sizes, and patterns
3. **Click on Canvas**: Place lights anywhere on your design area
4. **Customize**: Use the Select tool to move and adjust existing lights

### Working with Images
1. **Upload Image**: Click "Upload Image" to add your room photo
2. **Design**: Place lights strategically on your space
3. **Preview**: See how your Christmas setup would look

### Managing Lights
- **Select**: Click on any light to select it
- **Move**: Drag selected lights to new positions
- **Delete**: Select a light and press "Delete Selected"
- **Clear All**: Remove all lights to start over

## 🎨 Light Customization

### Bulb Properties
- **Color**: Choose from any color using the color picker
- **Size**: Adjust from 10px to 40px using the slider
- **Glow**: Automatic glow effects based on color and size

### Strand Properties
- **Length**: 3 to 15 bulbs per strand
- **Pattern**: Alternating, rainbow, or custom color sequences
- **Spacing**: Automatic spacing between bulbs
- **Wire**: Visible connecting wire between bulbs

## 🛠️ Technical Details

### Built With
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **AR.js**: Augmented reality capabilities
- **A-Frame**: 3D and AR framework

### Component Architecture
- `Bulb`: Individual Christmas light component
- `LightStrand`: Connected string of lights
- `LightDesigner`: Main design interface
- `LightPreview`: Example light configurations
- `ARViewer`: Augmented reality viewer

### State Management
- React hooks for local state
- Drag and drop functionality
- Image upload and processing
- Tool selection and configuration

## 🎯 Future Enhancements

- [ ] Save and load light designs
- [ ] Export designs as images
- [ ] More light patterns and effects
- [ ] 3D room visualization
- [ ] Light timing and animation
- [ ] Social sharing features
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎄 Happy Designing!

Create the perfect Christmas light setup for your home with our interactive designer. Whether you're planning your holiday decorations or just want to experiment with different light arrangements, this tool makes it easy and fun!

---

*Built with ❤️ and lots of Christmas spirit*
