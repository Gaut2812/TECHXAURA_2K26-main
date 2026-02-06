# SYSTEM PROMPT: TECHXAURA 2K26 Symposium Website

You are an expert full-stack web developer tasked with building a complete symposium registration website for TECHXAURA 2K26. Build a production-ready, responsive, and visually stunning website with the following specifications:

---

## PROJECT OVERVIEW

**Event Name:** TECHXAURA 2K26  
**Purpose:** College technical symposium with event registration, team management, and payment system  
**Tech Stack:** React.js, Firebase (Authentication, Firestore, Storage), Tailwind CSS, Framer Motion  
**Key Features:** User authentication, event registration with cart system, team management, payment verification, admin analytics

---

## 1. LANDING PAGE

### Requirements:
- **Hero Section:**
  - Large, bold "TECHXAURA 2K26" title with animated gradient effect
  - Tagline about the symposium
  - Eye-catching animations (particles, glowing effects, parallax)
  - Call-to-action button: "Register Now"
  - Event date and venue prominently displayed

- **About Section:**
  - Brief description of the symposium
  - Key highlights and attractions
  - Statistics (number of events, expected participants, prizes)

- **Events Showcase:**
  - Grid/card layout showing all events with:
    - Event name
    - Category (Technical/Non-Technical)
    - Brief description
    - Team size (1-5 members)
    - Timing/Schedule
    - Entry fee: ₹100 per team
  
- **Key Information Cards:**
  - "Food will be provided"
  - "Entry fee: ₹100 per team (up to 5 members)"
  - "Register early to secure your spot"

- **Footer:**
  - Contact information
  - Social media links
  - College details

- **Organizers Button:**
  - Fixed position (top-right corner)
  - Redirects to admin login modal
  - Styled differently from main CTA

### Design Guidelines:
- Dark theme with neon accents (cyan, purple, pink gradients)
- Modern, tech-inspired aesthetic
- Glassmorphism effects
- Smooth scroll animations
- Mobile-first responsive design

---

## 2. AUTHENTICATION SYSTEM

### Registration Flow:

**Step 1: Registration Form**
```
Fields Required:
- Full Name (text, required)
- Email (gmail.com validation, unique)
- Phone Number (10 digits, Indian format, required)
- Password (min 8 characters, required)
- Confirm Password (must match)
- College Name (text, required)
- Department (dropdown, required)
```

**Validation Rules:**
- Email MUST end with @gmail.com
- Phone number must be exactly 10 digits
- No duplicate emails allowed
- All fields mandatory

**OAuth Integration (Optional - Free):**
- Google Sign-In using Firebase Authentication
- Auto-fill email and name from Google account
- Still require phone number and college details

### Login Flow:

**Step 2: Login Form**
```
Fields:
- Email (gmail.com validation)
- Password
- "Forgot Password" link
- "Don't have an account? Register" link
```

**Logic:**
- If email exists in database → Verify password → Login
- If email doesn't exist → Show prompt: "Email not registered. Please register first."
- Redirect to registration form

**UI Layout:**
- Split screen design (50/50)
- Left side: Registration form
- Right side: Login form
- Or tabbed interface (Register | Login)

---

## 3. DASHBOARD - RULES DIALOG

**Immediately after login, show modal dialog (cannot be closed without clicking OK):**

```
Title: "IMPORTANT RULES & REGULATIONS"

Content:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📢 FOOD WILL BE PROVIDED

💰 ENTRY FEE: ₹100 PER TEAM
   (One payment covers up to 5 members)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RULES:

1. A team can consist of MAXIMUM 5 MEMBERS
   Single payment of ₹100 is enough for 5 or less members

2. You can participate in ANY EVENTS according to each event's timing
   with your registered team members, based on event team size requirements

3. SPLIT YOUR TEAM according to events
   Participate in other events ONLY if your registered event ends
   
⚠️ You CANNOT register the same members for events happening at the same time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By clicking "I Understand", you agree to follow these rules.

[I Understand & Proceed]
```

**Behavior:**
- Modal overlay (blur background)
- Cannot be dismissed by clicking outside
- Must click "I Understand" to proceed
- Show only once per login session
- Store acknowledgment in localStorage

