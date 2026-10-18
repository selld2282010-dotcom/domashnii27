-- =====================================================================
--  НАСТРОЙКА КОММЕНТАРИЕВ (делается один раз, бесплатно)
-- =====================================================================
--  1. Зайди на supabase.com, зарегистрируйся (можно через GitHub) и нажми New project.
--     Придумай название и пароль базы (пароль сохрани), регион выбери ближайший (Frankfurt).
--     Подожди 1-2 минуты, пока проект создастся.
--  2. В левом меню открой SQL Editor, нажми New query, вставь ВСЁ, что ниже
--     этой шапки (от слов create table), и нажми Run. Должно написать Success.
--  3. Открой Project Settings -> API (или кнопка Connect наверху).
--     Скопируй "Project URL" и ключ "anon public" (или publishable).
--     Вставь их в script.js, в блок «6. КОММЕНТАРИИ», в поля url и key.
--     Ключ anon безопасен для публичного сайта. А вот service_role / secret
--     ключ НИКОГДА нельзя вставлять в сайт.
--  4. Загрузи обновлённые файлы на GitHub (Commit changes).
--
--  МОДЕРАЦИЯ (твои «фильтры»):
--   * Новый комментарий сначала НЕ виден никому. Он появляется на сайте только после твоего одобрения.
--   * Открой в Supabase: Table Editor -> comments. Там все комментарии.
--       - Хочешь показать: поставь галочку approved (true) в этой строке.
--       - Хочешь убрать/удалить: удали строку (или сними галочку approved).
--       - Чтобы смотреть только новые: кнопка Filter -> approved -> is -> false.
--   * Плохие слова скрываются звёздочками автоматически (список badWords в script.js).
-- =====================================================================

create table public.comments (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 30),
  text text not null check (char_length(text) between 1 and 300),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

-- посетители могут читать ТОЛЬКО одобренные комментарии
create policy "read approved" on public.comments
  for select to anon using (approved = true);

-- посетители могут добавлять комментарии, но только неодобренные (самому себе одобрить нельзя)
create policy "add pending" on public.comments
  for insert to anon with check (approved = false);

grant usage on schema public to anon;
grant select, insert on public.comments to anon;
