// Module and lesson data for the financial education app
// POC: Cash Flow Basics module fully built out
// Other modules listed as coming soon

export const modules = [
  {
    id: 'cash-flow',
    title: 'Cash Flow',
    subtitle: 'Master your money movement',
    icon: '💸',
    color: '#10B981',
    lessons: [
      {
        id: 'what-is-cash-flow',
        title: 'What is Cash Flow?',
        icon: '🌊',
        xpReward: 15,
        steps: [
          {
            type: 'info',
            title: 'Cash Flow = Survival',
            body: 'Cash flow is simply the money coming IN minus the money going OUT of your business. Profit on paper means nothing if you can\'t pay rent this Friday.',
          },
          {
            type: 'info',
            title: 'Two Directions',
            body: '**Inflow**: Money arriving — client payments, sales, refunds you receive.\n\n**Outflow**: Money leaving — rent, supplies, subscriptions, taxes.',
          },
          {
            type: 'quiz',
            question: 'You invoiced a client $2,000 but they haven\'t paid yet. Is this cash inflow?',
            options: ['Yes, you earned it', 'No, cash hasn\'t arrived yet'],
            correctIndex: 1,
            explanation: 'Until the money hits your account, it\'s not cash inflow. This is the #1 trap for new entrepreneurs — revenue ≠ cash.',
          },
          {
            type: 'info',
            title: 'Positive vs Negative',
            body: '**Positive cash flow**: More coming in than going out. You can breathe.\n\n**Negative cash flow**: More going out. Not fatal short-term, but you need a plan.',
          },
          {
            type: 'quiz',
            question: 'This month you collected $4,000 from clients and spent $4,500 on expenses. Your cash flow is:',
            options: ['Positive: +$500', 'Negative: -$500', 'Break even'],
            correctIndex: 1,
            explanation: '$4,000 - $4,500 = -$500. Negative cash flow. Time to either boost income or trim expenses.',
          },
          {
            type: 'quiz',
            question: 'Why might a "profitable" business still run out of cash?',
            options: [
              'Clients pay late while bills are due now',
              'This can\'t happen — profit means you have cash',
              'Only big companies have this problem',
            ],
            correctIndex: 0,
            explanation: 'Timing is everything. If you deliver in January but get paid in March, you still need to cover two months of expenses.',
          },
        ],
      },
      {
        id: 'track-your-income',
        title: 'Track Your Income',
        icon: '📥',
        xpReward: 15,
        steps: [
          {
            type: 'info',
            title: 'Know Every Dollar Coming In',
            body: 'As a solo entrepreneur, your income might come from multiple streams: services, products, freelance gigs, or passive income. Track them ALL — even the small ones.',
          },
          {
            type: 'info',
            title: 'The Simple Income Log',
            body: 'Every week, write down:\n\n1. **Source** — Who paid you?\n2. **Amount** — How much?\n3. **Date received** — When did it actually arrive?\n4. **Method** — Cash, check, transfer, card?',
          },
          {
            type: 'quiz',
            question: 'You do graphic design AND sell templates online. How should you track income?',
            options: [
              'Combine everything into one total',
              'Track each stream separately',
              'Only track the bigger one',
            ],
            correctIndex: 1,
            explanation: 'Separate streams help you see what\'s actually working. Maybe templates earn more per hour than client work.',
          },
          {
            type: 'info',
            title: 'Recurring vs One-time',
            body: '**Recurring income** (monthly retainers, subscriptions) is your safety net — it\'s predictable.\n\n**One-time income** (project fees, sales) is a bonus — don\'t depend on it for fixed costs.',
          },
          {
            type: 'quiz',
            question: 'Which is more reliable for covering your monthly rent?',
            options: [
              'A $3,000 one-time project',
              'Three clients paying $500/month each',
            ],
            correctIndex: 1,
            explanation: 'Recurring income of $1,500/month is more reliable than hoping for big one-time projects. Build your base with recurring revenue.',
          },
          {
            type: 'quiz',
            question: 'You received a $1,200 payment on March 15 for work done in February. When do you log it as cash inflow?',
            options: ['February (when you did the work)', 'March 15 (when you received it)', 'Split between both months'],
            correctIndex: 1,
            explanation: 'Cash flow tracking is about when money actually moves. Log it when it hits your account — March 15.',
          },
        ],
      },
      {
        id: 'know-your-expenses',
        title: 'Know Your Expenses',
        icon: '📤',
        xpReward: 15,
        steps: [
          {
            type: 'info',
            title: 'Fixed vs Variable',
            body: '**Fixed expenses** stay the same: rent, insurance, subscriptions, loan payments.\n\n**Variable expenses** change: supplies, marketing spend, shipping, contractor fees.',
          },
          {
            type: 'quiz',
            question: 'Your $50/month website hosting is a:',
            options: ['Variable expense', 'Fixed expense', 'Not a business expense'],
            correctIndex: 1,
            explanation: 'It\'s the same every month regardless of sales — that\'s fixed. Knowing this helps you calculate your minimum monthly need.',
          },
          {
            type: 'info',
            title: 'Your Survival Number',
            body: 'Add up ALL your fixed monthly expenses. This is your **survival number** — the minimum you must earn each month just to keep the lights on.\n\nExample: Rent $800 + Phone $60 + Software $40 + Insurance $100 = **$1,000/month minimum**.',
          },
          {
            type: 'quiz',
            question: 'Your fixed costs are $1,200/month. You earned $1,400 this month. How much is truly "available" money?',
            options: ['$1,400', '$200', '$1,200'],
            correctIndex: 1,
            explanation: '$1,400 - $1,200 = $200 available after covering your survival number. This is what you can reinvest or save.',
          },
          {
            type: 'info',
            title: 'The Expense Audit',
            body: 'Every month, scan your expenses for:\n\n- **Zombie subscriptions** you forgot about\n- **Nice-to-haves** vs **must-haves**\n- Services you could **downgrade** without impact',
          },
          {
            type: 'quiz',
            question: 'You pay $30/month for a design tool you used twice last year. What should you do?',
            options: [
              'Keep it — you might need it',
              'Cancel it — that\'s $360/year saved',
              'Upgrade to the pro plan for more features',
            ],
            correctIndex: 1,
            explanation: 'That\'s a zombie subscription. $360/year for 2 uses = $180 per use. Cancel it and use a free alternative or pay per-use.',
          },
        ],
      },
      {
        id: 'cash-flow-statement',
        title: 'Your Cash Flow Map',
        icon: '🗺️',
        xpReward: 20,
        steps: [
          {
            type: 'info',
            title: 'The One-Page Cash Flow Statement',
            body: 'Forget complicated accounting. Your cash flow statement is just three numbers:\n\n1. **Starting cash** (what you had at month start)\n2. **Plus inflows** (all money received)\n3. **Minus outflows** (all money spent)\n\n= **Ending cash**',
          },
          {
            type: 'info',
            title: 'A Real Example',
            body: 'Maria runs a small bakery:\n\n- Started March with **$2,000** in the bank\n- Received **$3,500** from sales\n- Spent **$2,800** on ingredients, rent, utilities\n\nEnding cash: $2,000 + $3,500 - $2,800 = **$2,700**\n\nShe\'s $700 ahead. Good month.',
          },
          {
            type: 'quiz',
            question: 'You start the month with $1,500. Inflows: $3,000. Outflows: $3,200. Your ending cash is:',
            options: ['$1,300', '$1,500', '$300'],
            correctIndex: 0,
            explanation: '$1,500 + $3,000 - $3,200 = $1,300. You spent more than you earned, but your savings cushion kept you afloat.',
          },
          {
            type: 'info',
            title: 'Why This Matters',
            body: 'Do this **every month**. In 10 minutes you\'ll know:\n\n- Are you trending up or down?\n- How many months of runway do you have?\n- Do you need to hustle harder or cut costs?',
          },
          {
            type: 'quiz',
            question: 'Your ending cash has dropped 3 months in a row: $3,000 → $2,400 → $1,900. What does this trend tell you?',
            options: [
              'Nothing, fluctuations are normal',
              'You\'re slowly bleeding cash — take action now',
              'Wait another 3 months to be sure',
            ],
            correctIndex: 1,
            explanation: 'Three consecutive months of decline is a clear signal. At this rate, you\'ll be in trouble soon. Time to boost income or cut costs.',
          },
        ],
      },
      {
        id: 'cash-flow-forecast',
        title: 'Predict Your Future',
        icon: '🔮',
        xpReward: 20,
        steps: [
          {
            type: 'info',
            title: 'Forecasting = Planning Ahead',
            body: 'A cash flow forecast is your best guess at next month\'s cash flow. It\'s not about being perfect — it\'s about not being surprised.\n\nLook at the next 4 weeks: What payments are coming in? What bills are due?',
          },
          {
            type: 'info',
            title: 'The Quick Forecast',
            body: 'For next month, estimate:\n\n- **Expected inflows**: Confirmed clients + likely sales\n- **Certain outflows**: Bills, rent, subscriptions (you know these)\n- **Probable outflows**: Supplies, marketing (estimate high)\n\nIf outflows > inflows, you need a plan NOW, not next month.',
          },
          {
            type: 'quiz',
            question: 'You have 2 confirmed clients ($1,000 each) and 1 "maybe" client ($1,500) for next month. What should you forecast as inflow?',
            options: [
              '$3,500 — include everyone',
              '$2,000 — only count confirmed',
              '$2,750 — split the difference',
            ],
            correctIndex: 1,
            explanation: 'Forecast conservatively. Count confirmed money only. If the maybe becomes a yes, that\'s a bonus — not your plan.',
          },
          {
            type: 'info',
            title: 'The Emergency Buffer',
            body: 'Aim to keep **at least 1 month of expenses** saved as a buffer. This is your runway.\n\nIf your monthly expenses are $2,000, you want $2,000 sitting untouched. Two months ($4,000) is better. Three months is peace of mind.',
          },
          {
            type: 'quiz',
            question: 'Your monthly expenses are $1,800. You have $5,400 in savings. How many months of runway do you have?',
            options: ['2 months', '3 months', '4 months'],
            correctIndex: 1,
            explanation: '$5,400 ÷ $1,800 = 3 months of runway. Solid. Keep building it while times are good.',
          },
          {
            type: 'quiz',
            question: 'What\'s the #1 benefit of cash flow forecasting for a solo entrepreneur?',
            options: [
              'Impressing your accountant',
              'Spotting problems before they become emergencies',
              'Getting a bank loan',
            ],
            correctIndex: 1,
            explanation: 'Forecasting gives you TIME to react. Seeing a cash crunch 4 weeks away is manageable. Discovering it the day rent is due is a crisis.',
          },
        ],
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Profit',
    subtitle: 'Charge what you\'re worth',
    icon: '🏷️',
    color: '#6366F1',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'taxes',
    title: 'Tax Essentials',
    subtitle: 'Keep more of what you earn',
    icon: '🧾',
    color: '#F59E0B',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'savings',
    title: 'Saving & Emergency Fund',
    subtitle: 'Build your safety net',
    icon: '🛡️',
    color: '#EF4444',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'growth',
    title: 'Reinvest & Grow',
    subtitle: 'Scale without debt',
    icon: '📈',
    color: '#8B5CF6',
    comingSoon: true,
    lessons: [],
  },
];

export const dailyQuests = [
  {
    id: 'complete-lesson',
    title: 'Complete a lesson',
    target: 1,
    reward: 10,
    icon: '📖',
  },
  {
    id: 'earn-xp',
    title: 'Earn 30 coins',
    target: 30,
    reward: 5,
    icon: '⚡',
  },
];
