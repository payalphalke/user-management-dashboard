import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', phone: '', website: '', companyName: '' };

export default function UserForm({ initialData, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Pre-fill the form when editing an existing user
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        website: initialData.website || '',
        companyName: initialData.company?.name || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      website: form.website,
      company: { name: form.companyName },
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" value={form.website} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="companyName">Company</label>
        <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
