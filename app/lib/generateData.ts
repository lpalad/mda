import { Lead, LeadSource, LeadIndustry, LeadStage, CommunicationPreference } from '../types/lead'

const SOURCES: LeadSource[] = ['Google Ads', 'LinkedIn', 'Referrals', 'SEO', 'Social Media', 'Email']
const INDUSTRIES: LeadIndustry[] = ['Corporate Law', 'Family Law', 'IP', 'Litigation', 'Real Estate']
const STAGES: LeadStage[] = ['Awareness', 'Interest', 'Booking', 'Consultation', 'Conversion']
const COMMUNICATION_PREFS: CommunicationPreference[] = ['email', 'phone', 'chat']

// Channel quality distributions
const channelQualityProfiles: Record<LeadSource, { highQualityRate: number; costPerLead: number }> = {
  'Google Ads': { highQualityRate: 0.52, costPerLead: 85 },
  'LinkedIn': { highQualityRate: 0.48, costPerLead: 120 },
  'Referrals': { highQualityRate: 0.75, costPerLead: 50 },
  'SEO': { highQualityRate: 0.45, costPerLead: 40 },
  'Social Media': { highQualityRate: 0.22, costPerLead: 35 },
  'Email': { highQualityRate: 0.40, costPerLead: 25 },
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function generateQualityScore(source: LeadSource, engagementScore: number, firmSize: number): number {
  const baseScore = channelQualityProfiles[source].highQualityRate * 100
  const engagementFactor = engagementScore * 0.3
  const firmSizeFactor = Math.min(firmSize / 100, 20) // Cap at 20 points

  let score = baseScore + engagementFactor + firmSizeFactor
  score = score + randomBetween(-15, 15) // Add some variance

  return Math.max(0, Math.min(100, score))
}

function getQualityTier(score: number): 'High' | 'Medium' | 'Low' {
  if (score >= 70) return 'High'
  if (score >= 40) return 'Medium'
  return 'Low'
}

function getStageFromQualityAndEngagement(quality: string, engagement: number): LeadStage {
  if (quality === 'High' && engagement > 80) return 'Consultation'
  if (quality === 'High' && engagement > 60) return 'Booking'
  if (quality === 'High') return 'Interest'
  if (quality === 'Medium' && engagement > 70) return 'Booking'
  if (quality === 'Medium') return 'Interest'
  return 'Awareness'
}

export function generateMockLeads(count: number = 1000): Lead[] {
  const leads: Lead[] = []
  const today = new Date()
  const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)

  for (let i = 0; i < count; i++) {
    const source = SOURCES[Math.floor(Math.random() * SOURCES.length)]
    const engagementScore = randomBetween(0, 100)
    const firmSize = randomBetween(5, 500)
    const qualityScore = generateQualityScore(source, engagementScore, firmSize)
    const qualityTier = getQualityTier(qualityScore)

    const dateCreated = new Date(
      oneYearAgo.getTime() + Math.random() * (today.getTime() - oneYearAgo.getTime())
    )

    // Calculate days in funnel
    const daysInFunnel = randomBetween(1, 180)

    // Conversion likelihood increases with quality
    const conversionChance = qualityScore / 100 + randomFloat(-0.2, 0.2)
    const converted = Math.random() < Math.max(0, Math.min(1, conversionChance))

    const stage = getStageFromQualityAndEngagement(qualityTier, engagementScore)

    leads.push({
      id: `LEAD-${String(i + 1).padStart(5, '0')}`,
      source,
      dateCreated: dateCreated.toISOString(),
      firmSize,
      industry: INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)],
      revenuePotential: randomBetween(50000, 500000),
      qualityScore: Math.round(qualityScore),
      qualityTier,
      engagementScore,
      stage,
      daysInFunnel,
      converted,
      costPerLead: channelQualityProfiles[source].costPerLead + randomBetween(-10, 10),
      communicationPreference: COMMUNICATION_PREFS[Math.floor(Math.random() * COMMUNICATION_PREFS.length)],
    })
  }

  return leads
}

export function calculateMetrics(leads: Lead[]) {
  const totalLeads = leads.length
  const highQualityLeads = leads.filter(l => l.qualityTier === 'High').length
  const mediumQualityLeads = leads.filter(l => l.qualityTier === 'Medium').length
  const lowQualityLeads = leads.filter(l => l.qualityTier === 'Low').length

  const avgQualityScore = leads.reduce((sum, l) => sum + l.qualityScore, 0) / totalLeads
  const convertedLeads = leads.filter(l => l.converted).length
  const conversionRate = (convertedLeads / totalLeads) * 100

  const highQualityConverted = leads.filter(l => l.qualityTier === 'High' && l.converted).length
  const highQualityConversionRate = (highQualityConverted / Math.max(1, highQualityLeads)) * 100

  const totalCost = leads.reduce((sum, l) => sum + l.costPerLead, 0)
  const costPerHighQualityLead = totalCost / Math.max(1, highQualityLeads)

  const predictedConversionRate = highQualityConversionRate * 0.98 // Conservative estimate

  return {
    totalLeads,
    highQualityLeads,
    mediumQualityLeads,
    lowQualityLeads,
    highQualityPercentage: ((highQualityLeads / totalLeads) * 100).toFixed(1),
    mediumQualityPercentage: ((mediumQualityLeads / totalLeads) * 100).toFixed(1),
    lowQualityPercentage: ((lowQualityLeads / totalLeads) * 100).toFixed(1),
    avgQualityScore: Math.round(avgQualityScore),
    conversionRate: conversionRate.toFixed(1),
    highQualityConversionRate: highQualityConversionRate.toFixed(1),
    costPerHighQualityLead: Math.round(costPerHighQualityLead),
    predictedConversionRate: Math.round(predictedConversionRate * 10) / 10,
  }
}

