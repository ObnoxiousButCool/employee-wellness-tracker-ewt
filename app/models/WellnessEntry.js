export class WellnessEntry {
  constructor({ id, userId, departmentId, stressLevel, workHours, sleepHours, mood, energyLevel, submissionDate }) {
    this.id = id;
    this.userId = userId;
    this.departmentId = departmentId;
    this.stressLevel = stressLevel;
    this.workHours = workHours;
    this.sleepHours = sleepHours;
    this.mood = mood;
    this.energyLevel = energyLevel;
    this.submissionDate = submissionDate;
  }
}
