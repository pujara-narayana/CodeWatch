class GraduationAgent:
    def _init_(self, gemini):
        self.gemini = gemini

    def generate_plan(self, input_text):
        prompt = f"Create a graduation plan for the following goal: {input_text}"
        return self.gemini.ask(prompt)
