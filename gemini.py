from google import genai
from google.genai import types


def gemini(
    client: genai.Client,
    contents: types.ContentListUnionDict,
    system_instruction: types.ContentUnion | None = None,
):
    return client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            thinking_config=types.ThinkingConfig(
                thinking_budget=0
            ),  # Disables thinking
        ),
    )
