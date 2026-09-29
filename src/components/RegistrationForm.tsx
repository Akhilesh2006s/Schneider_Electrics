import { useState, type FormEvent } from "react";
import { dialCodes, locations } from "../data/countries";
import { FormField } from "./FormField";

type FormValues = {
  firstName: string;
  lastName: string;
  company: string;
  countryCode: string;
  phone: string;
  email: string;
  location: string;
  jobTitle: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  company: "",
  countryCode: "+91",
  phone: "",
  email: "",
  location: "India",
  jobTitle: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const registrationInbox = "svelservices@gmail.com";

function IndiaFlag() {
  return (
    <svg className="india-flag" viewBox="0 0 22 16" aria-hidden="true">
      <rect width="22" height="16" rx="1.5" fill="#fff" />
      <rect width="22" height="5.34" fill="#FF9933" />
      <rect y="10.66" width="22" height="5.34" fill="#138808" />
      <circle cx="11" cy="8" r="2.15" fill="none" stroke="#000080" strokeWidth="0.6" />
      <circle cx="11" cy="8" r="0.45" fill="#000080" />
    </svg>
  );
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!values.company.trim()) errors.company = "Company name is required.";
  const digits = values.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Phone number is required.";
  else if (digits.length < 8 || digits.length > 15) errors.phone = "Enter a valid phone number.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.location) errors.location = "Location is required.";
  if (!values.jobTitle.trim()) errors.jobTitle = "Job title is required.";
  return errors;
}

function describedBy(id: string, error?: string) {
  return error ? `${id}-error` : undefined;
}

async function sendRegistration(values: FormValues) {
  const response = await fetch(`https://formsubmit.co/ajax/${registrationInbox}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `Innovation Connect 2026 registration — ${values.firstName.trim()} ${values.lastName.trim()}`,
      _template: "table",
      _captcha: "false",
      _replyto: values.email.trim(),
      "First Name": values.firstName.trim(),
      "Last Name": values.lastName.trim(),
      "Company Name": values.company.trim(),
      Phone: `${values.countryCode} ${values.phone.trim()}`,
      Email: values.email.trim(),
      Location: values.location,
      "Job Title": values.jobTitle.trim(),
    }),
  });

  const payload = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  const accepted = response.ok && (payload?.success === true || payload?.success === "true");
  if (!accepted) {
    throw new Error(payload?.message || "The registration could not be sent.");
  }
}

export function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSendError("");
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      const field = document.getElementById(firstInvalid === "countryCode" ? "phone" : firstInvalid);
      field?.focus();
      return;
    }

    setSending(true);
    try {
      await sendRegistration(values);
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.toLowerCase().includes("activation")) {
        setSendError(
          "Open the newest email in svelservices@gmail.com and click Activate Form. The older activation link is no longer valid.",
        );
      } else {
        setSendError("Your registration could not be sent. Please try again.");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="registration" aria-label="Registration">
      <div className="register-head">
        <svg className="register-arrow" viewBox="0 0 78 58" aria-hidden="true">
          <path
            d="M10 46C12 16 34 8 58 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M46 10c6 2.2 12 6.4 16 11.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M49 8.5 66 20.5 47.5 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2>Register now</h2>
      </div>

      {submitted ? (
        <div className="success" role="status">
          <h3>Registration received</h3>
          <p>Thank you. Your registration for Innovation Connect 2026 has been received.</p>
          <button
            type="button"
            className="submit-btn secondary"
            onClick={() => {
              setSubmitted(false);
              setValues(initialValues);
              setErrors({});
              setSendError("");
            }}
          >
            Register another attendee
          </button>
        </div>
      ) : (
        <form className="register-form" onSubmit={onSubmit} noValidate>
          <FormField id="firstName" label="First Name" error={errors.firstName}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="e.g John"
              value={values.firstName}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={describedBy("firstName", errors.firstName)}
              onChange={(event) => update("firstName", event.target.value)}
            />
          </FormField>

          <FormField id="lastName" label="Last Name" error={errors.lastName}>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="e.g Doe"
              value={values.lastName}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={describedBy("lastName", errors.lastName)}
              onChange={(event) => update("lastName", event.target.value)}
            />
          </FormField>

          <FormField id="company" label="Company Name" error={errors.company}>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company"
              value={values.company}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("company", errors.company)}
              onChange={(event) => update("company", event.target.value)}
            />
          </FormField>

          <FormField id="phone" label="Phone" error={errors.phone}>
            <div className="phone-control">
              <label className="dial-code">
                <IndiaFlag />
                <select
                  aria-label="Country calling code"
                  value={values.countryCode}
                  onChange={(event) => update("countryCode", event.target.value)}
                >
                  {dialCodes.map((entry) => (
                    <option key={entry.code} value={entry.code}>
                      {entry.name} {entry.code}
                    </option>
                  ))}
                </select>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="081234 56789"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy("phone", errors.phone)}
                onChange={(event) => update("phone", event.target.value)}
              />
            </div>
          </FormField>

          <FormField id="email" label="Email Address" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@company.com"
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email", errors.email)}
              onChange={(event) => update("email", event.target.value)}
            />
          </FormField>

          <FormField id="location" label="Choose your location" error={errors.location}>
            <select
              id="location"
              name="location"
              autoComplete="country-name"
              value={values.location}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={describedBy("location", errors.location)}
              onChange={(event) => update("location", event.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="jobTitle" label="Job Title" error={errors.jobTitle}>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              autoComplete="organization-title"
              placeholder="Title"
              value={values.jobTitle}
              aria-invalid={Boolean(errors.jobTitle)}
              aria-describedby={describedBy("jobTitle", errors.jobTitle)}
              onChange={(event) => update("jobTitle", event.target.value)}
            />
          </FormField>

          {sendError ? (
            <p className="form-alert" role="alert">
              {sendError}
            </p>
          ) : null}

          <button type="submit" className="submit-btn" disabled={sending}>
            {sending ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
}