---

## 4. EVENTS CATALOG

### Event Categories:

**TECHNICAL EVENTS:**
1. **MindSparkX** (Quiz/Problem Solving)
2. **Design-O-Mania** (Design Competition)
3. **Business Battle** (Business Case Study)
4. **Fix The Glitch** (Debugging Challenge)
5. **Paper Presentation** (Research Presentation)

**NON-TECHNICAL EVENTS:**
6. **Start Music** (Music Competition)
7. **Box Cricket** (Indoor Cricket)
8. **E-Sports** (Gaming Tournament)
9. **Clash of Talents** (Talent Show)
10. **IPL Auction** (Mock IPL Auction)

**BREAKOUT EVENTS:**
11. **Carrom 2.0** (Carrom Tournament)
12. **Vaanga Pazhagalam** (Tamil Event/Cultural)

### Event Card Data Structure:
```javascript
{
  id: "event-001",
  name: "MindSparkX",
  category: "Technical",
  description: "Test your problem-solving skills...",
  teamSize: {
    min: 1,
    max: 3
  },
  timing: "10:00 AM - 12:00 PM",
  timeSlot: "slot-1", // For conflict detection
  venue: "Block A - Hall 101",
  price: 0, // Individual event fee (if any, else 0)
  rules: ["Rule 1", "Rule 2"],
  prizes: "1st: ₹5000, 2nd: ₹3000"
}
```

### Display Features:
- Filter by category (All, Technical, Non-Technical, Breakout)
- Search functionality
- "Add to Cart" button on each event card
- Show if already in cart (change to "Remove from Cart")
- Display event timing prominently
- Highlight time slot conflicts

---

## 5. CART & TEAM MANAGEMENT SYSTEM

### Cart Functionality:

**Add to Cart:**
- When user clicks "Add to Cart" on event
- Show modal: "Enter Team Details for [Event Name]"
- Dynamic form based on team size

**Team Details Form:**
```javascript
For each team member (based on event's max team size):
{
  memberNumber: 1, // 1 to max team size
  name: "",       // Text input, required
  email: "",      // Email validation, required
  phone: ""       // 10 digits, required
}

// Example for 3-member team event:
Team Member 1:
  - Name: _______
  - Email: _______
  - Phone: _______
  
Team Member 2:
  - Name: _______
  - Email: _______
  - Phone: _______
  
Team Member 3:
  - Name: _______
  - Email: _______
  - Phone: _______
```

**Validation Rules:**
- Minimum 1 member, maximum as per event
- No duplicate emails within the same event
- Email format validation
- Phone number must be 10 digits
- All fields required for each member

**Cart Item Structure:**
```javascript
{
  eventId: "event-001",
  eventName: "MindSparkX",
  timeSlot: "slot-1",
  teamMembers: [
    { name: "John Doe", email: "john@gmail.com", phone: "9876543210" },
    { name: "Jane Doe", email: "jane@gmail.com", phone: "9876543211" }
  ],
  memberEmails: ["john@gmail.com", "jane@gmail.com"] // For conflict checking
}
```

### Conflict Detection:

**Same Member, Same Time Slot:**
```javascript
// Check before adding to cart:
function checkConflict(newEvent, cart) {
  const conflictingEvents = cart.filter(item => 
    item.timeSlot === newEvent.timeSlot
  );
  
  for (let conflictEvent of conflictingEvents) {
    const commonMembers = newEvent.memberEmails.filter(email =>
      conflictEvent.memberEmails.includes(email)
    );
    
    if (commonMembers.length > 0) {
      return {
        conflict: true,
        message: `${commonMembers.join(', ')} already registered for ${conflictEvent.eventName} at the same time!`,
        conflictingEvent: conflictEvent.eventName
      };
    }
  }
  
  return { conflict: false };
}
```

**Error Handling:**
- Show error toast if conflict detected
- Highlight conflicting events in cart
- Allow user to remove conflicting event or modify team

### Cart Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR CART (3 Events)

