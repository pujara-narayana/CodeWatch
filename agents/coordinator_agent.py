# Handles Routing Between Agents

from agents.graduation_agent import GraduationAgent
from agents.jobsearch_agent import JobSearchAgent
from agents.gradschool_agent import GradSchoolAgent

class CoordinatorAgent:
    def _init_(self, gemini):
      self.graduation = GraduationAgent(gemini)
      self.job = JobSearchAgent(gemini)
      self.grad = GradSchoolAgent(gemini)

    def handle_request(self, message):
      if "graduate" in message:
        return self.graduation.generate_plan(message)
      elif "job" in message:
        return self.job.search_jobs(message)
      elif "grad school" in message:
        return self.grad.recommend_programs(message)
      else:
        return "Sorry, I couldn't understand your request."
