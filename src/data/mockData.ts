
export const COMPANY_CATEGORIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Energy',
  'Transportation',
  'Telecommunications',
  'Media',
  'Real Estate',
  'Food & Beverage',
  'Other'
];

export const COMPANY_SIZES = [
  'Small',
  'Medium',
  'Large',
  'Enterprise'
];

export const LOCATIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Singapore',
  'Other'
];

export const ACTION_TYPES = [
  '',
  'Contact Us',
  'Apply',
  'Purchase'
];

export const MOCK_COMPANIES = [
  {
    id: '1',
    name: 'TechInnovate Solutions',
    category: 'Technology',
    size: 'Medium',
    location: 'United States',
    description: '<p>TechInnovate Solutions is a leading provider of innovative software solutions for businesses of all sizes.</p>',
    website: 'https://techinnovate.example.com',
    revenue: '$10M - $50M',
    foundedDate: '2015-05-12',
    headquarters: 'San Francisco, CA',
    mission: '<p>Our mission is to help businesses transform through innovative technology solutions.</p>',
    companyValues: ['Innovation', 'Integrity', 'Excellence', 'Customer Focus'],
    createdAt: '2023-01-01T12:00:00Z',
    updatedAt: '2023-06-15T09:30:00Z',
    portfolio: [
      {
        id: 'p1',
        title: 'AI-Powered Analytics Platform',
        description: '<p>An advanced analytics platform using artificial intelligence to provide actionable insights.</p>',
        action: 'Contact Us',
        actionLink: 'https://techinnovate.example.com/contact'
      }
    ]
  },
  {
    id: '2',
    name: 'FinanceWise Global',
    category: 'Finance',
    size: 'Large',
    location: 'United Kingdom',
    description: '<p>FinanceWise Global provides comprehensive financial services to clients worldwide.</p>',
    website: 'https://financewise.example.com',
    revenue: '$100M - $500M',
    foundedDate: '2008-11-03',
    headquarters: 'London, UK',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-05-20T14:45:00Z'
  },
  {
    id: '3',
    name: 'HealthPlus Medical',
    category: 'Healthcare',
    size: 'Large',
    location: 'Canada',
    description: '<p>HealthPlus Medical is dedicated to providing innovative healthcare solutions.</p>',
    website: 'https://healthplus.example.com',
    createdAt: '2023-02-05T08:15:00Z',
    updatedAt: '2023-07-10T11:20:00Z'
  }
];
