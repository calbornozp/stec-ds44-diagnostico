CREATE TABLE public.ds44_advisory_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(trim(name)) > 0),
  company TEXT NOT NULL CHECK (char_length(trim(company)) > 0),
  email TEXT NOT NULL CHECK (char_length(trim(email)) > 0),
  phone TEXT,
  question TEXT,
  source TEXT NOT NULL DEFAULT 'stec-ds44-mvp',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ds44_advisory_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_insert_ds44_advisory_requests"
  ON public.ds44_advisory_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    source = 'stec-ds44-mvp'
    AND char_length(trim(name)) > 0
    AND char_length(trim(company)) > 0
    AND char_length(trim(email)) > 0
  );

REVOKE ALL ON public.ds44_advisory_requests FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT (
  name,
  company,
  email,
  phone,
  question,
  source
) ON public.ds44_advisory_requests TO anon, authenticated;

CREATE INDEX ds44_advisory_requests_created_at_idx
  ON public.ds44_advisory_requests (created_at DESC);