export function getChannelMetrics(leads: Lead[]) {
  const channels = new Map<LeadSource, Lead[]>()

  leads.forEach(lead => {
    if (!channels.has(lead.source)) {
      channels.set(lead.source, [])
    }
    channels.get(lead.source)!.push(lead)
  })

  return Array.from(channels.entries()).map(([channel, channelLeads]) => {
    const highQuality = channelLeads.filter(l => l.qualityTier === 'High').length
    const totalCost = channelLeads.reduce((sum, l) => sum + l.costPerLead, 0)
    const converted = channelLeads.filter(l => l.converted).length
    const revenue = channelLeads
      .filter(l => l.converted)
      .reduce((sum, l) => sum + l.revenuePotential, 0)

    return {
      channel,
      volume: channelLeads.length,
      highQualityCount: highQuality,
      highQualityPercentage: (highQuality / channelLeads.length) * 100,
      costPerHighQualityLead: highQuality > 0 ? totalCost / highQuality : 0,
      roi: totalCost > 0 ? ((revenue - totalCost) / totalCost) * 100 : 0,
      conversionRate: (converted / channelLeads.length) * 100,
    }
  })
}

export function getFunnelData(leads: Lead[]) {
  const stages: Record<LeadStage, { high: number; medium: number; low: number }> = {
    Awareness: { high: 0, medium: 0, low: 0 },
    Interest: { high: 0, medium: 0, low: 0 },
    Booking: { high: 0, medium: 0, low: 0 },
    Consultation: { high: 0, medium: 0, low: 0 },
    Conversion: { high: 0, medium: 0, low: 0 },
  }

  leads.forEach(lead => {
    if (lead.qualityTier === 'High') stages[lead.stage].high++
    else if (lead.qualityTier === 'Medium') stages[lead.stage].medium++
    else stages[lead.stage].low++
  })

  return STAGES.map(stage => ({
    stage,
    highQuality: stages[stage].high,
    mediumQuality: stages[stage].medium,
    lowQuality: stages[stage].low,
    total: stages[stage].high + stages[stage].medium + stages[stage].low,
  }))
}

export function getHighQualityProfile(leads: Lead[]) {
  const highQualityLeads = leads.filter(l => l.qualityTier === 'High')

  if (highQualityLeads.length === 0) {
    return {
      avgFirmSize: 0,
      mostCommonIndustry: 'Corporate Law',
      avgEngagementScore: 0,
      mostCommonContentPreference: 'email',
      topCommunicationChannel: 'email',
      avgDaysInFunnel: 0,
      conversionRate: 0,
    }
  }

  const avgFirmSize = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.firmSize, 0) / highQualityLeads.length
  )

  const industries = new Map<LeadIndustry, number>()
  highQualityLeads.forEach(l => {
    industries.set(l.industry, (industries.get(l.industry) || 0) + 1)
  })
  const mostCommonIndustry = Array.from(industries.entries()).sort((a, b) => b[1] - a[1])[0][0]

  const avgEngagementScore = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.engagementScore, 0) / highQualityLeads.length
  )

  const commPrefs = new Map<CommunicationPreference, number>()
  highQualityLeads.forEach(l => {
    commPrefs.set(l.communicationPreference, (commPrefs.get(l.communicationPreference) || 0) + 1)
  })
  const topCommunicationChannel = Array.from(commPrefs.entries()).sort((a, b) => b[1] - a[1])[0][0]

  const avgDaysInFunnel = Math.round(
    highQualityLeads.reduce((sum, l) => sum + l.daysInFunnel, 0) / highQualityLeads.length
  )

  const converted = highQualityLeads.filter(l => l.converted).length
  const conversionRate = (converted / highQualityLeads.length) * 100

  return {
    avgFirmSize,
    mostCommonIndustry,
    avgEngagementScore,
    topCommunicationChannel,
    avgDaysInFunnel,
    conversionRate: Math.round(conversionRate * 10) / 10,
  }
}

export function getFeatureImportance() {
  return [
    { feature: 'Firm Size', importance: 0.28 },
    { feature: 'Referral Source', importance: 0.25 },
    { feature: 'Engagement Score', importance: 0.18 },
    { feature: 'Industry Vertical', importance: 0.12 },
    { feature: 'Lead Source Channel', importance: 0.10 },
    { feature: 'Communication Preference', importance: 0.07 },
  ]
}
