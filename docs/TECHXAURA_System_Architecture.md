# TECHXAURA 2K26 - SYSTEM ARCHITECTURE & DESIGN

## TABLE OF CONTENTS
1. System Architecture Overview
2. Database Schema
3. User Flow Diagrams
4. Component Structure
5. API Endpoints
6. State Management
7. File Structure
8. Security Architecture

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Landing  │  │   Auth   │  │Dashboard │  │  Admin   │   │
│  │   Page   │  │   Pages  │  │   Page   │  │  Panel   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                     React.js + Tailwind CSS                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE SERVICES                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Authentication│  │  Firestore   │  │   Storage    │      │
│  │  (Auth)      │  │   (NoSQL)    │  │   (Images)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA EXPORT LAYER                       │
│                 Excel Files (XLSX) + Drive Links             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. DATABASE SCHEMA

### Firestore Collections Structure

#### **Collection: `users`**
```javascript
users/{userId} = {
  // User Identification
  uid: string,                    // Firebase Auth UID
  email: string,                  // Must end with @gmail.com
  name: string,                   // Full name
  phone: string,                  // 10-digit Indian phone number
  
  // College Information
  college: string,                // College name
  department: string,             // Department/Branch
  
  // Registration Metadata
  createdAt: Timestamp,          // Account creation
  lastLogin: Timestamp,          // Last login time
  rulesAccepted: boolean,        // Has accepted rules dialog
  rulesAcceptedAt: Timestamp,    // When rules were accepted
  
  // Registration Status
  hasRegistered: boolean,        // Has completed at least one registration
  registrationIds: string[],     // Array of registration document IDs
  
  // OAuth Information (if used)
  provider: string,              // 'google' or 'email'
  photoURL: string               // Profile picture (from Google)
}
```

**Indexes:**
- email (ascending)
- phone (ascending)
- college + department (composite)

---

