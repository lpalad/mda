# Revenue Intelligence Hub

**Author:** Leonard S Palad - Principal Business Analyst

**What this shows:**
- End-to-end marketing analytics case study (lead quality, CLV, channels, funnel, pipeline, ROI)
- Built in Next.js 14 + TypeScript + Tailwind CSS + Recharts, deployed to AWS S3
- 1,200+ synthetic leads across 6 channels with realistic patterns
- Designed for CMOs and RevOps leaders: see ROI, pipeline, and risk in one place

This repo powers the **Revenue Intelligence Hub** live demo: https://salesconnect.com.au/analytics/

---

A modern, interactive B2B analytics dashboard built as a synthetic case study. All data and outcomes are simulated for portfolio purposes. This project demonstrates advanced marketing data analytics, predictive modeling, and business intelligence capabilities.

## Project Overview

**The Challenge:** Growing businesses often lack visibility into which marketing channels drive quality leads, how leads move through the sales funnel, or where to optimize marketing budgets.

**The Solution:** A comprehensive Revenue Intelligence Hub with 6 specialized dashboards powered by predictive modeling and data visualization.

**The Outcome (modeled):** In a simulated scenario, the recommendations increase qualified pipeline by 35% and reduce customer acquisition costs by 18%.

---

## Dashboard Sections

### 1. Acquisition & Funnel
- Channel spend efficiency and conversion funnel health
- ROAS analysis across all marketing channels
- Executive summary with problem-data-finding-recommendation framework
- Funnel stage visualization with drop-off identification

### 2. CLV & Segmentation
- Customer segments by RFM (Recency, Frequency, Monetary) analysis
- Lifetime value calculations by segment (SMB, Mid-Market, Enterprise)
- LTV:CAC ratio analysis
- Segment-specific recommendations

### 3. Lead Quality Analytics
- Predictive lead quality scoring model
- MQL to SQL conversion analysis by channel
- Feature importance visualization for lead scoring
- Quality tier segmentation (High/Medium/Low)

### 4. Marketing ROI Dashboard
- Full channel attribution with spend vs revenue analysis
- Detailed ROAS breakdown by channel
- Month-over-month performance trends
- Budget optimization recommendations

### 5. Partner Performance
- Partner-sourced revenue tracking
- Cycle time analysis
- Partner tier performance comparison
- Strategic partner insights

### 6. Sales Pipeline
- Open pipeline across all stages
- Pipeline coverage ratios
- Deal velocity metrics
- Stage conversion analysis

### Predictive Analytics (Home Page)
- 90-day revenue forecast
- Confidence interval visualization
- Risk assessment (Low/Medium/High)
- Model trained on 18 months of historical data

---

## Key Features

- **Interactive Period Filters**: Time period selectors affecting all sections
  - Last 7 Days
  - Last 30 Days
  - Last 90 Days
  - Year to Date
  - All Time

- **Rich Data Visualization**:
  - Bar charts with dual-axis (Recharts)
  - Funnel visualization with quality segmentation
  - KPI circles with animated progress
  - Trend sparklines and heatmaps
  - Executive summary cards

- **1,200+ Synthetic Lead Records**:
  - 12 months of realistic data
  - 6 lead sources (Google Ads, LinkedIn, Referrals, SEO, Social Media, Email)
  - Realistic quality distributions by channel
  - Proper conversion patterns correlated with quality tiers

- **Modern B2B Design**:
  - Clean, professional aesthetic
  - Responsive layout for all devices
  - Smooth transitions and animations
  - Branding header with real-time date/time

- **Executive Summary Framework**:
  - Problem statement
  - Data used
  - Key findings
  - Recommendations
  - Expected impact

---

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: AWS S3 (static export)
- **Package Manager**: npm

---

## Project Structure

