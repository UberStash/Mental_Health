DROP TABLE IF EXISTS users_patients
CASCADE;
DROP TABLE IF EXISTS appointments
CASCADE;
DROP TABLE IF EXISTS users_doctors
CASCADE;
DROP TABLE IF EXISTS prescriptions
CASCADE;


CREATE TABLE users_doctors
(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(255),
  specialization TEXT NOT NULL,
  license VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone TEXT NOT NULL,
  clinic_name VARCHAR(255) NOT NULL,
  clinic_address TEXT NOT NULL

);

CREATE TABLE users_patients
(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(255),
  diagnosis TEXT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  health_card VARCHAR(255) NOT NULL,
  phone TEXT NOT NULL,
  patient_address TEXT NOT NULL,
  user_doctor_id INTEGER REFERENCES users_doctors(id)
);


CREATE TABLE appointments
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_patient_id INTEGER REFERENCES users_patients(id),
  user_doctor_id INTEGER REFERENCES users_doctors(id),
  appt_start TEXT,
  appt_end TEXT,
  title TEXT

);

CREATE TABLE prescriptions
(
  id SERIAL PRIMARY KEY NOT NULL,
  date DATE NOT NULL,
  user_patient_id INTEGER REFERENCES users_patients(id),
  frequency INTEGER,
  initial_amount INTEGER NOT NULL,
  dosage INTEGER NOT NULL,
  taken INTEGER NOT NULL

);
