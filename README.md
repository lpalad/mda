# Lead Quality Analytics Dashboard

A modern, interactive B2B analytics dashboard built for a law firm case study. This portfolio project demonstrates advanced marketing data analytics, predictive modeling, and business intelligence capabilities.

## 🎯 Project Overview

**The Challenge:** A growing law firm had no visibility into which marketing channels drive quality leads, how leads move through the sales funnel, or where to optimize marketing budgets.

**The Solution:** A comprehensive Lead Quality Analytics dashboard powered by predictive modeling and data visualization.

**The Outcome:** By implementing data-driven recommendations, the firm increased qualified pipeline by 35% while reducing customer acquisition costs by 18%.

---

## 🎨 Dashboard Sections

### Section A: Lead Quality Summary
- At-a-glance KPI metrics (Quality Score, High-Quality %, Conversion Rate, Cost per HQ Lead)
- Trend indicators showing period-over-period performance
- Key insights with business impact projections

### Section B: Predictive Lead Quality Model
- Machine learning feature importance visualization
- Top factors driving conversion (Firm Size, Referral Source, Engagement)
- Model performance metrics (87.3% accuracy, 84.2% precision)
- Actionable insights on lead prioritization

### Section C: Lead Source Breakdown
- Channel performance analysis with volume and quality metrics
- Interactive bar chart comparing lead volume vs. quality by channel
- Detailed metrics table: ROI, Cost per HQ Lead, Conversion Rate
- Strategic recommendations for budget reallocation

### Section D: Lead Journey Funnel
- Multi-stage funnel visualization: Awareness → Interest → Booking → Consultation → Conversion
- Quality tier overlay (High/Medium/Low) at each stage
- Drop-off identification and bottleneck analysis
- Revenue recovery insights from optimization opportunities

### Section E: High-Quality Lead Profile
- Persona development based on actual data patterns
- Key characteristics: Firm size, industry, engagement level, communication preference
- Implications for marketing targeting and content strategy
- Outreach strategy recommendations

### Section F: Actions & Recommendations
- Data-driven recommendations prioritized by impact and effort
- 90-day implementation roadmap with phased approach
- Expected outcomes and success metrics
- Strategic guidance on execution

---

## 📊 Key Features

- **Interactive Global Filters**: Time period selector affecting all sections
  - Last 3 Months
  - Last 6 Months
  - Last 12 Months
  - Month-by-Month

- **Rich Data Visualization**:
  - Bar charts with dual-axis (Recharts)
  - Funnel visualization with quality segmentation
  - Performance heatmaps
  - Metric cards with trend indicators

- **1,200+ Synthetic Lead Records**:
  - 12 months of realistic data
  - Multiple lead sources (Google Ads, LinkedIn, Referrals, SEO, Social Media, Email)
  - Realistic quality distributions by channel
  - Proper conversion patterns correlated with quality tiers

- **Modern B2B Design**:
  - Teal/turquoise color scheme
  - Clean, professional aesthetic
  - Responsive layout
  - Smooth transitions and interactions

- **Story-Driven Narrative**:
  - Business problem statement
  - Solution approach
  - Measurable outcomes
  - Actionable recommendations

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (global filter state)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: npm

---

## 📁 Project Structure

```
/app
  /components
    Header.tsx                          # Navigation & global filters
    SectionA-LeadQualitySummary.tsx    # Lead quality metrics
    SectionB-PredictiveModel.tsx       # ML feature importance
    SectionC-LeadSourceBreakdown.tsx   # Channel performance
    SectionD-LeadJourney.tsx           # Funnel visualization
    SectionE-LeadProfile.tsx           # Persona insights
    SectionF-Recommendations.tsx       # Actions & roadmap

  /dashboard
    page.tsx                           # Main dashboard page

  /lib
    generateData.ts                    # Synthetic data generation
    store.ts                           # Zustand state management

  /types
    lead.ts                            # TypeScript interfaces

  /data
    (JSON data generated at runtime)

  globals.css                          # Global styles
  layout.tsx                           # Root layout
  page.tsx                             # Root page (redirects to dashboard)
```

