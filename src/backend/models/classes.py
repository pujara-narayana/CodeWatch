from pydantic import BaseModel
from typing import List

class CognitiveSupportResponse(BaseModel):
    coping_mechanism: str
    cognitive_distortion: str
    stress_patterns: List[str]