export default function UserCard({ user, onView, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.name}</h3>
        {user.company?.name && <span className="company-badge">{user.company.name}</span>}
      </div>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <div className="user-card-actions">
        <button className="btn btn-view" onClick={() => onView(user)}>
          View
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(user)}>
          Delete
        </button>
      </div>
    </div>
  );
}
