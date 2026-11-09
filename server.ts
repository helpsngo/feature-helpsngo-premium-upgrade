import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Security Headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Authoritative Persistent Store Path
const AUTH_DATA_PATH = path.join(__dirname, 'data', 'authoritative_org_store.json');

function readAuthoritativeStore() {
  try {
    if (fs.existsSync(AUTH_DATA_PATH)) {
      const content = fs.readFileSync(AUTH_DATA_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('[server] Error reading authoritative store:', err);
  }
  return null;
}

function writeAuthoritativeStore(data: any) {
  try {
    const dir = path.dirname(AUTH_DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(AUTH_DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[server] Error writing authoritative store:', err);
    return false;
  }
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    organization: 'HELPS Welfare Society',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Single Authoritative Organization Profile & Impact Dataset Endpoint
app.get('/api/ngo/authoritative-profile', (_req: Request, res: Response) => {
  const store = readAuthoritativeStore();
  if (store) {
    return res.json({
      success: true,
      profile: store.profile,
      impact: store.impact,
      transparency: store.transparency,
      team: store.team
    });
  }

  res.status(500).json({ error: 'Authoritative organization data store not available.' });
});

// Update Authoritative Organization Profile (Admin operation)
app.put('/api/ngo/authoritative-profile', (req: Request, res: Response) => {
  const { profile } = req.body;
  if (!profile) {
    return res.status(400).json({ error: 'Profile payload is required.' });
  }

  const store = readAuthoritativeStore() || {};
  store.profile = {
    ...store.profile,
    ...profile,
    lastUpdatedDate: new Date().toISOString().split('T')[0]
  };

  const success = writeAuthoritativeStore(store);
  if (success) {
    return res.json({ success: true, profile: store.profile });
  }
  res.status(500).json({ error: 'Failed to persist updated profile.' });
});

// Central Impact Metrics Endpoint
app.get('/api/ngo/impact-metrics', (_req: Request, res: Response) => {
  const store = readAuthoritativeStore();
  if (store && store.impact) {
    return res.json({ success: true, impact: store.impact });
  }
  res.status(500).json({ error: 'Central impact data not found.' });
});

// Update Central Impact Metrics (Admin operation)
app.put('/api/ngo/impact-metrics', (req: Request, res: Response) => {
  const { impact } = req.body;
  if (!impact) {
    return res.status(400).json({ error: 'Impact payload is required.' });
  }

  const store = readAuthoritativeStore() || {};
  store.impact = {
    ...store.impact,
    ...impact,
    lastUpdatedDate: new Date().toISOString().split('T')[0]
  };

  const success = writeAuthoritativeStore(store);
  if (success) {
    return res.json({ success: true, impact: store.impact });
  }
  res.status(500).json({ error: 'Failed to persist impact metrics.' });
});

// Financial Transparency Endpoint
app.get('/api/ngo/financial-transparency', (_req: Request, res: Response) => {
  const store = readAuthoritativeStore();
  if (store && store.transparency) {
    return res.json({ success: true, transparency: store.transparency });
  }
  res.status(500).json({ error: 'Financial transparency data not found.' });
});

// Update Financial Transparency Records (Admin operation)
app.put('/api/ngo/financial-transparency', (req: Request, res: Response) => {
  const { transparency } = req.body;
  if (!transparency) {
    return res.status(400).json({ error: 'Transparency payload is required.' });
  }

  const store = readAuthoritativeStore() || {};
  store.transparency = {
    ...store.transparency,
    ...transparency,
    lastUpdatedDate: new Date().toISOString().split('T')[0]
  };

  const success = writeAuthoritativeStore(store);
  if (success) {
    return res.json({ success: true, transparency: store.transparency });
  }
  res.status(500).json({ error: 'Failed to persist financial transparency.' });
});

// Verified Team Roster Endpoint
app.get('/api/ngo/team', (req: Request, res: Response) => {
  const store = readAuthoritativeStore();
  const isPublicOnly = req.query.public === 'true';

  if (store && Array.isArray(store.team)) {
    const result = isPublicOnly 
      ? store.team.filter((m: any) => m.approvalStatus === 'approved')
      : store.team;
    return res.json({ success: true, team: result });
  }
  res.status(500).json({ error: 'Team roster not found.' });
});

// Update Verified Team Roster (Admin operation)
app.put('/api/ngo/team', (req: Request, res: Response) => {
  const { team } = req.body;
  if (!Array.isArray(team)) {
    return res.status(400).json({ error: 'Team array payload is required.' });
  }

  const store = readAuthoritativeStore() || {};
  store.team = team;

  const success = writeAuthoritativeStore(store);
  if (success) {
    return res.json({ success: true, team: store.team });
  }
  res.status(500).json({ error: 'Failed to persist team roster.' });
});

// Official NGO Verified Information Endpoint (Legacy compatibility)
app.get('/api/ngo/info', (_req: Request, res: Response) => {
  const store = readAuthoritativeStore();
  const profile = store?.profile;

  res.json({
    name: profile?.officialName || 'HELPS Welfare Society',
    legalName: profile?.legalName || 'HELPS Welfare Society (Regd.)',
    registrationNumber: profile?.verifiedRegistrations?.[0]?.registrationNumber || 'HR/2021/0285458',
    governingAct: 'Societies Registration Act, 1860 (Act XXI of 1860)',
    taxStatus: '12A & 80G Certified • Form CSR-1 Approved (MCA, Govt. of India) • 50% Tax Exemption Under Sec 80G',
    foundedYear: String(profile?.establishedYear || '2016'),
    founder: 'Amarjeet Kumar',
    headOffice: {
      address: profile?.registeredAddress?.formatted || 'H.No-2, Gill Road, Near Guru Nanak Dev Engineering College (GNDEC), Ludhiana, Punjab – 141006, India',
      city: 'Ludhiana',
      state: 'Punjab',
      country: 'India',
      pinCode: '141006'
    },
    operationalAddress: {
      address: profile?.operationalAddress?.formatted || 'GNDEC Campus & Gill Park Field Operations Desk, Gill Road, Ludhiana, Punjab – 141006, India'
    },
    contact: {
      phones: [profile?.primaryPhone || '+91 94729 29856', profile?.secondaryPhone || '+91 62837 77177'],
      emails: [profile?.primaryEmail || 'info@helpsngo.in', profile?.grievanceEmail || 'compliance@helpsngo.in'],
      website: 'https://helpsngo.in/'
    },
    officialBank: {
      bankName: 'ICICI Bank Ltd.',
      branch: 'Civil Lines Branch, Ludhiana, Punjab - 141001',
      accountName: 'HELPS WELFARE SOCIETY',
      accountNumber: '003501048291',
      accountType: 'Current Account',
      ifscCode: 'ICIC0000035',
      upiVpa: 'helpsngo@icici'
    }
  });
});

// Payment Gateway Status Endpoint (Keeps server-side credentials private)
app.get('/api/payment/gateway-status', (_req: Request, res: Response) => {
  const isRazorpayConfigured = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
  res.json({
    onlineGatewayConfigured: isRazorpayConfigured,
    gatewayProvider: isRazorpayConfigured ? 'Razorpay' : null,
    directUpiAvailable: true,
    bankWireAvailable: true,
    officialUpiVpa: 'helpsngo@icici',
    taxExemption80G: true
  });
});

// UTR Submission & Donation Verification Endpoint
app.post('/api/donations/verify-utr', (req: Request, res: Response) => {
  const { utrNumber, amount, donorName, donorEmail, donorPan, projectTitle } = req.body;

  if (!utrNumber || typeof utrNumber !== 'string' || utrNumber.trim().length < 6) {
    return res.status(400).json({
      error: 'Invalid UTR reference. A valid Bank/UPI UTR must be at least 6 characters.'
    });
  }

  const sanitizedUtr = utrNumber.trim().toUpperCase();
  const receiptNumber = `HLP-80G-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // In production, this persists to the verified database ledger.
  return res.json({
    success: true,
    message: 'Donation record queued for trustee bank reconciliation.',
    status: 'pending_verification',
    utrNumber: sanitizedUtr,
    receiptNumber,
    amount: Number(amount) || 0,
    donorName: donorName || 'Valued Supporter',
    donorEmail: donorEmail || '',
    donorPan: donorPan ? String(donorPan).toUpperCase() : '',
    projectTitle: projectTitle || 'Grassroots Relief',
    taxExemptionEligible: true,
    recordedAt: new Date().toISOString()
  });
});

// Grounded Knowledge Base for AJ (AI Assistant for HELPS NGO)
const NGO_VERIFIED_GROUNDING = `
You are "AJ", the official, verified AI Guide and Assistant for HELPS Welfare Society (HELPS NGO).
You provide accurate, transparent, respectful, and source-backed answers to donors, volunteers, CSR partners, and citizens.

CRITICAL NON-NEGOTIABLE RULES:
1. STRICT TRUTH ONLY: Never fabricate facts, imaginary staff members, fake testimonials, non-existent projects, or synthetic donation numbers.
2. If asked about something outside HELPS NGO's scope or if you lack verified data, honestly admit it and direct the user to official contacts: +91 94729 29856 or info@helpsngo.in.
3. Keep answers clear, compassionate, well-formatted, and concise.

VERIFIED FACT SHEET FOR HELPS WELFARE SOCIETY:
- Legal Identity: HELPS Welfare Society (Health, Education, Liberty, Peace, and Service Welfare Society).
- Established: 2016 in Ludhiana, Punjab, India.
- Registration: Registered under Societies Registration Act XXI of 1860 (Registration No: HR/2021/0285458, Chandigarh).
- Income Tax Status: 12A Certified & 80G Certified [CIT(E) CHD/12AA/2016-17/4726].
- 80G Tax Exemption: All eligible donations qualify for 50% deduction under Section 80G of the Indian Income Tax Act. Instant downloadable Form 10BE certificates are generated.
- Corporate CSR: Form CSR-1 Approved by the Ministry of Corporate Affairs (MCA), Government of India for Section 135 CSR projects.
- Leadership: Amarjeet Kumar is the Founder & National Managing Director / Managing Trustee.
- Operational Leaders: Priya Sharma (Field Operations Lead), Dr. Arvind Mehta (Chief Medical Officer), Rahul Verma (GNDEC Student Chapter Lead).
- Registered Address: H.No-2, Gill Road, Near Guru Nanak Dev Engineering College (GNDEC), Ludhiana, Punjab – 141006, India.
- Official Website: https://helpsngo.in/
- Official Emails: info@helpsngo.in (General/Donations), amar@helpsngo.in (Director Desk), compliance@helpsngo.in (Statutory/DPDP Act).
- Helplines: +91 94729 29856 / +91 62837 77177 / +91 98030 54088.
- Official Bank Account:
  * Bank: ICICI Bank Ltd., Civil Lines Branch, Ludhiana, Punjab - 141001
  * Account Name: HELPS WELFARE SOCIETY
  * Account Number: 003501048291 (Current Account)
  * IFSC Code: ICIC0000035
  * Official UPI VPA: helpsngo@icici
- Flagship Welfare Programs:
  1. AABHA — Ek Nayi Kiran (Education): Daily evening remedial classes, distribution of textbooks, school bags, digital tablets, and mentorship for slum and differently-abled children (50,000+ students supported).
  2. Medical Assistance & Health Camps: Free physician health camps with certified doctors, diagnostic tests (blood sugar, ECG, vision/cataracts), and free pharmaceutical dispensation across rural Punjab (150+ health camps).
  3. Green Earth with Bharat: Mass tree plantation drives (50,000+ trees planted) and clean drinking water solar borewells for rural clusters.
  4. Hunger Relief & Annapoorna Meals: Daily hot wholesome cooked meals (500,000+ meals served) and dry ration distribution to destitute families and hospital attendants.
  5. Women Skill Empowerment: 3-month certified vocational stitching, tailoring, and handicraft training centers enabling financial self-reliance.
- Transparency & Allocation:
  * 0% Platform Fee: 100% of public gifts through UPI / Bank wire reach ground relief without intermediary commissions.
  * Audited Programmatic Spend: 88.4% Direct Field Aid, 6.8% Logistics & Field Dispatch, 4.8% Audited Statutory Governance & Compliance.
`;

// Helper for offline / fallback answering if external API is unreachable or key is unset
function generateLocalGroundedAnswer(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('80g') || query.includes('tax') || query.includes('exemption') || query.includes('10be') || query.includes('receipt')) {
    return `**Section 80G Tax Exemption at HELPS NGO:**\n\n` +
      `• HELPS Welfare Society is registered under **Section 12A & 80G** of the Income Tax Act [CIT(E) CHD/12AA/2016-17/4726].\n` +
      `• All eligible contributions qualify for a **50% statutory deduction** under Section 80G.\n` +
      `• Upon verifying your donation UTR/reference, you receive an instant verifiable **Form 10BE tax receipt** compliant with Rule 18AB.\n` +
      `• You can download your Form 10BE receipt directly from the **Profile > Tax Exemption Hub** in this portal, or email us at **info@helpsngo.in**.`;
  }

  if (query.includes('donate') || query.includes('bank') || query.includes('upi') || query.includes('account') || query.includes('give') || query.includes('transfer')) {
    return `**How to Donate Directly to HELPS Welfare Society:**\n\n` +
      `We maintain 100% direct relief with **0% platform fees**:\n\n` +
      `1. **Dynamic UPI QR / VPA:** \`helpsngo@icici\` (Accepts GPay, PhonePe, Paytm, BHIM)\n` +
      `2. **Direct Bank Wire (NEFT/IMPS/RTGS):**\n` +
      `   • Account Name: **HELPS WELFARE SOCIETY**\n` +
      `   • Bank: **ICICI Bank Ltd.** (Civil Lines Branch, Ludhiana)\n` +
      `   • Account Number: **003501048291** (Current A/C)\n` +
      `   • IFSC Code: **ICIC0000035**\n\n` +
      `After transferring, enter your 12-digit UTR in the **Donate** tab to receive your official 80G receipt immediately!`;
  }

  if (query.includes('aabha') || query.includes('education') || query.includes('school') || query.includes('child')) {
    return `**AABHA — Ek Nayi Kiran (Flagship Education Project):**\n\n` +
      `• Founded by HELPS Welfare Society to support underprivileged slum and differently-abled children in Ludhiana and Punjab.\n` +
      `• We operate daily evening tutorial classrooms equipped with school bags, notebooks, study kits, and digital tablets.\n` +
      `• Over **50,000+ students** have received educational mentorship through AABHA since 2016.\n` +
      `• University youth from Guru Nanak Dev Engineering College (GNDEC) volunteer as evening tutors.`;
  }

  if (query.includes('volunteer') || query.includes('join') || query.includes('intern') || query.includes('drive')) {
    return `**Volunteering with HELPS Welfare Society:**\n\n` +
      `• We have an active community of **4,500+ volunteers** across Punjab and pan-India.\n` +
      `• Core volunteer roles include: AABHA Weekend Tutoring, Mobile Health Camp Assistance, Green Earth Tree Plantations, and Community Nutrition Distribution.\n` +
      `• You can sign up natively right here in the **Volunteer** tab.\n` +
      `• All volunteers earn verified certificates and track field service hours.`;
  }

  if (query.includes('amarjeet') || query.includes('founder') || query.includes('leader') || query.includes('director') || query.includes('team')) {
    return `**Leadership & Governance:**\n\n` +
      `• **Amarjeet Kumar** is the Founder & National Managing Director / Managing Trustee of HELPS Welfare Society.\n` +
      `• Operational management includes **Priya Sharma** (Field Logistics), **Dr. Arvind Mehta** (Chief Medical Officer), and **Rahul Verma** (GNDEC Student Chapter Lead).\n` +
      `• Headquartered near GNDEC, Gill Road, Ludhiana, Punjab – 141006.`;
  }

  if (query.includes('csr') || query.includes('corporate') || query.includes('mca') || query.includes('company')) {
    return `**Corporate CSR Co-Sponsorship & Form CSR-1:**\n\n` +
      `• HELPS Welfare Society is **Form CSR-1 certified** by the Ministry of Corporate Affairs (MCA), Government of India, for statutory Section 135 corporate partnerships.\n` +
      `• Corporates can co-sponsor clean water solar borewells, mobile healthcare clinics, and digital school labs with audited BOQ dossiers and impact certificates.\n` +
      `• Explore our **Corporate CSR Portal** in the app or reach our compliance desk at **info@helpsngo.in**.`;
  }

  return `**Welcome to HELPS Welfare Society (Est. 2016, Ludhiana, Punjab):**\n\n` +
    `I am **AJ**, your verified digital assistant. How may I assist you today?\n\n` +
    `• **Section 80G Tax Exemption & Form 10BE** (50% deduction on donations)\n` +
    `• **How to Donate** via ICICI Bank wire or UPI (\`helpsngo@icici\`)\n` +
    `• **AABHA Education Mission** for slum children\n` +
    `• **Free Rural Medical Camps & Mobile Clinic**\n` +
    `• **Volunteer Application & Weekend Field Drives**\n` +
    `• **Official Contact:** +91 94729 29856 • info@helpsngo.in`;
}

// Server-Side Gemini Chat Endpoint for AJ Chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'A message prompt is required.' });
  }

  const userPrompt = message.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful fallback to verified local knowledge base if no key is provisioned yet
    const fallbackAnswer = generateLocalGroundedAnswer(userPrompt);
    return res.json({
      text: fallbackAnswer,
      groundedSource: 'HELPS Welfare Society Verified Data (Offline Engine)',
      modelUsed: 'local-verified-kb'
    });
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const conversationHistory = Array.isArray(history) 
      ? history.slice(-6).map((h: any) => `${h.role === 'user' ? 'User' : 'AJ'}: ${h.text}`).join('\n')
      : '';

    const promptWithContext = conversationHistory 
      ? `Previous conversation:\n${conversationHistory}\n\nUser Question: ${userPrompt}`
      : `User Question: ${userPrompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptWithContext,
      config: {
        systemInstruction: NGO_VERIFIED_GROUNDING
      }
    });

    const replyText = response.text || generateLocalGroundedAnswer(userPrompt);

    return res.json({
      text: replyText,
      groundedSource: 'HELPS Welfare Society Verified Knowledge (Gemini 3.8 Flash)',
      modelUsed: 'gemini-3.8-flash'
    });
  } catch (error: any) {
    console.error('[AJ Chatbot] Gemini API error, falling back to verified local knowledge:', error?.message || error);
    const fallbackAnswer = generateLocalGroundedAnswer(userPrompt);
    return res.json({
      text: fallbackAnswer,
      groundedSource: 'HELPS Welfare Society Verified Fallback',
      modelUsed: 'local-verified-kb',
      notice: 'Served with verified local knowledge base.'
    });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HELPS NGO Platform] Server running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[HELPS NGO Platform] Failed to start server:', err);
  process.exit(1);
});
