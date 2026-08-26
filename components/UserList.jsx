import UserCard from './UserCard';

export default function UserList({ users, onView, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="empty-state">No users found. Try a different search or filter.</p>;
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
