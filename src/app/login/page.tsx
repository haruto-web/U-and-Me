import { LoginForm } from "@/components/login-form";
import { getSupabaseConfig } from "@/lib/supabase/config";

const errorMessages: Record<string, string> = {
  configuration: "Connect a Supabase project first. Follow the local setup guide.",
  not_authorized: "This account is not enabled for your shared space.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isConfigured = Boolean(getSupabaseConfig());

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-mark" aria-hidden="true">u&amp;e</span>
          <span className="brand-copy">
            <strong>A little world</strong>
            <small>made by us, for us</small>
          </span>
        </div>
        <span className="eyebrow">A PRIVATE SPACE FOR TWO</span>
        <h1>Welcome back.</h1>
        <p className="login-description">Sign in to find your memories, letters, and little reminders.</p>
        {error && errorMessages[error] && (
          <p className="form-error setup-message" role="alert">{errorMessages[error]}</p>
        )}
        {isConfigured ? (
          <LoginForm />
        ) : (
          <div className="setup-callout">
            <strong>One-time setup needed</strong>
            <p>Add your Supabase project URL and publishable key to <code>.env.local</code>, then follow the setup guide.</p>
          </div>
        )}
      </section>
      <p className="login-bottom">Small moments, kept close. <span aria-hidden="true">♡</span></p>
    </main>
  );
}
