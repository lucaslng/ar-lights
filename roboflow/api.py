# Import the InferencePipeline object
from inference import InferencePipeline
from inference.core.interfaces.camera.video_source import VideoFrame
from typing import TypedDict

class Point(TypedDict):
  x: int
  y: int

Prediction = TypedDict("Prediction", {
  "width": int,
  "height": int,
  "x": int,
  "y": int,
  "confidence": int,
  "class_id": int,
  "points": list[Point],
  "tracker_id": int,
  "class": str,
  "detection_id": str,
  "parent_id": str,
})

def my_sink(result, video_frame: VideoFrame):
  data: list[Prediction] = result[0]['output']['predictions']


# initialize a pipeline object
pipeline = InferencePipeline.init_with_workflow(
    api_key="q8WshZltlxfjlzh98hHQ",
    workspace_name="ignition25",
    workflow_id="custom-workflow",
    video_reference=1, # Path to video, device id (int, usually 0 for built in webcams), or RTSP stream url
    max_fps=30,
    on_prediction=my_sink
)
pipeline.start() #start the pipeline
pipeline.join() #wait for the pipeline thread to finish
