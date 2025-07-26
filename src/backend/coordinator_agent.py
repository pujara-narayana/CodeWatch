from agents.journal_agent import JournalAgent
from agents.mood_agent import MoodAgent
from agents.insight_agent import InsightAgent
from agents.wellness_agent import WellnessCoachAgent
from agents.goal_agent import GoalAgent
from agents.garden_agent import GardenVisualizerAgent

class CoordinatorAgent:
  def __init__(self, model):
    self.journal = JournalAgent(model)
    self.mood = MoodAgent()
    self.insight = InsightAgent()
    self.wellness = WellnessCoachAgent()
    self.goal = GoalAgent()
    self.garden = GardenVisualizerAgent()

  def get_journal_prompts(self):
    return self.journal.generate_journal_prompts()

  def log_mood(self, mood):
    self.mood.log_mood(mood)

  def get_insights(self):
    return self.insight.generate_insight(self.mood.get_moods())

  def get_wellness_tip(self):
    return self.wellness.suggest_tip()

  def get_goal(self):
    return self.goal.suggest_goal()

  def get_garden_status(self):
    entries = len(self.mood.get_moods())
    return self.garden.get_growth_message(entries)
