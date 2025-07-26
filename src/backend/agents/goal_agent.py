# agents/goal_agent.py

class GoalAgent:
    def __init__(self):
      self.goals = {}

    def set_goal(self, goal: str):
      self.goals[goal] = False
      return f"New goal added: {goal}"

    def complete_goal(self, goal: str):
      if goal in self.goals:
        self.goals[goal] = True
        return f"🎉 Great job! Goal '{goal}' completed."
      return "Goal not found."

    def get_goals_status(self):
      return self.goals