1. MindSparkX (Technical)
   Time: 10:00 AM - 12:00 PM
   Team Members:
   • John Doe (john@gmail.com, 9876543210)
   • Jane Doe (jane@gmail.com, 9876543211)
   [Edit Team] [Remove]

2. Box Cricket (Non-Technical)
   Time: 2:00 PM - 4:00 PM
   Team Members:
   • John Doe (john@gmail.com, 9876543210)
   • Mike Smith (mike@gmail.com, 9876543212)
   • Sarah Wilson (sarah@gmail.com, 9876543213)
   [Edit Team] [Remove]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ₹100 (covers all events)

[Continue Shopping] [Proceed to Checkout]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 6. CHECKOUT & PAYMENT SYSTEM

### Checkout Page Flow:

**Step 1: Review & Verify**
- Show all cart items with team details
- Final confirmation: "Please verify all details carefully. You cannot edit after payment."
- Checkbox: "I confirm all details are correct"
- [Back to Cart] [Proceed to Payment]

**Step 2: Payment**

Display Payment QR Code:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAYMENT DETAILS

Amount to Pay: ₹100

Scan this QR code to pay:

[Display UPI QR Code Image]

UPI ID: techxaura2k26@upi
Or
Phone Pay/Google Pay: 9876543210

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After payment, upload screenshot below:

[Upload Payment Screenshot]
(JPEG, PNG only | Max 5MB)

⚠️ IMPORTANT:
• You can upload only ONE screenshot
• You can delete and re-upload ONCE
• After final submission, no changes allowed

[Delete & Re-upload] [Submit Payment Proof]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Payment Screenshot Upload:

**Upload Logic:**
```javascript
const handleUpload = async (file, userId, registrationId) => {
  // Validate file
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    alert('Only JPEG and PNG files allowed');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB');
    return;
  }
  
  // Upload to Firebase Storage
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`payments/${userId}/${registrationId}.${file.type.split('/')[1]}`);
  
  await fileRef.put(file);
  const downloadURL = await fileRef.getDownloadURL();
  
  // Save to Firestore
  await firebase.firestore().collection('registrations').doc(registrationId).update({
    paymentProof: downloadURL,
    paymentUploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
    uploadCount: firebase.firestore.FieldValue.increment(1)
  });
  
  return downloadURL;
};
```

**Re-upload Logic:**
- Track `uploadCount` in database
- Allow deletion if `uploadCount === 1`
- On delete: Remove from Firebase Storage
- Decrement `uploadCount`
- Allow one more upload
- After second upload, disable delete button

**After Successful Submission:**
- Show success message
- Store complete registration data
- Redirect to thank you page

---

## 7. THANK YOU PAGE

**Content:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 REGISTRATION SUCCESSFUL! 🎉

Thank you for registering for TECHXAURA 2K26

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Registration ID: TXA2026-00123

Your payment is under review.
You will receive confirmation via email within 24 hours.

EVENTS REGISTERED:
✓ MindSparkX
✓ Box Cricket
✓ E-Sports

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT:
• Bring your College ID on event day
• Report to registration desk 30 minutes before your first event
• Check your email for event schedules and updates

Need help? Contact: techxaura2k26@gmail.com

[View Registration Details] [Back to Home]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**After 3 seconds:**
- Auto-redirect to landing page
- Or show countdown: "Redirecting to home in 3... 2... 1..."

---

## 8. ADMIN PANEL

### Admin Login:

**Credentials (Hardcoded):**
```javascript
const ADMIN_CREDENTIALS = {
  email: "admin@techxaura2k26.com",
  password: "TechXaura@Admin2026"
};
```

**Access Flow:**
1. User clicks "Organizers" button on landing page
2. Modal shows admin login form
3. Validate credentials
4. If correct → Redirect to `/admin/dashboard`
5. If incorrect → Show error: "Invalid admin credentials"

### Admin Dashboard:

**Layout:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHXAURA 2K26 - ADMIN DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERVIEW STATISTICS

┌─────────────────┬─────────────────┬─────────────────┐
│ Total Users     │ Paid Users      │ Pending         │
│ 145             │ 120             │ 25              │
└─────────────────┴─────────────────┴─────────────────┘

