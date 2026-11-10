'use client';

import { useState } from 'react';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (name, value) => {
  const v = value.trim();
  if (name === 'name' && !v) return 'Add your name so I know who to reply to.';
  if (name === 'email' && !v) return 'Add an email address so I can reply.';
  if (name === 'email' && !EMAIL_RE.test(v)) return 'This email looks incomplete. Check it has an @ and a domain.';
  if (name === 'message' && v.length < 10) return 'Tell me a little more (at least 10 characters).';
  return '';
};

const fields = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', placeholder: 'Jane Doe' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' },
];

const inputClass = 'w-full rounded-2xl bg-white/[0.03] px-5 text-sm text-white outline-none ring-1 transition-all duration-500 ease-spring placeholder:text-white/25 hover:ring-white/20 focus:bg-white/[0.05] focus:ring-ember/60';

const ContactForm = ({ to }) => {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an error as soon as the field becomes valid.
    if (errors[name] && !validate(name, value)) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return; // don't nag on an untouched empty field
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = Object.fromEntries(Object.keys(values).map((key) => [key, validate(key, values[key])]));
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const ring = (name) => (errors[name] ? 'ring-ember/80' : 'ring-white/10');

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={`contact-${field.name}`} className="text-[11px] uppercase tracking-[0.18em] text-white/60">
              {field.label}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
              className={`${inputClass} h-12 ${ring(field.name)}`}
            />
            {errors[field.name] && (
              <p id={`contact-${field.name}-error`} className="text-xs text-ember-soft">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.18em] text-white/60">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="A few lines about your project, timeline and budget."
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputClass} py-4 leading-relaxed ${ring('message')}`}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-ember-soft">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-extralight leading-relaxed text-white/60" aria-live="polite">
          {sent ? (
            <>
              Your email app should now be open with the message ready. Nothing opened? Email{' '}
              <a href={`mailto:${to}`} className="text-white underline underline-offset-4">
                {to}
              </a>
              .
            </>
          ) : (
            'Opens your email app with everything filled in.'
          )}
        </p>

        <button type="submit" className="btn-pill btn-pill-ember self-start md:self-auto">
          Send message
          <span className="btn-pill-icon">
            <PiPaperPlaneTiltLight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
