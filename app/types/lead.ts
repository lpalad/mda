export type LeadSource = 'Google Ads' | 'LinkedIn' | 'Referrals' | 'SEO' | 'Social Media' | 'Email'
export type LeadIndustry = 'Corporate Law' | 'Family Law' | 'IP' | 'Litigation' | 'Real Estate'
export type LeadQualityTier = 'High' | 'Medium' | 'Low'
export type LeadStage = 'Awareness' | 'Interest' | 'Booking' | 'Consultation' | 'Conversion'
export type CommunicationPreference = 'email' | 'phone' | 'chat'

export interface Lead {
  id: string
  source: LeadSource
  dateCreated: string
  firmSize: number
  industry: LeadIndustry
  revenuePotential: number
  qualityScore: number
  qualityTier: LeadQualityTier
  engagementScore: number
  stage: LeadStage
  daysInFunnel: number
  converted: boolean
  costPerLead: number
  communicationPreference: CommunicationPreference
}

export interface ChannelMetrics {
  channel: LeadSource
  volume: number
  highQualityCount: number
  highQualityPercentage: number
  costPerHighQualityLead: number
  roi: number
  conversionRate: number
}

export interface FunnelStage {
  stage: LeadStage
  highQuality: number
  mediumQuality: number
  lowQuality: number
  total: number
}

export interface FeatureImportance {
  feature: string
  importance: number
}
