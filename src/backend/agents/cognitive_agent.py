import json, re, uuid
from models.classes import CognitiveSupportResponse

class CognitiveAgent:
    def __init__(self, model, db_accessor):
        self.model = model
        self.db_accessor = db_accessor

    async def get_cognitive_support(self, user_id: str) -> CognitiveSupportResponse:

        print("HI WE MADE IT TWICEEEE")
        print(user_id)

        moods = await self.db_accessor.get_user_moods(user_id)
        journals = await self.db_accessor.get_user_journal_entries(user_id)

        print(moods)
        print(journals)

        mood_text = "\n".join(
            [f"{m.created_at.date()} | {m.mood_value} ({m.mood_score}) | {m.notes or ''}" for m in moods]
        )
        journal_text = "\n".join(
            [f"{j.created_at.date()} | {j.title or 'No Title'} | {j.content}" for j in journals]
        )

        prompt = f"""
        Analyze the following user data from the past week.

        Moods:
        {mood_text}

        Journal Entries:
        {journal_text}

        1. Identify cognitive distortions.
        2. Identify stress patterns or emotional triggers.
        3. Suggest one CBT-style coping mechanism.

        Return ONLY valid JSON:
        {{
            "cognitive_distortion": "string",
            "stress_patterns": ["pattern1", "pattern2"],
            "coping_mechanism": "string",
            "summary": "short emotional insight"
        }}
        """

        response = self.model.generate_content(prompt)

        print("Generating cognitive support response.")
        print(response.text)

        try:
            match = re.search(r"\{.*\}", response.text, re.DOTALL)
            parsed = json.loads(match.group()) if match else {}
        except Exception:
            parsed = {}

        return CognitiveSupportResponse(
        coping_mechanism=parsed.get("coping_mechanism", ""),
        cognitive_distortion=parsed.get("cognitive_distortion", ""),
        stress_patterns=parsed.get("stress_patterns", []),
    )