#### **Collection: `events`**
```javascript
events/{eventId} = {
  // Event Identification
  id: string,                    // Unique event ID (e.g., "event-mindsparkx")
  name: string,                  // Event name
  slug: string,                  // URL-friendly name
  
  // Categorization
  category: string,              // "Technical" | "Non-Technical" | "Breakout"
  
  // Event Details
  description: string,           // Full description
  shortDescription: string,      // Brief tagline
  
  // Team Configuration
  teamSize: {
    min: number,                 // Minimum team members (usually 1)
    max: number                  // Maximum team members (1-5)
  },
  
  // Timing Information
  timing: string,                // Display time (e.g., "10:00 AM - 12:00 PM")
  timeSlot: string,              // Slot ID for conflict detection (e.g., "slot-1")
  date: string,                  // Event date
  duration: number,              // Duration in minutes
  
  // Venue
  venue: string,                 // Location/Hall details
  
  // Registration Tracking
  registeredTeams: number,       // Count of registered teams
  registeredParticipants: number,// Count of individual participants
  maxTeams: number,              // Maximum teams allowed (optional)
  
  // Additional Info
  rules: string[],               // Array of rules
  prizes: string,                // Prize details
  coordinator: {
    name: string,
    phone: string,
    email: string
  },
  
  // Status
  isActive: boolean,             // Can users register?
  isFull: boolean,               // Has reached max capacity?
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Indexes:**
- category (ascending)
- timeSlot (ascending)
- isActive (ascending)

---

#### **Collection: `registrations`**
```javascript
registrations/{registrationId} = {
  // Registration Identification
  id: string,                    // Auto-generated unique ID
  
  // User Reference
  userId: string,                // Reference to users/{userId}
  userName: string,              // Denormalized for quick access
  userEmail: string,             // Denormalized
  userPhone: string,             // Denormalized
  userCollege: string,           // Denormalized
  userDepartment: string,        // Denormalized
  
  // Events Registered
  events: [
    {
      eventId: string,           // Reference to events/{eventId}
      eventName: string,         // Denormalized
      category: string,          // Denormalized
      timeSlot: string,          // For conflict tracking
      timing: string,            // Display timing
      
      // Team Information
      teamMembers: [
        {
          name: string,          // Full name
          email: string,         // Email address
          phone: string,         // Phone number
          isLeader: boolean      // First member is leader
        }
      ],
      
      // Quick Access Arrays (for queries)
      teamMemberEmails: string[], // All member emails
      teamMemberPhones: string[], // All member phones
      teamSize: number            // Count of members
    }
  ],
  
  // Aggregated Data
  totalEvents: number,           // Count of events
  totalParticipants: number,     // Unique participants across all events
  
  // All unique participants (for conflict detection)
  allParticipantEmails: string[],// Unique emails across all events
  
  // Payment Information
  totalAmount: number,           // Always 100 (per team)
  paymentStatus: string,         // "pending" | "verified" | "rejected"
  paymentProof: string,          // Firebase Storage URL
  paymentUploadedAt: Timestamp,  // When screenshot was uploaded
  uploadCount: number,           // Number of uploads (max 2)
  paymentVerifiedBy: string,     // Admin email (if verified)
  paymentVerifiedAt: Timestamp,  // When verified
  paymentRejectionReason: string,// If rejected, why
  
  // Transaction ID (for tracking)
  transactionId: string,         // Generated unique transaction ID
  
  // Status Tracking
  registrationStatus: string,    // "draft" | "submitted" | "confirmed" | "cancelled"
  
  // Metadata
  createdAt: Timestamp,          // When cart was created
  submittedAt: Timestamp,        // When payment was submitted
  confirmedAt: Timestamp,        // When admin confirmed
  updatedAt: Timestamp,          // Last update
  
  // User Agent (for analytics)
  userAgent: string,             // Browser/device info
  ipAddress: string              // User's IP (if available)
}
```

**Indexes:**
- userId (ascending)
- paymentStatus (ascending)
- registrationStatus (ascending)
- createdAt (descending)
- Composite: userId + paymentStatus

---

#### **Collection: `timeSlots`**
```javascript
timeSlots/{slotId} = {
  id: string,                    // Slot ID (e.g., "slot-1", "slot-2")
  displayTime: string,           // Human-readable (e.g., "10:00 AM - 12:00 PM")
  startTime: Timestamp,          // Exact start time
  endTime: Timestamp,            // Exact end time
  date: string,                  // Event date
  
  // Events in this slot
  eventIds: string[],            // Array of event IDs in this time slot
  
  // Conflict tracking
  participantConflicts: {        // Map of email -> event IDs
    "john@gmail.com": ["event-1", "event-2"],
    "jane@gmail.com": ["event-3"]
  }
}
```

---

#### **Collection: `analytics`** (Optional - for detailed tracking)
```javascript
analytics/daily-{date} = {
  date: string,                  // YYYY-MM-DD
  
  // Registration Stats
  newRegistrations: number,
  totalRegistrations: number,
  
  // Payment Stats
  paymentsReceived: number,
  totalRevenue: number,
  
  // Event Stats
  eventRegistrations: {
    "event-mindsparkx": 25,
    "event-boxcricket": 15,
    // ...
  },
  
  // User Stats
  newUsers: number,
  totalUsers: number,
  
  // Hourly breakdown (optional)
  hourlyStats: [ /* ... */ ]
}
```

---

### Firebase Storage Structure

```
storage/
├── payments/
│   ├── {userId}/
│   │   ├── {registrationId}.jpg
│   │   ├── {registrationId}.png
│   │   └── ...
│   └── ...
├── qr-codes/
│   └── payment-qr.png
└── exports/
    └── excel/
        ├── registrations-{timestamp}.xlsx
        └── ...
```

---

## 3. USER FLOW DIAGRAMS

### Registration Flow
```
┌─────────────┐
│ Landing Page │
└──────┬──────┘
       │ Click "Register"
       ▼
┌─────────────────────┐
│ Registration Form    │
│ • Name              │
│ • Email (@gmail)    │
│ • Phone (10 digits) │
│ • Password          │
│ • College           │
│ • Department        │
└──────┬──────────────┘
       │ Submit
       ▼
┌─────────────────────┐      ┌──────────────┐
│ Email Validation    │──No──│ Show Error   │
└──────┬──────────────┘      └──────────────┘
       │ Yes
       ▼
┌─────────────────────┐
│ Create Firebase     │
│ Auth Account        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Save User Data to   │
│ Firestore           │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Redirect to Login   │
└─────────────────────┘
```

### Login to Dashboard Flow
```
┌─────────────┐
│ Login Form   │
└──────┬───────┘
       │ Submit
       ▼
