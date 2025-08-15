// lib/lightAlgorithm.ts
export function calculateLightPlacements(features: HouseFeature[]): LightSuggestion[] {
  const suggestions: LightSuggestion[] = [];

  features.forEach(feature => {
    switch (feature.type) {
      case 'Roof':
        // String lights along roofline
        suggestions.push(...generateRooflineLights(feature));
        break;
      case 'corner':
        // Accent lights at corners
        suggestions.push({
          x: feature.bbox.x,
          y: feature.bbox.y,
          type: 'accent',
          priority: 1,
        });
        break;
      case 'window':
        // Frame windows with lights
        suggestions.push(...generateWindowFrameLights(feature));
        break;
    }
  });

  return suggestions.sort((a, b) => b.priority - a.priority);
}

function generateRooflineLights(roofline: HouseFeature): LightSuggestion[] {
  const lights: LightSuggestion[] = [];
  const spacing = 20; // pixels between lights
  
  // Generate lights along the roofline
  for (let x = roofline.bbox.x; x < roofline.bbox.x + roofline.bbox.width; x += spacing) {
    lights.push({
      x,
      y: roofline.bbox.y,
      type: 'string',
      priority: 0.8,
    });
  }
  
  return lights;
}