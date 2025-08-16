import re
from inference import InferencePipeline
from inference.core.interfaces.camera.video_source import VideoFrame
from dotenv import load_dotenv
from os import getenv
from pprint import pp
import cv2
import json
import time

load_dotenv()
api_key = getenv("ROBOFLOW_API_KEY")
assert api_key

data: dict[str, dict] = {}

def my_sink(result, video_frame: VideoFrame):
	if result.get('bounding_box_visualization'):
		cv2.imshow("Workflow Image", result["bounding_box_visualization"].numpy_image)
		cv2.waitKey(1)
	# pp(result['csv_formatter'])
	pattern = r'""predictions"":\s*(\[.*?\])(?=,\s*""[^""]*"":\s*|})'
	match = re.search(pattern, result['csv_formatter'])
	assert match
	predictions_json = match.group(1)
	predictions_json = predictions_json.replace('""', '"')
	predictions = json.loads(predictions_json)
	pp(predictions)
	print('\n\n\n')
	for prediction in predictions:
		data[prediction['detection_id']] = {'class': prediction['class'], 'time_in_zone': prediction['time_in_zone'], 'timestamp': time.time()} # type: ignore


# initialize a pipeline object
pipeline = InferencePipeline.init_with_workflow(
    api_key=api_key,
    workspace_name="ignition25",
    workflow_id="custom-workflow-2",
    video_reference='traffic.mp4', # Path to video, device id (int, usually 0 for built in webcams), or RTSP stream url
    max_fps=60,
    on_prediction=my_sink
)
pipeline.start() #start the pipeline
pipeline.join() #wait for the pipeline thread to finish

print(len(data))
print(json.dumps(data))