```
/app
  page.tsx                              # Home - Revenue Intelligence Hub

  /analytics
    page.tsx                            # Analytics Hub (alternate entry)

    /acquisition-funnel
      page.tsx                          # Acquisition & Funnel dashboard

    /clv-segmentation
      page.tsx                          # CLV & Segmentation dashboard

    /lead-quality
      page.tsx                          # Lead Quality Analytics dashboard

    /marketing-roi-dashboard
      page.tsx                          # Marketing ROI Dashboard

    /partner-performance
      page.tsx                          # Partner Performance dashboard

    /sales-pipeline
      page.tsx                          # Sales Pipeline dashboard

  /components
    AcquisitionFunnel.tsx               # Acquisition funnel component
    BrandingHeader.tsx                  # Page branding header
    CLVDashboard.tsx                    # CLV analysis component
    DashboardContent.tsx                # Main dashboard wrapper
    DashboardNav.tsx                    # Sidebar navigation
    LeadQualityAnalytics.tsx            # Lead quality component
    MarketingROIDashboard.tsx           # Marketing ROI component
    SectionPartnerPerformance.tsx       # Partner performance component
    SectionSalesPipeline.tsx            # Sales pipeline component

  /lib
    generateData.ts                     # Synthetic data generation
    store.ts                            # State management

  /types
    lead.ts                             # TypeScript interfaces

  globals.css                           # Global styles
  layout.tsx                            # Root layout
```

---

## What This Demonstrates

### Marketing Analytics Skills
- Lead quality scoring and segmentation
- Channel performance analysis and ROI calculation
- Funnel analysis and drop-off identification
- Budget allocation optimization
- Customer lifetime value analysis
- Partner channel attribution

### Data Visualization
- Multi-dimensional data representation
- Clear, actionable insights from complex data
- Interactive charts with period filtering
- Trend analysis and KPI tracking
- Executive summary frameworks

### Business Intelligence
- Data-driven decision making
- Strategic recommendations with quantified impact
- 5-step insight framework (Problem, Data, Finding, Recommendation, Impact)
- Success metrics and KPI definitions

### Technical Skills
- Next.js 14 App Router architecture
- TypeScript for type safety
- Recharts for interactive visualizations
- Tailwind CSS for professional UI/UX
- Static site generation for AWS S3 deployment
- Responsive design patterns

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/lpalad/mda.git
cd mda

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

### Build for Production

```bash
# Build static export
npm run build

# Output in /out directory for S3 deployment
```

---

## Deployment

This project is configured for static export to AWS S3:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/analytics',
  trailingSlash: true,
}
```

Deploy the `/out` directory to your S3 bucket configured for static website hosting.

---

## Sample Data Patterns

The synthetic dataset includes:

- **6 Marketing Channels** with realistic quality distributions:
  - Google Ads: High volume, moderate quality
  - LinkedIn Ads: Premium quality, higher cost
  - Referrals: Highest conversion rate
  - Organic Search: Cost-efficient, steady quality
  - Meta Ads: High retargeting ROAS
  - Email Marketing: Nurture-focused

- **Customer Segments**: SMB, Mid-Market, Enterprise with distinct CLV patterns

- **Realistic Conversion Patterns**: Quality tier strongly correlates with conversion rate

- **Pipeline Stages**: Prospect, Qualified, Proposal, Negotiation, Closed

---

## Use Cases

This dashboard is ideal for:

- **Portfolio Pieces**: Showcase marketing analytics and BI skills to recruiters
- **Case Studies**: Demonstrate problem-solving in real business scenarios
- **Interview Discussions**: Explain approach to data-driven decision making
- **Learning Tool**: Understand end-to-end analytics dashboard development
- **Template**: Adapt for other B2B analytics scenarios

---

## Key Metrics Explained

**Lead Quality Score** (0-100): Composite score based on firm size, engagement level, lead source, and industry vertical.

**ROAS (Return on Ad Spend)**: Revenue generated per dollar spent on advertising.

**LTV:CAC Ratio**: Customer lifetime value divided by customer acquisition cost. Target is 3:1 or higher.

**Pipeline Coverage**: Total pipeline value divided by quota. Target is 3x or higher.

**SQL Conversion Rate**: Percentage of MQLs that convert to Sales Qualified Leads.

---

## Contributing

This is a portfolio project, but feel free to:
- Fork and adapt for your own use case
- Suggest improvements via issues
- Create variations for different industries

---

## License

MIT License - feel free to use this project as a template for your own portfolio.

---

## About

Created by Leonard S Palad as a portfolio project to demonstrate:
- Marketing data analytics expertise
- Advanced dashboard design
- Business intelligence capabilities
- Modern full-stack development skills

**Perfect for:** Data analysts, marketing analysts, business intelligence professionals, and full-stack developers looking to showcase BI skills.

---

**Live Demo**: https://salesconnect.com.au/analytics/

**Repository**: https://github.com/lpalad/mda
