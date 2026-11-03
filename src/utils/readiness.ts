import { PlacementReadinessMetrics, ResumeAnalysisResult, MockInterviewSession, PracticeAttempt } from '../types';

export function calculatePlacementReadiness(
  resume: ResumeAnalysisResult | null,
  interviews: MockInterviewSession[],
  practice: PracticeAttempt[]
): PlacementReadinessMetrics {
  // 1. Resume Score (15% weight)
  const rawResume = resume ? resume.atsScore : 68;
  const resumeWeight = 0.15;

  // 2. Technical & Coding Practice (25% weight)
  const codingAttempts = practice.filter(p => p.category === 'Programming');
  const avgCoding = codingAttempts.length > 0
    ? codingAttempts.reduce((sum, a) => sum + a.score, 0) / codingAttempts.length
    : 72;
  const codingWeight = 0.25;

  // 3. Aptitude Score (20% weight)
  const aptitudeAttempts = practice.filter(p => p.category === 'Aptitude');
  const avgAptitude = aptitudeAttempts.length > 0
    ? aptitudeAttempts.reduce((sum, a) => sum + a.score, 0) / aptitudeAttempts.length
    : 78;
  const aptitudeWeight = 0.20;

  // 4. Logical Reasoning (15% weight)
  const logicalAttempts = practice.filter(p => p.category === 'Logical Reasoning');
  const avgLogical = logicalAttempts.length > 0
    ? logicalAttempts.reduce((sum, a) => sum + a.score, 0) / logicalAttempts.length
    : 82;
  const logicalWeight = 0.15;

  // 5. Mock Interview Score (25% weight)
  const avgInterview = interviews.length > 0
    ? interviews.reduce((sum, i) => sum + i.overallScore, 0) / interviews.length
    : 75;
  const interviewWeight = 0.25;

  // Weighted total
  const weightedTotal = Math.round(
    rawResume * resumeWeight +
    avgCoding * codingWeight +
    avgAptitude * aptitudeWeight +
    avgLogical * logicalWeight +
    avgInterview * interviewWeight
  );

  const overallScore = Math.min(99, Math.max(30, weightedTotal));

  let tier: PlacementReadinessMetrics['tier'] = 'In Preparation';
  if (overallScore >= 85) tier = 'Placement Ready';
  else if (overallScore >= 72) tier = 'High Potential';
  else if (overallScore >= 55) tier = 'In Preparation';
  else tier = 'Foundation Building';

  // Identify strengths & weak areas dynamically
  const factors = [
    { label: 'Resume ATS & Impact', score: rawResume },
    { label: 'Technical Coding Accuracy', score: avgCoding },
    { label: 'Quantitative Aptitude', score: avgAptitude },
    { label: 'Logical & Analytical Reasoning', score: avgLogical },
    { label: 'Verbal & Mock Interview Fluency', score: avgInterview },
  ];

  factors.sort((a, b) => b.score - a.score);
  const strengths = factors.slice(0, 2).map(f => `${f.label} (${Math.round(f.score)}%)`);
  const weaknesses = factors.slice(-2).map(f => `${f.label} (${Math.round(f.score)}%)`);

  return {
    overallScore,
    tier,
    breakdown: {
      resumeScore: {
        value: Math.round(rawResume),
        weight: resumeWeight * 100,
        weighted: Math.round(rawResume * resumeWeight)
      },
      technicalCoding: {
        value: Math.round(avgCoding),
        weight: codingWeight * 100,
        weighted: Math.round(avgCoding * codingWeight)
      },
      aptitudeScore: {
        value: Math.round(avgAptitude),
        weight: aptitudeWeight * 100,
        weighted: Math.round(avgAptitude * aptitudeWeight)
      },
      logicalReasoning: {
        value: Math.round(avgLogical),
        weight: logicalWeight * 100,
        weighted: Math.round(avgLogical * logicalWeight)
      },
      mockInterviewScore: {
        value: Math.round(avgInterview),
        weight: interviewWeight * 100,
        weighted: Math.round(avgInterview * interviewWeight)
      }
    },
    strengths,
    weaknesses,
    recentGrowthPercentage: 6.8
  };
}