┌─────────────────────────────────────────────────────┐
│ Total Revenue: ₹12,000                               │
└─────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVENT-WISE REGISTRATIONS

Technical Events:
• MindSparkX: 45 teams (135 participants)
• Design-O-Mania: 30 teams (60 participants)
• Business Battle: 25 teams (75 participants)
• Fix The Glitch: 40 teams (80 participants)
• Paper Presentation: 20 teams (40 participants)

Non-Technical Events:
• Start Music: 15 teams (15 participants)
• Box Cricket: 20 teams (100 participants)
• E-Sports: 50 teams (100 participants)
• Clash of Talents: 30 teams (30 participants)
• IPL Auction: 10 teams (50 participants)

Breakout Events:
• Carrom 2.0: 25 teams (50 participants)
• Vaanga Pazhagalam: 18 teams (36 participants)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Export All Data to Excel] [View Payment Proofs]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Detailed Registrations Table:**
```
Search: [_______________________]  Filter: [All Events ▼]

ID    | Name        | Email              | Phone      | Events        | Payment | Actions
------|-------------|--------------------|-----------|--------------|---------|---------
001   | John Doe    | john@gmail.com     | 9876543210| 3 events     | ✓ Paid  | [View]
002   | Jane Smith  | jane@gmail.com     | 9876543211| 2 events     | ⏳ Pending | [View]
003   | Mike Wilson | mike@gmail.com     | 9876543212| 4 events     | ✓ Paid  | [View]

[Previous] Page 1 of 15 [Next]
```

**Click "View" on any registration:**
- Show modal with complete details
- All events they registered for
- All team members for each event
- Payment proof image (clickable to view full size)
- Payment status (Approved/Pending/Rejected)
- Actions: [Approve Payment] [Reject Payment] [Send Email]

---

## 9. DATA STORAGE & EXCEL EXPORT

### Firebase Firestore Structure:

```
users/
  {userId}/
    - email: string
    - name: string
    - phone: string
    - college: string
    - department: string
    - createdAt: timestamp
    - rulesAccepted: boolean

registrations/
  {registrationId}/
    - userId: string
    - userName: string
    - userEmail: string
    - userPhone: string
    - events: array [
        {
          eventId: string
          eventName: string
          category: string
          timeSlot: string
          teamMembers: array [
            { name, email, phone }
          ]
        }
      ]
    - paymentProof: string (Firebase Storage URL)
    - paymentStatus: "pending" | "approved" | "rejected"
    - totalAmount: 100
    - uploadCount: number
    - createdAt: timestamp
    - updatedAt: timestamp

events/
  {eventId}/
    - name: string
    - category: string
    - teamSize: { min, max }
    - timing: string
    - timeSlot: string
    - registeredTeams: number
    - registeredParticipants: number
```

### Excel Export Function:

**Generate Excel with multiple sheets:**

**Sheet 1: All Registrations**
```
Registration ID | User Name | Email | Phone | College | Department | Events Count | Payment Status | Payment Proof Link | Registered At
```

**Sheet 2: Event-Wise Details**
```
Event Name | Category | Team Size | Registration ID | Team Member Names | Team Member Emails | Team Member Phones
```

**Sheet 3: Summary Statistics**
```
Metric | Value
Total Registrations | 145
Total Revenue | ₹14,500
Technical Events Participants | 390
Non-Technical Events Participants | 295
Breakout Events Participants | 86
```

**Implementation:**
```javascript
import * as XLSX from 'xlsx';

const exportToExcel = async () => {
  // Fetch all data from Firestore
  const registrations = await fetchAllRegistrations();
  
  // Prepare data for each sheet
  const allRegsData = registrations.map(reg => ({
    'Registration ID': reg.id,
    'User Name': reg.userName,
    'Email': reg.userEmail,
    'Phone': reg.userPhone,
    'College': reg.college,
    'Department': reg.department,
    'Events Count': reg.events.length,
    'Payment Status': reg.paymentStatus,
    'Payment Proof': reg.paymentProof || 'Not uploaded',
    'Registered At': new Date(reg.createdAt).toLocaleString()
  }));
  
  const eventWiseData = [];
  registrations.forEach(reg => {
    reg.events.forEach(event => {
      event.teamMembers.forEach(member => {
        eventWiseData.push({
          'Event Name': event.eventName,
          'Category': event.category,
          'Registration ID': reg.id,
          'Member Name': member.name,
          'Member Email': member.email,
          'Member Phone': member.phone
        });
      });
    });
  });
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet(allRegsData);
  const ws2 = XLSX.utils.json_to_sheet(eventWiseData);
  
  XLSX.utils.book_append_sheet(wb, ws1, "All Registrations");
  XLSX.utils.book_append_sheet(wb, ws2, "Event Details");
  
  // Download
  XLSX.writeFile(wb, `TECHXAURA_2K26_Registrations_${Date.now()}.xlsx`);
};
```