┌─────────────────────┐      ┌──────────────────┐
│ User Exists?        │──No──│ Prompt to Register│
└──────┬──────────────┘      └──────────────────┘
       │ Yes
       ▼
┌─────────────────────┐      ┌──────────────────┐
│ Password Correct?   │──No──│ Show Error       │
└──────┬──────────────┘      └──────────────────┘
       │ Yes
       ▼
┌─────────────────────┐
│ Login Success       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────┐
│ Check: rulesAccepted?   │
└──────┬──────────────────┘
       │ No
       ▼
┌─────────────────────────┐
│ Show Rules Dialog       │
│ (Must Click "OK")       │
└──────┬──────────────────┘
       │ Click "OK"
       ▼
┌─────────────────────────┐
│ Set rulesAccepted=true  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Dashboard (Events)      │
└─────────────────────────┘
```

### Event Registration Flow
```
┌─────────────────┐
│ Browse Events   │
└────────┬────────┘
         │ Click "Add to Cart"
         ▼
┌──────────────────────────┐
│ Team Details Modal       │
│ • Enter member info      │
│ • Validate (no dupes)    │
└────────┬─────────────────┘
         │ Submit
         ▼
┌──────────────────────────┐      ┌────────────────┐
│ Check Time Conflicts     │──Yes─│ Show Conflict  │
└────────┬─────────────────┘      │ Error          │
         │ No Conflict            └────────────────┘
         ▼
┌──────────────────────────┐
│ Add to Cart              │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Cart Updated             │
│ (Show in UI)             │
└────────┬─────────────────┘
         │ User adds more events or...
         ▼
┌──────────────────────────┐
│ Click "Checkout"         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Review & Verify Page     │
│ • Show all events        │
│ • Show all teams         │
│ • Confirm details        │
└────────┬─────────────────┘
         │ Confirm
         ▼
┌──────────────────────────┐
│ Payment Page             │
│ • Show QR code           │
│ • Upload screenshot      │
└────────┬─────────────────┘
         │ Upload & Submit
         ▼
┌──────────────────────────┐
│ Save to Firestore        │
│ • Create registration    │
│ • Upload to Storage      │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Thank You Page           │
│ • Show confirmation      │
│ • Auto-redirect (3s)     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Redirect to Landing      │
└──────────────────────────┘
```

### Payment Screenshot Upload Flow
```
┌──────────────────┐
│ Select File      │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐      ┌────────────────┐
│ Validate File Type       │──No──│ Show Error     │
│ (JPEG/PNG only)          │      └────────────────┘
└────────┬─────────────────┘
         │ Yes
         ▼
┌──────────────────────────┐      ┌────────────────┐
│ Validate File Size       │──No──│ Show Error     │
│ (<5MB)                   │      └────────────────┘
└────────┬─────────────────┘
         │ Yes
         ▼
┌──────────────────────────┐
│ Upload to Firebase       │
│ Storage                  │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Get Download URL         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Save URL to Firestore    │
│ • paymentProof = URL     │
│ • uploadCount++          │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐      ┌────────────────┐
│ uploadCount === 1?       │──Yes─│ Enable Delete  │
└────────┬─────────────────┘      │ Button         │
         │ uploadCount === 2       └────────────────┘
         ▼
┌──────────────────────────┐
│ Disable Delete Button    │
│ (No more uploads)        │
└──────────────────────────┘
```

### Admin Analytics Flow
```
┌──────────────────┐
│ Click "Organizers"│
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│ Admin Login Modal        │
│ • Email                  │
│ • Password               │
└────────┬─────────────────┘
         │ Submit
         ▼
┌──────────────────────────┐      ┌────────────────┐
│ Check Credentials        │──No──│ Show Error     │
│ (Hardcoded)              │      └────────────────┘
└────────┬─────────────────┘
         │ Yes
         ▼
