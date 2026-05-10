# LivFit Monorepo

Welcome to the LivFit platform. This is a high-performance monorepo powered by **Turborepo** and **pnpm**, designed for scalability and consistent multi-platform development.

## 🏗 Architecture Overview

The project is organized into two primary categories to separate customer experiences from internal business tools.

### Applications (`/apps`)

#### 📱 Client Apps (Customer-facing)
*   **`@livfit/web`** (Port 7000): The main patient/user web application.
*   **`@livfit/mobile`** (Port 8081): The cross-platform mobile app (Expo/React Native).

#### 🏥 Staff Apps (Internal/Professional)
*   **`@livfit/staff`** (Port 7001): Unified Command Center for all internal operations.
    *   **Admin Access**: `http://localhost:7001/admin`
    *   **Dietician Access**: `http://localhost:7001/dietician`
    *   **Content Management**: `http://localhost:7001/content`
    *   **Partner/Vendor Portal**: `http://localhost:7001/external`

> [!NOTE]
> All staff portals are consolidated into a single application to reduce hosting costs. Access is managed via Role-Based Access Control (RBAC).

### 📝 Content Management System (CMS)
The platform includes a custom-built, lightweight CMS for staff to distribute education:
*   **Rich Text Editor**: Powered by React-Quill, optimized for clean healthcare content.
*   **YouTube Integration**: Support for standard 16:9 videos and 9:16 vertical **YouTube Shorts**.
*   **Unified Tagging**: Centralized tagging system (`posts` table) for cross-platform discovery.

### Shared Packages (`/packages`)
*   **`@livfit/ui`**: The central Design System. Shared React components (Buttons, Cards, etc.) using Tailwind CSS.
*   **`@livfit/lib`**: Core business logic, database schemas (Supabase), and shared TypeScript types.
*   **`@livfit/ai`**: (New) Centralized AI services, prompt templates, and provider integrations.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS)
*   pnpm (`npm install -g pnpm`)

### Installation
```bash
pnpm install
```

### Development
Start all applications simultaneously:
```bash
pnpm dev
```

### 🧹 Maintenance Commands
We have customized scripts to handle the common "zombie process" issues in Windows development:

*   **`pnpm kill`**: Force-stops all background Node processes (use if a port is stuck).
*   **`pnpm clean`**: Kills processes AND wipes all build/cache folders (`.next`, `.turbo`, `dist`).
*   **`pnpm lint`**: Runs linting across the entire monorepo.

---

## 📱 Mobile Deployment (App Store & Play Store)

The mobile application uses **Expo EAS** for production builds.

### 1. Setup EAS
Ensure you have the EAS CLI installed globally:
```bash
npm install -g eas-cli
```
Login to your Expo account:
```bash
eas login
```

### 2. Create Production Builds
Run these commands from the root (Turbo will handle the context) or from `apps/client/mobile`:

*   **Android (Play Store)**:
    ```bash
    pnpm --filter @livfit/mobile exec eas build --platform android
    ```
*   **iOS (App Store)**:
    ```bash
    pnpm --filter @livfit/mobile exec eas build --platform ios
    ```

### 3. Submit to Stores
Once the build is finished on the Expo dashboard:
```bash
pnpm --filter @livfit/mobile exec eas submit --platform all
```

---

## 🛠 Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Mobile**: Expo / React Native
*   **Monorepo Tooling**: Turbo + pnpm
*   **Styling**: Tailwind CSS v4
*   **Database/Auth**: Supabase
*   **Icons**: Lucide React / Lucide React Native

---

## 💰 Service Limits (Free Tier Status)

As of today, this project is optimized to run entirely on **Free Tiers**. Below are the limits for each service:

| Service | Free Limit | Purpose |
| :--- | :--- | :--- |
| **Supabase** | 500MB DB / 50k Users | Database, Authentication, and Storage |
| **Expo EAS** | 30 Build Credits / Mo | Mobile App Store Builds |
| **Vercel** | 100GB Bandwidth / Mo | Web Hosting (Web & Staff Hub) |
| **GitHub** | 2,000 Actions Mins / Mo | Automated Testing and CI/CD |

---

## 🔑 Production Environment Configuration

When moving from local development to production, you must configure your environment variables in your hosting provider's dashboard.

### 📐 Vercel Setup
1.  Go to your Project Dashboard on Vercel.
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add all keys found in `.env.example` (e.g., `NEXT_PUBLIC_SUPABASE_URL`).
4.  Re-deploy the application for changes to take effect.

### 🏠 Hostinger Setup (Managed Node.js)
1.  Go to your **Hostinger Panel** > **Node.js Dashboard**.
2.  Select your application and go to the **Environment Variables** section.
3.  Input your keys and values there.
4.  Restart the application to apply the changes.

---

## 🤝 External Collaboration (Vendor Guide)

If you are an external team or vendor contributing to the LivFit platform, please follow these standards to ensure compatibility and security:

### 1. Where to Build
All external tools should be developed within:
`apps/staff/hub/app/external/your-module-name/`

### 2. Use the Design System
**DO NOT** create custom CSS or unbranded buttons. You must import components from:
*   **`@livfit/ui`**: Use this for all Buttons, Cards, Inputs, and Players.
*   **Tailwind CSS v4**: Follow the theme tokens defined in `globals.css`.

### 3. Shared Logic
Use **`@livfit/lib`** for all database queries (Supabase) and shared business logic. If you need a new database table, coordinate with the Lead Admin.

### 4. Environment Setup
1.  Copy `apps/staff/hub/.env.example` to `.env`.
2.  Add your specific API keys to the `.env` file.
3.  **DO NOT** commit your `.env` file to Git.

### 5. Code Standards
*   **TypeScript**: All new code must be 100% Type-safe.
*   **Linting**: Run `pnpm lint` before submitting a Pull Request.
*   **PR Review**: All external code must be reviewed by the LivFit Core Team.
