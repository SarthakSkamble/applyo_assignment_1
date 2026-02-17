Real-Time Poll Rooms

A full-stack real-time polling application where users can create polls, share a link, vote, and see live results without refreshing the page.

Tech Stack

Frontend
- React (Vite)
- Tailwind CSS
- Socket.IO Client

Backend
- Node.js
- Express.js
- Socket.IO
- Prisma ORM
- PostgreSQL


Features

- Create polls with multiple options
- Shareable poll link
- Single-choice voting
- Real-time vote updates using Socket.IO
- Persistent storage using PostgreSQL
- Anti-abuse voting protection
- Clean REST + Socket architecture


Fairness / Anti-Abuse Mechanisms

1) Browser Voter Token
- A unique voterToken is generated and stored in browser localStorage.
- This token identifies a voter without authentication.

2) Database-Level Protection
- The Vote table uses a unique constraint:
   - Ensures one vote per browser per poll.
   - Prevents duplicate voting even if frontend validation is bypassed.

Edge Cases Handled

- Poll creation validation:
  - Poll question cannot be empty.
  - Minimum 2 options required to create a poll.
  - Empty options are ignored/blocked.

- Invalid poll handling:
  - If a poll ID does not exist, the API returns a proper 404 response.

- Duplicate voting prevention:
  - Users cannot vote more than once in the same poll.
  - Database-level unique constraint prevents duplicate entries.




Known Limitations / Future Improvements

- LocalStorage-based voter identity:
  - Users can clear browser storage or use another browser/device to vote again.
  - Stronger protection would require authentication or advanced fingerprinting.

- No user authentication:
  - Voting is anonymous by design.
  - Adding user accounts would improve fairness.

- No poll expiration:
  - Polls remain active indefinitely.
  - Future improvement: poll expiration or manual close feature.
    
- Security is limited

