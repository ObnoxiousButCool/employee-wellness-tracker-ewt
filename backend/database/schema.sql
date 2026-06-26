CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('employee', 'manager', 'admin'))
);

CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS wellness_entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
  work_hours NUMERIC(4, 2) NOT NULL CHECK (work_hours BETWEEN 0 AND 24),
  sleep_hours NUMERIC(4, 2) NOT NULL CHECK (sleep_hours BETWEEN 0 AND 24),
  mood VARCHAR(80) NOT NULL,
  energy_level INTEGER NOT NULL CHECK (energy_level BETWEEN 1 AND 10),
  submission_date DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wellness_department_date
  ON wellness_entries (department_id, submission_date);

CREATE INDEX IF NOT EXISTS idx_wellness_user_date
  ON wellness_entries (user_id, submission_date);
