export const transactionsData = [
  {
    id: "tx-9081",
    date: "2026-05-24",
    merchant: "Amazon Web Services",
    description: "Cloud compute EC2 & RDS billing",
    category: "Cloud Infrastructure",
    type: "expense",
    amount: 1420.50,
    status: "Completed",
    riskScore: 8,
    aiInsight: "Standard recurring server expense. Matches historical 3-month variance."
  },
  {
    id: "tx-9082",
    date: "2026-05-23",
    merchant: "Stripe Payout",
    description: "Daily merchant settlement",
    category: "Revenue",
    type: "income",
    amount: 8750.00,
    status: "Completed",
    riskScore: 2,
    aiInsight: "Inbound revenue matches standard weekend volumes."
  },
  {
    id: "tx-9083",
    date: "2026-05-23",
    merchant: "Figma Inc",
    description: "Monthly design team seats",
    category: "SaaS Tools",
    type: "expense",
    amount: 320.00,
    status: "Completed",
    riskScore: 5,
    aiInsight: "Regular billing. Price increased by $10 due to tier upgrade last month."
  },
  {
    id: "tx-9084",
    date: "2026-05-22",
    merchant: "Unknown Terminal #49",
    description: "ATM Cash Withdrawal in NY, USA",
    category: "Uncategorized",
    type: "expense",
    amount: 250.00,
    status: "Flagged",
    riskScore: 89,
    aiInsight: "High Risk! Monitored device location is London, UK. Withdrawal occurred in NY. Immediate verification required."
  },
  {
    id: "tx-9085",
    date: "2026-05-21",
    merchant: "Google Cloud Platform",
    description: "BigQuery and AI API usage charges",
    category: "Cloud Infrastructure",
    type: "expense",
    amount: 780.20,
    status: "Completed",
    riskScore: 12,
    aiInsight: "Slightly elevated query usage due to new LLM deployment models."
  },
  {
    id: "tx-9086",
    date: "2026-05-20",
    merchant: "Vercel Enterprise",
    description: "Web hosting and CDN hosting",
    category: "SaaS Tools",
    type: "expense",
    amount: 450.00,
    status: "Completed",
    riskScore: 4,
    aiInsight: "Consistent baseline hosting cost. Under optimized resource utilization."
  },
  {
    id: "tx-9087",
    date: "2026-05-19",
    merchant: "OpenAI API",
    description: "Credits top-up for GPT-4o usage",
    category: "SaaS Tools",
    type: "expense",
    amount: 500.00,
    status: "Completed",
    riskScore: 9,
    aiInsight: "Matches scheduled pipeline executions. 4% saving available via pre-paid tokens."
  },
  {
    id: "tx-9088",
    date: "2026-05-18",
    merchant: "Meta Ads Platform",
    description: "Q2 Campaign advertising costs",
    category: "Marketing",
    type: "expense",
    amount: 2300.00,
    status: "Completed",
    riskScore: 15,
    aiInsight: "Ad spend correlates with 14% growth in Stripes intake this week."
  },
  {
    id: "tx-9089",
    date: "2026-05-18",
    merchant: "HubSpot CRM",
    description: "Annual subscription installment",
    category: "SaaS Tools",
    type: "expense",
    amount: 1100.00,
    status: "Completed",
    riskScore: 10,
    aiInsight: "Locked-in contract. Under review for renewal in 4 months."
  },
  {
    id: "tx-9090",
    date: "2026-05-17",
    merchant: "Shopify Merchant",
    description: "Inbound client invoice payout",
    category: "Revenue",
    type: "income",
    amount: 3450.00,
    status: "Completed",
    riskScore: 1,
    aiInsight: "Standard recurring subscription inflow."
  },
  {
    id: "tx-9091",
    date: "2026-05-16",
    merchant: "CryptoSwap Inc",
    description: "Decentralized Liquidity Transfer",
    category: "Investments",
    type: "expense",
    amount: 850.00,
    status: "Flagged",
    riskScore: 94,
    aiInsight: "Critical Alert! Non-whitelist external wallet address. Flagged under automatic capital-outflow regulations."
  }
];

export const mockInsights = [
  {
    id: "ins-1",
    type: "warning",
    title: "SaaS Cost Spikes",
    description: "SaaS tools and cloud hosting costs are up 18% YoY. You have 3 duplicate user seats on Figma.",
    actionText: "De-duplicate Figma Seats"
  },
  {
    id: "ins-2",
    type: "info",
    title: "Prepayment Discount",
    description: "OpenAI API offers 10% credit discount for prepaid bundles above $2,000. Save $200 annually.",
    actionText: "Claim Discount"
  },
  {
    id: "ins-3",
    type: "success",
    title: "Monetization Signal",
    description: "Your revenue-to-infra spending ratio is extremely healthy at 5.4x. Room to expand campaign limits.",
    actionText: "Increase Ad Spend"
  }
];
