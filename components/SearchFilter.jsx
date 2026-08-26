export default function SearchFilter({ search, onSearchChange, company, onCompanyChange, companies }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        aria-label="Search users"
      />
      <select
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        className="company-select"
        aria-label="Filter by company"
      >
        <option value="">All Companies</option>
        {companies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
