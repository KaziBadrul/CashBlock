# CashBlock
## [Check the website](https://cash-block.vercel.app)

**Manage your cash. Monthly.**

![CashBlock Logo](./public/CashBlockLogoName.png)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## About

CashBlock is a **budget management app** designed to help users track their income and expenses with brutalist aesthetics and a no-nonsense interface.  
It emphasizes clarity, speed, and efficiency, allowing you to see your cash flow at a glance while keeping your focus sharp.

---

## Features

- Add, view, and delete transactions
- Track monthly income and expenses
- Category-based transaction management with icons
- Brutalist UI for maximum clarity
- Offline-ready Progressive Web App (PWA) support
- User authentication with Clerk

![alt text](snapshots/snip1.PNG)
![alt text](snapshots/snip2.PNG)
![alt text](snapshots/snip3.PNG)
![alt text](snapshots/snip4.PNG)

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 18, TailwindCSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (via Prisma)
- **Authentication:** Clerk
- **PWA:** Manifest + Service Worker
- **Fonts:** Geist, Geist Mono

---

## Getting Started

1. Clone the repository:
git clone https://github.com/yourusername/cashblock.git
cd cashblock
2. Install dependencies:
npm install

3. Create a .env.local file with the required environment variables (Clerk API keys, Database URL, etc.):
env
DATABASE_URL=postgresql://user:password@localhost:5432/cashblock
CLERK_FRONTEND_API=your_frontend_api
CLERK_API_KEY=your_api_key

4. Run database migrations:
npx prisma migrate dev

5. Start the development server:
npm run dev

Your app should now be running at http://localhost:3000

---

## Usage
Sign in or sign up using Clerk.

Add transactions using the tools panel.

View monthly totals and expense lists.

Delete transactions by clicking the trash icon.

Your data updates dynamically and persists in the database.

---

## Contributing
We welcome contributions! Feel free to:

Report issues

Suggest features

Submit pull requests

Please follow the code style and make sure the app still retains its brutalist aesthetic.

## License
MIT License © 2025
Feel free to use and modify CashBlock freely.

---
