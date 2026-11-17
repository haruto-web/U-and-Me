create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  is_member boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  constraint admin_must_be_member check (not is_admin or is_member)
);

alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;

create or replace function public.is_active_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_member
  );
$$;

create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_member
      and is_admin
  );
$$;

revoke all on function public.is_active_member() from public, anon;
revoke all on function public.is_current_user_admin() from public, anon;
grant execute on function public.is_active_member() to authenticated;
grant execute on function public.is_current_user_admin() to authenticated;

create policy "Users can read member profiles"
  on public.profiles
  for select
  to authenticated
  using (
    (select auth.uid()) = id
    or (
      (select public.is_active_member())
      and is_member
    )
  );

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, lower(new.email))
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (
    kind in (
      'memory',
      'letter',
      'garden_message',
      'compliment',
      'surprise',
      'special'
    )
  ),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 10000),
  recipient_id uuid references public.profiles (id) on delete set null,
  prompt text,
  event_date date,
  created_by uuid not null references auth.users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index site_content_kind_created_at_idx
  on public.site_content (kind, created_at desc);

create index site_content_created_by_idx
  on public.site_content (created_by);

alter table public.site_content enable row level security;

grant select, insert, update, delete on public.site_content to authenticated;

create policy "Active members can view shared content"
  on public.site_content
  for select
  to authenticated
  using (
    (select public.is_active_member())
    and (
      kind <> 'letter'
      or created_by = (select auth.uid())
      or recipient_id = (select auth.uid())
      or (select public.is_current_user_admin())
    )
  );

create policy "Members can create their own memories and letters"
  on public.site_content
  for insert
  to authenticated
  with check (
    (select public.is_active_member())
    and created_by = (select auth.uid())
    and kind in ('memory', 'letter')
    and (
      kind <> 'letter'
      or (
        recipient_id is not null
        and recipient_id <> (select auth.uid())
        and recipient_id in (
          select id from public.profiles where is_member
        )
      )
    )
  );

create policy "Members can update their own memories and letters"
  on public.site_content
  for update
  to authenticated
  using (
    (select public.is_active_member())
    and created_by = (select auth.uid())
    and kind in ('memory', 'letter')
    and (
      kind <> 'letter'
      or (
        recipient_id is not null
        and recipient_id <> (select auth.uid())
        and recipient_id in (
          select id from public.profiles where is_member
        )
      )
    )
  )
  with check (
    (select public.is_active_member())
    and created_by = (select auth.uid())
    and kind in ('memory', 'letter')
    and (
      kind <> 'letter'
      or (
        recipient_id is not null
        and recipient_id <> (select auth.uid())
        and recipient_id in (
          select id from public.profiles where is_member
        )
      )
    )
  );

create policy "Members can delete their own memories and letters"
  on public.site_content
  for delete
  to authenticated
  using (
    (select public.is_active_member())
    and created_by = (select auth.uid())
    and kind in ('memory', 'letter')
  );

create policy "Admins can manage all shared content"
  on public.site_content
  for all
  to authenticated
  using ((select public.is_current_user_admin()))
  with check (
    (select public.is_current_user_admin())
    and created_by is not null
  );

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_site_content_updated_at();

revoke all on function public.set_site_content_updated_at() from public, anon, authenticated;