---

## 10. TECHNICAL IMPLEMENTATION DETAILS

### Tech Stack:

**Frontend:**
- React.js 18+
- React Router v6
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form (form handling)
- React Hot Toast (notifications)

**Backend/Database:**
- Firebase Authentication
- Firebase Firestore (NoSQL database)
- Firebase Storage (payment screenshots)
- Firebase Hosting (deployment)

**Additional Libraries:**
- xlsx (Excel export)
- qrcode.react (QR code generation)
- date-fns (date formatting)
- react-icons (icons)

### Firebase Configuration:

```javascript
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "techxaura2k26.firebaseapp.com",
  projectId: "techxaura2k26",
  storageBucket: "techxaura2k26.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Security Rules:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read all events
    match /events/{eventId} {
      allow read: if true;
      allow write: if false; // Only admin via backend
    }
    
    // Users can create registrations, read their own
    match /registrations/{regId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
                       resource.data.userId == request.auth.uid &&
                       request.resource.data.uploadCount <= 2;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /payments/{userId}/{fileName} {
      allow write: if request.auth != null && 
                      request.auth.uid == userId &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/(jpeg|png)');
      allow read: if request.auth != null;
    }
  }
}
```

---

## 11. RESPONSIVE DESIGN REQUIREMENTS

**Breakpoints:**
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

**Mobile Optimizations:**
- Hamburger menu for navigation
- Stacked cards for events
- Single column cart layout
- Touch-friendly buttons (min 44px height)
- Optimized images (lazy loading)

**Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratio WCAG AA compliant
- Focus indicators on all inputs

---

## 12. PERFORMANCE OPTIMIZATION

- Lazy load images
- Code splitting by routes
- Debounce search inputs
- Virtualize long lists (if >100 registrations)
- Compress payment images before upload
- Enable Firebase offline persistence
- Cache event data in localStorage

---

## 13. ERROR HANDLING

**Common Scenarios:**
- Network errors → Retry mechanism
- Authentication failures → Clear error messages
- Payment upload failures → Allow retry
- Conflict detection → Highlight conflicts clearly
- Form validation → Inline error messages
- Database errors → Graceful fallback

---

## 14. TESTING CHECKLIST

- [ ] Registration with valid/invalid emails
- [ ] Login with existing/non-existing accounts
- [ ] Google OAuth flow
- [ ] Rules dialog appears once per session
- [ ] Add multiple events to cart
- [ ] Conflict detection works correctly
- [ ] Team member validation
- [ ] Payment screenshot upload/delete/re-upload
- [ ] Excel export with all data
- [ ] Admin login and dashboard
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

---

## 15. DEPLOYMENT

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**Environment Variables:**
```
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_ADMIN_EMAIL=admin@techxaura2k26.com
REACT_APP_ADMIN_PASSWORD=TechXaura@Admin2026
REACT_APP_UPI_ID=techxaura2k26@upi
REACT_APP_UPI_QR_URL=https://...
```

---

## BUILD INSTRUCTIONS

1. Start with landing page and basic routing
2. Implement authentication (registration + login + OAuth)
3. Build event catalog with cart functionality
4. Implement team management with conflict detection
5. Create checkout and payment flow
6. Build admin dashboard
7. Implement Excel export
8. Add animations and polish
9. Test thoroughly
10. Deploy to Firebase Hosting

Create a production-ready, bug-free, visually stunning website that provides an excellent user experience!
