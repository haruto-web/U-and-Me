"use client";

import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/app/actions";

const initialState: AuthActionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="login-form">
      <label>
        <span>Email</span>
        <input
          autoComplete="username"
          name="email"
          required
          type="email"
          placeholder="Your account email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          autoComplete="current-password"
          name="password"
          required
          type="password"
          placeholder="Your password"
        />
      </label>
      {state.error && <p className="form-error" role="alert">{state.error}</p>}
      <button className="button button-primary login-submit" disabled={pending} type="submit">
        {pending ? "Opening your space..." : "Sign in"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="login-footnote">Private accounts only. Ask the administrator if you need access.</p>
    </form>
  );
}
