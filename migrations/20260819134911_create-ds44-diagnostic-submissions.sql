CREATE TABLE public.ds44_diagnostic_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  sector TEXT,
  workers_count INTEGER CHECK (workers_count IS NULL OR workers_count >= 0),
  contact TEXT,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  maturity TEXT NOT NULL CHECK (maturity IN ('Reactivo', 'Basico', 'Gestionado', 'Avanzado', 'Integrado')),
  answered_count INTEGER NOT NULL CHECK (answered_count >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  report JSONB NOT NULL,
  source TEXT NOT NULL DEFAULT 'stec-ds44-mvp',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ds44_diagnostic_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_insert_ds44_diagnostic_submissions"
  ON public.ds44_diagnostic_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    source = 'stec-ds44-mvp'
    AND score >= 0
    AND score <= 100
    AND answered_count <= total_questions
  );

REVOKE ALL ON public.ds44_diagnostic_submissions FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT (
  company_name,
  sector,
  workers_count,
  contact,
  score,
  maturity,
  answered_count,
  total_questions,
  report,
  source
) ON public.ds44_diagnostic_submissions TO anon, authenticated;

CREATE INDEX ds44_diagnostic_submissions_created_at_idx
  ON public.ds44_diagnostic_submissions (created_at DESC);

CREATE INDEX ds44_diagnostic_submissions_score_idx
  ON public.ds44_diagnostic_submissions (score);
