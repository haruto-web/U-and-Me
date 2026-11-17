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
| `/memories/new` | Add a memory form, including a photo picker placeholder. |
| `/letters` | Letters for the two of you. |
| `/letters/new` | Write a letter form. |
| `/garden` | Interactive flower-garden layout placeholder. |
| `/surprises` | Compliments, gifts, and mini-games placeholder. |
| `/special` | Personal page for your story and message. |
| `/photobooth` | Later WebRTC feature placeholder. |
| `/admin` | Admin content-management area placeholder. |

The routes and forms are currently for structure and visual review only. Content is not saved. The admin page is not authenticated or protected yet; do not treat it as private or put sensitive content in it.

## User and administrator flow

```text
Open the site on your computer
  → Sign in (planned)
    → Shared home for you and Eunice
      ├── View and add memories
      ├── Upload photos
      ├── Write and open letters
      ├── Visit the garden and surprises
      ├── Read the special page
      └── Photobooth (later)

Your account
  → Admin corner (planned)
    → Manage memories, photos, letters, and site messages

Eunice's account
  → Add her own memories and photos
  → Write letters for you
  → View and interact with shared content
```

In the connected version, both accounts can contribute memories, photos, and letters. You can manage all content through the admin area; Eunice can manage her own contributions. Access must be enforced by authentication, database policies, and private storage—not just by hiding the admin link.

## Data and privacy plan

When Supabase is connected, the initial data model should stay small:

- **Profiles:** the two authenticated users and their roles; only your account is an administrator.
- **Memories:** title, description, date, author, and photo references.
- **Letters:** author, recipient, envelope prompt, message, and optional reveal timing.
- **Private photos:** storage path, uploader, and memory association.
- **Garden messages and surprises:** content managed by you.
- **Photobooth rooms and saved photos:** defer until the photobooth is implemented.

Use Row Level Security and private storage policies. Verify that only you and Eunice can access the shared content, that Eunice cannot grant herself admin access, and that your admin role can manage all content. Never expose a Supabase service-role key in browser code.

## Build phases

1. **Website shell (current):** create the routes, navigation, responsive styling, and clearly labeled placeholder forms.
2. **Authentication:** connect Supabase Auth for your account and Eunice's; assign the admin role securely.
3. **Memories and photos:** implement create, view, edit, and delete flows for both users; store images privately with upload limits and validation.
4. **Letters and admin:** let both users write for each other and give your admin account content-management controls.
5. **Garden and surprises:** add editable messages and simple interactions.
6. **Photobooth:** add camera permissions, room setup, WebRTC signaling, synchronized capture, and private photo saving. A TURN relay may be needed on some networks and may cost money.

Keep the running application local through these phases. Connecting Supabase still requires internet access. Review backups and Supabase free-tier limits before keeping important photos or letters there.
