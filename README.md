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
*   **`@livfit/lib/proxy`**: Shared authentication logic and RBAC guards.

---

## 🔐 Unified Authentication Architecture

The platform uses a standardized, modular authentication system shared across all entry points.

### 1. The "Proxy" Convention
Following Next.js 16+ best practices, we have migrated from legacy `middleware.ts` to the **Proxy** pattern. 
*   **Logic Location**: `@livfit/lib/src/proxy/auth_logic.ts`
*   **Usage**: Each app defines a `proxy.ts` file that imports the shared `validateClinicalSession` logic.

### 2. Role-Based Access Control (RBAC)
User access is strictly enforced using these categories:
*   **Clinical Roles**: `HEPATOLOGIST`, `TRANSPLANT_COORDINATOR`, `DIETICIAN`, `DOCTOR`. (Access to `/dietician`)
*   **Staff Roles**: `ADMIN`, `SUPERADMIN`, `HEALTH_EDUCATOR`. (Access to `/admin`, `/content`)
*   **External Roles**: `RESEARCHER`, `INSURANCE`. (Access to `/external`)

### 3. Shared UI Module
The **`LoginForm`** is a unified component located in `@livfit/ui`. 
*   It handles both **Patient** and **Staff** login variants.
*   It is used by both `@livfit/web` and `@livfit/staff`, ensuring that security patches applied to the UI library instantly protect all portals.

---

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

#### Running Individual Applications
If you only want to run a specific application (to save system resources or focus on one portal), use the `--filter` flag:

*   **Patient Web**: `pnpm dev --filter @livfit/web` (Port 7000)
*   **Staff Hub**: `pnpm dev --filter @livfit/staff` (Port 7001)
*   **Mobile App**: `pnpm dev --filter @livfit/mobile` (Port 8081)
    *   *Scan the QR code with **Expo Go** (Android/iOS).*
    *   *Press **`w`** to run in the browser.*
    *   *Press **`a`** for Android Emulator or **`i`** for iOS Simulator.*
*   **AI Service**: `pnpm dev --filter @livfit/ai`

#### 📱 Working with Emulators
To test the mobile app on your development machine:

*   **Android Emulator**:
    1.  Open **Android Studio** > **Device Manager**.
    2.  Start your Virtual Device (AVD).
    3.  Once booted, press **`a`** in the Expo terminal to sync.
*   **iOS Simulator** (macOS only):
    1.  Ensure **Xcode** is installed.
    2.  Press **`i`** in the Expo terminal to boot the simulator.
*   **Web Preview**:
    1.  Press **`w`** in the Expo terminal to open the mobile app in your browser.

You can also run commands for specific apps from the root:
```bash
# Build only the web app
pnpm build --filter @livfit/web

# Install a dependency to a specific app
pnpm add <package-name> --filter @livfit/staff
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
You should create **two separate projects** in Vercel:

1.  **Patient Website**: Set Root Directory to `apps/client/web`.
2.  **Staff Hub**: Set Root Directory to `apps/staff/hub`.

*   **Crucial:** Ensure the option **"Include source files outside of the Root Directory"** is enabled so the apps can access the shared `packages/` folder.
*   **Environment Variables**: Add all keys found in `.env.example`.

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
**DO NOT** create custom CSS or unbranded buttons. You must use the unified Design System to ensure brand consistency across all tools.

#### How to use @livfit/ui:
Import components directly from the workspace package:

```tsx
import { Button, Card, Input, Label, Sidebar } from "@livfit/ui";

export default function MyVendorModule() {
  return (
    <Card className="p-6">
      <Label>Project Name</Label>
      <Input placeholder="Enter details..." />
      <Button variant="primary">Submit Data</Button>
    </Card>
  );
}
```

#### Available UI Components:
*   **Layout**: `Sidebar` (generic navigation), `Card` (content containers).
*   **Forms**: `Input`, `Label`, `Checkbox`, `Switch`, `Textarea`.
*   **Actions**: `Button` (with primary, ghost, and destructive variants).
*   **Media**: `YoutubePlayer` (supports 16:9 and 9:16 vertical modes).
*   **Feedback**: `Badge` (status chips).

### 3. Shared Logic & Utilities
*   **`@livfit/lib`**: Use this for all database queries (Supabase) and shared business logic.
*   **`cn()` Utility**: For tailwind class merging, import from `@livfit/ui`:
    ```tsx
    import { cn } from "@livfit/ui";
    // Usage: <div className={cn("base-class", condition && "active-class")} />
    ```

### 4. Environment Setup
1.  Copy `apps/staff/hub/.env.example` to `.env`.
2.  Add your specific API keys to the `.env` file.
3.  **DO NOT** commit your `.env` file to Git.

### 5. Code Standards
*   **TypeScript**: All new code must be 100% Type-safe.
*   **Tailwind v4**: Follow the theme tokens defined in `globals.css`. Do not use arbitrary values unless absolutely necessary.
*   **Linting**: Run `pnpm lint` before submitting a Pull Request.
*   **PR Review**: All external code must be reviewed by the LivFit Core Team.