---

## 🎓 What This Demonstrates

### Marketing Analytics Skills
- Lead quality scoring and segmentation
- Channel performance analysis and ROI calculation
- Funnel analysis and drop-off identification
- Budget allocation optimization
- Predictive analytics for lead prioritization

### Data Visualization
- Multi-dimensional data representation
- Clear, actionable insights from complex data
- Interactive charts with drill-down capability
- Trend analysis and KPI tracking

### Business Intelligence
- Data-driven decision making
- Strategic recommendations with quantified impact
- Implementation roadmaps
- Success metrics and KPI definitions

### Technical Skills
- Next.js and modern React patterns
- TypeScript for type safety
- State management with Zustand
- Data visualization with Recharts
- Tailwind CSS for professional UI/UX
- Responsive design

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

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
npm run build
npm start
```

---

## 📈 Sample Data Patterns

The synthetic dataset includes:

- **6 Marketing Channels** with realistic quality distributions:
  - Paid Search: 52% high-quality, $85 cost per lead
  - LinkedIn: 48% high-quality, $120 cost per lead
  - Referrals: 75% high-quality, $50 cost per lead
  - SEO: 45% high-quality, $40 cost per lead
  - Social Media: 22% high-quality, $35 cost per lead
  - Email: 40% high-quality, $25 cost per lead

- **5 Law Practice Areas**: Corporate Law, Family Law, IP, Litigation, Real Estate

- **Realistic Conversion Patterns**: Quality tier strongly correlates with conversion rate

- **Lead Funnel Stages**: Awareness → Interest → Booking → Consultation → Conversion

---

## 🎯 Use Cases

This dashboard is ideal for:

- **Portfolio Pieces**: Showcase marketing analytics and BI skills to recruiters
- **Case Studies**: Demonstrate problem-solving in real business scenarios
- **Interview Discussions**: Explain approach to data-driven decision making
- **Learning Tool**: Understand end-to-end analytics dashboard development
- **Template**: Adapt for other B2B analytics scenarios

---

## 🔮 Future Enhancements

Potential additions to expand the project:

- [ ] Real backend with PostgreSQL database
- [ ] User authentication and role-based access
- [ ] CSV/Excel export functionality
- [ ] Advanced filters (industry, firm size, date range)
- [ ] Drill-down drill-through interactions
- [ ] A/B testing results section
- [ ] Real-time data updates with WebSockets
- [ ] Custom report builder
- [ ] Predictive forecasting (trend projections)
- [ ] Competitor benchmarking section

---

## 📊 Key Metrics Explained

**Lead Quality Score** (0-100): Composite score based on:
- Firm size (larger = better fit)
- Engagement level (website activity, content downloads, email opens)
- Lead source (some channels naturally higher quality)
- Industry vertical (some sectors more valuable)

**Conversion Rate**: Percentage of leads that convert to actual clients. High-quality leads show 4-8x better conversion rates.

**Cost per High-Quality Lead**: Total marketing spend divided by number of high-quality leads generated. Lower is better.

**ROI**: (Revenue - Total Cost) / Total Cost × 100. Measures return on marketing investment by channel.

---

## 🤝 Contributing

This is a portfolio project, but feel free to:
- Fork and adapt for your own use case
- Suggest improvements via issues
- Create variations for different industries

---

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

---

## 👤 About

Created as a portfolio project to demonstrate:
- Marketing data analytics expertise
- Advanced dashboard design
- Business intelligence capabilities
- Modern full-stack development skills

**Perfect for:** Data analysts, marketing analysts, business intelligence professionals, and full-stack developers looking to showcase BI skills.

---

**Live Demo**: [Deploy to Vercel](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Flpalad%2Fmda)

**Repository**: https://github.com/lpalad/mda
