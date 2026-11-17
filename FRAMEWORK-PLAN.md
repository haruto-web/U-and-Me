# Framework, Tech Stack, and Website Flow

## Project focus

Build a private, personal website for **you and Eunice**. There are two user accounts: yours and Eunice's. Your account also has the administrator role so you can manage all content; Eunice can use the site, upload her own photos, add memories, and write letters for you.

The application is intended to run on your computer only. It will not be deployed publicly. When bound to `127.0.0.1`, it is available only in a browser on that same computer; Eunice cannot access it from her own device. The current build is a visual page shell, not a connected product: login, uploads, saving, and the photobooth are not active yet.

## Recommended stack

| Area | Technology | Use |
|---|---|---|
| Web framework | **Next.js App Router** | Local website, routes, and shared layouts. |
| UI | **React** | Interactive pages and reusable components. |
| Language | **TypeScript** | Type checking for application code. |
| Styling | **CSS** | Responsive design, colors, and animation. |
| Backend, when added | **Supabase** | Hosted authentication, PostgreSQL, private photo storage, and realtime signaling. |
| Photobooth, later | **WebRTC** | Live camera communication between the two browsers. |

Supabase is an online service, not a local database. When connected, the website UI can still run on your computer, but authentication and shared content will require the internet and will be stored in your Supabase project. Do not deploy the site to Vercel or another public host for this local-only phase.

## Run locally

- `npm run dev` starts the development version on `http://127.0.0.1:3000`.
- `npm run build` creates a production build on your computer.
- `npm start` serves that production build on `http://127.0.0.1:3000`.

The host is intentionally restricted to loopback (`127.0.0.1`), not the local network or public internet.

## Current website structure

The shared navigation and responsive layout are in `src/components/app-shell.tsx`. Routes are in the Next.js App Router:

| Route | Purpose |
|---|---|
| `/` | Welcome dashboard for you and Eunice. |
| `/memories` | Shared scrapbook and photo memories. |
| `/memories/new` | Add a shared memory. Photo uploads are not connected yet. |
| `/letters` | Letters for the two of you. |
| `/letters/new` | Write a letter form. |
| `/garden` | Garden messages managed through the admin page. |
| `/surprises` | Compliments and surprises managed through the admin page. |
| `/special` | Special-page text managed through the admin page. |
| `/photobooth` | Later WebRTC feature placeholder. |
| `/admin` | Protected admin content manager. |

The protected routes, email/password sign-in, member memory/letter forms, and admin content manager are implemented against Supabase. Photo uploads are not connected yet.

## User and administrator flow

```text
Open the site on your computer
  → Sign in with an account created by the administrator
    → Shared home for you and Eunice
      ├── View and add memories
      ├── Upload photos
      ├── Write and open letters
      ├── Visit the garden and surprises
      ├── Read the special page
      └── Photobooth (later)

Your account
  → Protected admin corner
    → Manage memories, letters, garden messages, compliments, surprises, and special-page text

Eunice's account
  → Add memories
  → Write letters for you
  → View and interact with shared content
```

Both accounts can create memories and letters. You can manage all shared content through the protected admin area; member editing and deletion are not implemented yet. The database enforces membership, administrator rights, and letter recipients with Row Level Security—not just by hiding the admin link.

## Data and privacy plan

When Supabase is connected, the initial data model should stay small:

- **Profiles:** the two authenticated users and their roles; only your account is an administrator.
- **Memories:** title, description, date, and author.
- **Letters:** author, recipient account, envelope prompt, and message. Row Level Security limits reads to the author, recipient, and administrator.
- **Private photos:** planned; storage path, uploader, and memory association.
- **Garden messages and surprises:** content managed by you.
- **Photobooth rooms and saved photos:** defer until the photobooth is implemented.

Use Row Level Security and private storage policies. Verify that only you and Eunice can access the shared content, that Eunice cannot grant herself admin access, and that your admin role can manage all content. Never expose a Supabase service-role key in browser code.

## Build phases

1. **Authentication and roles (current):** sign in through Supabase; only pre-created, enabled accounts can access the private site. Your role is assigned in trusted SQL, not from client input.
2. **Admin content manager (current):** manage memories, letters, garden messages, compliments, surprises, and special-page text.
3. **Member content (current):** both accounts can create memories and letters; letters are only readable by the author, recipient, and administrator.
4. **Photos:** add private storage uploads with validation and deletion handling.
5. **Garden and surprises:** add editable message interactions.
6. **Photobooth:** add camera permissions, room setup, WebRTC signaling, synchronized capture, and private photo saving. A TURN relay may be needed on some networks and may cost money.

Keep the running application local through these phases. Supabase still requires internet access and stores the app's account/content data remotely. Follow [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) before signing in. Eunice cannot reach a `127.0.0.1` site from another device.