┌──────────────────────────┐
│ Redirect to Admin        │
│ Dashboard                │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Fetch Analytics Data     │
│ • Total registrations    │
│ • Event-wise stats       │
│ • Payment status         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Display Dashboard        │
│ • Overview cards         │
│ • Event tables           │
│ • User list              │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Actions Available:       │
│ • View details           │
│ • Export to Excel        │
│ • Approve/Reject payment │
└──────────────────────────┘
```

---

## 4. COMPONENT STRUCTURE

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Loader.jsx
│   │   ├── Toast.jsx
│   │   └── Card.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   │
│   ├── landing/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── EventsShowcase.jsx
│   │   ├── InfoCards.jsx
│   │   └── OrganizerButton.jsx
│   │
│   ├── auth/
│   │   ├── RegisterForm.jsx
│   │   ├── LoginForm.jsx
│   │   ├── GoogleAuthButton.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── dashboard/
│   │   ├── RulesDialog.jsx
│   │   ├── EventCard.jsx
│   │   ├── EventFilters.jsx
│   │   ├── EventSearch.jsx
│   │   └── Cart/
│   │       ├── CartIcon.jsx
│   │       ├── CartDrawer.jsx
│   │       ├── CartItem.jsx
│   │       └── TeamMembersForm.jsx
│   │
│   ├── checkout/
│   │   ├── ReviewPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── QRCode.jsx
│   │   ├── PaymentUpload.jsx
│   │   └── ThankYouPage.jsx
│   │
│   └── admin/
│       ├── AdminLogin.jsx
│       ├── Dashboard.jsx
│       ├── OverviewCards.jsx
│       ├── EventStatistics.jsx
│       ├── RegistrationTable.jsx
│       ├── RegistrationDetails.jsx
│       └── ExcelExport.jsx
│
├── pages/
│   ├── Landing.jsx
│   ├── Auth.jsx
│   ├── Dashboard.jsx
│   ├── Checkout.jsx
│   ├── ThankYou.jsx
│   └── admin/
│       └── AdminDashboard.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── EventsContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useEvents.js
│   ├── useRegistration.js
│   └── useConflictDetection.js
│
├── services/
│   ├── firebase.js
│   ├── authService.js
│   ├── eventService.js
│   ├── registrationService.js
│   ├── paymentService.js
│   ├── adminService.js
│   └── excelService.js
│
├── utils/
│   ├── validation.js
│   ├── conflictDetection.js
│   ├── formatters.js
│   └── constants.js
│
├── App.jsx
└── main.jsx
```

---

## 5. KEY ALGORITHMS

### Conflict Detection Algorithm

```javascript
/**
 * Checks if adding a new event to cart creates time slot conflicts
 * @param {Object} newEvent - Event being added with team members
 * @param {Array} currentCart - Existing cart items
 * @returns {Object} - { hasConflict: boolean, conflicts: Array }
 */
function detectConflicts(newEvent, currentCart) {
  const conflicts = [];
  
  // Get all events in the same time slot
  const sameTimeSlotEvents = currentCart.filter(
    item => item.timeSlot === newEvent.timeSlot
  );
  
  if (sameTimeSlotEvents.length === 0) {
    return { hasConflict: false, conflicts: [] };
  }
  
  // Extract new event member emails
  const newEventEmails = newEvent.teamMembers.map(m => m.email.toLowerCase());
  
  // Check each existing event in same time slot
  for (const existingEvent of sameTimeSlotEvents) {
    const existingEmails = existingEvent.teamMembers.map(
      m => m.email.toLowerCase()
    );
    
    // Find common members
    const commonEmails = newEventEmails.filter(
      email => existingEmails.includes(email)
    );
    
    if (commonEmails.length > 0) {
      conflicts.push({
        eventName: existingEvent.eventName,
        timeSlot: existingEvent.timeSlot,
        timing: existingEvent.timing,
        conflictingMembers: commonEmails
      });
    }
  }
  
  return {
    hasConflict: conflicts.length > 0,
    conflicts: conflicts
  };
}
```

### Excel Export Algorithm

