// lib/roboflow.ts
const ROBOFLOW_API_KEY = process.env.NEXT_PUBLIC_ROBOFLOW_KEY;
const MODEL_ENDPOINT = 'your-model-endpoint';

export async function detectHouseFeatures(imageBlob: Blob): Promise<HouseFeature[]> {
  const formData = new FormData();
  formData.append('file', imageBlob);

  try {
    const response = await fetch(
      `https://detect.roboflow.com/${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    
    return result.predictions.map((pred: any) => ({
      type: pred.class,
      confidence: pred.confidence,
      bbox: {
        x: pred.x,
        y: pred.y,
        width: pred.width,
        height: pred.height,
      },
    }));
  } catch (error) {
    console.error('Roboflow detection failed:', error);
    return [];
  }
}