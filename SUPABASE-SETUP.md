# Supabase setup for the private two-person site

The Next.js site runs on your computer at `127.0.0.1`. Supabase Auth and Postgres are hosted online, so the site needs an internet connection and account/content data is stored in your Supabase project. Do not deploy the site publicly as part of this setup.

## 1. Create a Supabase project

Create a project in Supabase, then copy its **Project URL** and **Publishable key** from its Connect/API settings. In the project folder, copy `.env.example` to `.env.local` and replace the example values:

```powershell
Copy-Item .env.example .env.local
```

`.env.local` is ignored by Git. Never put a Supabase secret/service-role key in `NEXT_PUBLIC_*` variables or browser code.

## 2. Create the tables and access policies

Open the Supabase SQL Editor and run [`supabase/migrations/202611170001_initial_private_space.sql`](./supabase/migrations/202611170001_initial_private_space.sql). This creates the profiles, shared content, private-letter policies, and server-checked admin role.

## 3. Create only the two user accounts

In Supabase Authentication settings, turn off public sign-ups. Create your account and Eunice's from the Supabase Dashboard's user-management screen. The migration automatically creates a disabled profile for each new Auth user.

Use your two actual account emails in the following SQL, then run it in the SQL Editor. This enables only those existing accounts and grants the admin role only to your account:

```sql
update public.profiles
set is_member = true,
    is_admin = lower(email) = lower('your-email@example.com')
where lower(email) in (
  lower('your-email@example.com'),
  lower('eunice-email@example.com')
);

select email, is_member, is_admin
from public.profiles
where is_member
order by email;
```

Confirm the query returns exactly two active rows, and that only your row has `is_admin = true`. If an email does not match an existing Auth user, create that user first. Never change roles from browser code; only use the trusted Supabase SQL Editor.

Letters are addressed to the other active member. The database only lets a member read letters they wrote or that are addressed to their account. Admins can manage all content.

## 4. Start the website

Restart the development server after editing `.env.local`:

```powershell
npm run dev
```

Open `http://127.0.0.1:3000/login` and sign in with either account. An unauthenticated visitor is redirected to login; non-members cannot access the private pages. A non-admin member is redirected away from `/admin`.

## Admin content

The admin corner supports creating, editing, and deleting memories, letters, garden messages, compliments, surprises, and special-page text. Memories and letters also appear in their member pages. Letters are only visible to the sender, intended recipient, and administrator.

Photo uploads, account creation inside the website, password reset, and the photobooth are not implemented yet. Add accounts through Supabase Dashboard; do not enable public registration.

## Local-only boundary

The app's `dev` and `start` scripts bind to `127.0.0.1`. This makes it accessible only from the same computer, not Eunice's device. The backend remains a remote Supabase service. Keep `.env.local` private and do not share the Supabase project with anyone who should not administer the data.
