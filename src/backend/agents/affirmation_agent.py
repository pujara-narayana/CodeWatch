class AffirmationAgent:
    def __init__(self, model):
        self.model = model
        # self.user_info = ""
        # self.user_mood = ""
        # self.latest_journals = ""

    def generate_motivational_affirmations(
        self, user_info, user_mood, latest_journals
    ) -> str:
        prompt = f"""Generate a single motivational affirmation or quote based on the user's context:
        User Info: {user_info}
        Current Mood: {user_mood}
        Recent Journal Entries: {latest_journals}
        Create an uplifting, personalized affirmation that resonates with their current state. If mood and journals are empty, focus on the user info. Keep it concise and inspiring."""

        print("Generating AI affirmation")

        try:
            response = self.model.generate_content(prompt)
            print("Yay")
            
            print(response)
            return response.text.strip()
        except Exception as e:
            print(f"❌ Failed to generate affirmation: {e}")
            return "You are capable of amazing things. Trust in your journey."
