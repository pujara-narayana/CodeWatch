import random
import re
import json

class JournalAgent:
    def __init__(self, model):
        self.model = model

    def generate_journal_prompts(self) -> list[str]:
        print("Generating journal prompts...")
        prompt = (
            "Generate a JSON array of exactly 5 reflective and emotionally insightful daily "
            "journal prompts. Each prompt should be a short string. "
            "Return ONLY a valid JSON array, like: "
            '["Prompt 1", "Prompt 2", "Prompt 3", "Prompt 4", "Prompt 5"].'
        )

        response = self.model.generate_content(prompt)

        try:
            text = response.text.strip()
            print("🔍 Raw Gemini Response:", text)

            # ✅ 1. Try to extract valid JSON list directly
            match = re.search(r"\[.*\]", text, re.DOTALL)
            if match:
                parsed = json.loads(match.group())
                if isinstance(parsed, list):
                    return parsed

            # ✅ 2. If Gemini gave a single object like {"prompt": "..."}
            if text.startswith("{"):
                parsed = json.loads(text)
                if isinstance(parsed, dict) and "prompt" in parsed:
                    return [parsed["prompt"]]

            # ✅ 3. Fallback: extract lines from markdown / plain text
            lines = [
                line.strip("-*• ").strip()
                for line in text.splitlines()
                if line.strip() and any(c.isalpha() for c in line)
            ]
            return lines[:5]  # Ensure only 5 prompts

        except Exception as e:
            print("❌ Failed to parse journal prompts:", e)
            return []

    def get_prompt(self):
        prompts = self.generate_journal_prompts()
        return random.choice(prompts) if prompts else "What are you feeling today?"

    def reflect_on_entry(self, entry: str):
        response = self.model.generate_content(
            f"Reflect on this journal entry and provide emotional insights:\n\n{entry}"
        )
        return response.text
