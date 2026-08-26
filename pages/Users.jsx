import { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import UserList from '../components/UserList';
import SearchFilter from '../components/SearchFilter';
import UserForm from '../components/UserForm';
import UserDetails from '../components/UserDetails';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

export default function Users() {
  const { users, loading, error, fetchUsers, addUser, editUser, removeUser } = useUsers();

  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type }), 3000);
  };

  // Derive the list of unique company names for the filter dropdown
  const companies = useMemo(() => {
    const set = new Set(users.map((u) => u.company?.name).filter(Boolean));
    return Array.from(set);
  }, [users]);

  // Filtering happens on already-fetched data, no extra API calls per keystroke
  const filteredUsers = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
      const matchesCompany = company ? u.company?.name === company : true;
      return matchesSearch && matchesCompany;
    });
  }, [users, debouncedSearch, company]);

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      await addUser(data);
      setShowCreateForm(false);
      showToast('User created successfully!');
    } catch {
      showToast('Failed to create user. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (data) => {
    setSubmitting(true);
    try {
      await editUser(editingUser.id, data);
      setEditingUser(null);
      showToast('User updated successfully!');
    } catch {
      showToast('Failed to update user. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeUser(deletingUser.id);
      showToast('User deleted successfully!');
    } catch {
      showToast('Failed to delete user. Please try again.', 'error');
    } finally {
      setDeletingUser(null);
    }
  };

  return (
    <div className="users-page">
      <header className="page-header">
        <h1>User Management Dashboard</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
          + Add User
        </button>
      </header>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        company={company}
        onCompanyChange={setCompany}
        companies={companies}
      />

      {loading && <Loader text="Loading users..." />}

      {!loading && error && (
        <div className="error-box">
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={fetchUsers}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <UserList
          users={filteredUsers}
          onView={setViewingUser}
          onEdit={setEditingUser}
          onDelete={setDeletingUser}
        />
      )}

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Add New User</h2>
            <UserForm onSubmit={handleCreate} onCancel={() => setShowCreateForm(false)} submitting={submitting} />
          </div>
        </div>
      )}

      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>
            <UserForm
              initialData={editingUser}
              onSubmit={handleEdit}
              onCancel={() => setEditingUser(null)}
              submitting={submitting}
            />
          </div>
        </div>
      )}

      {viewingUser && <UserDetails user={viewingUser} onClose={() => setViewingUser(null)} />}

      {deletingUser && (
        <ConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${deletingUser.name}? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingUser(null)}
        />
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, message: '' }))}
      />
    </div>
  );
}