```javascript
/**
 * Exports all registration data to Excel with multiple sheets
 */
async function exportToExcel() {
  // Fetch all registrations
  const registrations = await getAllRegistrations();
  
  // Sheet 1: All Registrations
  const registrationsSheet = registrations.map(reg => ({
    'Registration ID': reg.id,
    'User Name': reg.userName,
    'Email': reg.userEmail,
    'Phone': reg.userPhone,
    'College': reg.userCollege,
    'Department': reg.userDepartment,
    'Total Events': reg.totalEvents,
    'Total Participants': reg.totalParticipants,
    'Payment Status': reg.paymentStatus,
    'Payment Proof': reg.paymentProof || 'Not uploaded',
    'Amount': `₹${reg.totalAmount}`,
    'Registered At': formatDate(reg.createdAt),
    'Submitted At': formatDate(reg.submittedAt)
  }));
  
  // Sheet 2: Event-wise breakdown
  const eventWiseSheet = [];
  registrations.forEach(reg => {
    reg.events.forEach(event => {
      event.teamMembers.forEach(member => {
        eventWiseSheet.push({
          'Event Name': event.eventName,
          'Category': event.category,
          'Timing': event.timing,
          'Registration ID': reg.id,
          'Team Leader': reg.userName,
          'Leader Email': reg.userEmail,
          'Leader Phone': reg.userPhone,
          'Member Name': member.name,
          'Member Email': member.email,
          'Member Phone': member.phone,
          'Payment Status': reg.paymentStatus
        });
      });
    });
  });
  
  // Sheet 3: Event statistics
  const eventStats = calculateEventStatistics(registrations);
  const statsSheet = eventStats.map(stat => ({
    'Event Name': stat.eventName,
    'Category': stat.category,
    'Total Teams': stat.totalTeams,
    'Total Participants': stat.totalParticipants,
    'Average Team Size': stat.avgTeamSize.toFixed(2)
  }));
  
  // Sheet 4: Summary
  const summarySheet = [
    { Metric: 'Total Registrations', Value: registrations.length },
    { Metric: 'Total Revenue', Value: `₹${registrations.filter(r => r.paymentStatus === 'verified').length * 100}` },
    { Metric: 'Verified Payments', Value: registrations.filter(r => r.paymentStatus === 'verified').length },
    { Metric: 'Pending Payments', Value: registrations.filter(r => r.paymentStatus === 'pending').length },
    { Metric: 'Rejected Payments', Value: registrations.filter(r => r.paymentStatus === 'rejected').length }
  ];
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  const ws1 = XLSX.utils.json_to_sheet(registrationsSheet);
  const ws2 = XLSX.utils.json_to_sheet(eventWiseSheet);
  const ws3 = XLSX.utils.json_to_sheet(statsSheet);
  const ws4 = XLSX.utils.json_to_sheet(summarySheet);
  
  XLSX.utils.book_append_sheet(wb, ws1, "All Registrations");
  XLSX.utils.book_append_sheet(wb, ws2, "Event Details");
  XLSX.utils.book_append_sheet(wb, ws3, "Event Statistics");
  XLSX.utils.book_append_sheet(wb, ws4, "Summary");
  
  // Download
  const fileName = `TECHXAURA_2K26_Data_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
```

---

## 6. SECURITY CONSIDERATIONS

### Input Validation

```javascript
// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
};

// Phone validation (Indian)
const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Sanitize user input
const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};
```

### Rate Limiting

```javascript
// Limit registration attempts
const rateLimitRegistration = (userId) => {
  const key = `reg_attempt_${userId}`;
  const attempts = parseInt(localStorage.getItem(key) || '0');
  
  if (attempts >= 5) {
    throw new Error('Too many registration attempts. Please try again later.');
  }
  
  localStorage.setItem(key, (attempts + 1).toString());
  setTimeout(() => localStorage.removeItem(key), 3600000); // 1 hour
};
```

### XSS Prevention

```javascript
// All user inputs are sanitized before display
// Use React's built-in XSS protection (JSX escaping)
// Never use dangerouslySetInnerHTML with user content
```

---

## 7. TESTING STRATEGY

### Unit Tests
- Validation functions
- Conflict detection algorithm
- Data formatting utilities

### Integration Tests
- Authentication flow
- Registration flow
- Payment upload flow
- Admin operations

### E2E Tests (Cypress)
- Complete user journey
- Admin workflow
- Edge cases and error handling

---

## 8. DEPLOYMENT CHECKLIST

- [ ] Set up Firebase project
- [ ] Configure authentication providers
- [ ] Set Firestore security rules
- [ ] Set Storage security rules
- [ ] Add environment variables
- [ ] Test on multiple devices
- [ ] Optimize images
- [ ] Enable caching
- [ ] Set up analytics
- [ ] Deploy to Firebase Hosting
- [ ] Test production build
- [ ] Set up custom domain (optional)

---

This architecture ensures scalability, security, and excellent user experience for TECHXAURA 2K26!
