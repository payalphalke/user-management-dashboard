# User Management Dashboard

A React dashboard that fetches, searches, creates, edits, and deletes users using the
[JSONPlaceholder](https://jsonplaceholder.typicode.com) public REST API.

## Tech Stack

- React 18 (functional components + hooks)
- Vite (build tool / dev server)
- Axios (API calls)
- Plain CSS (no framework, kept simple and consistent)

## Features

- Fetch and display users (name, email, phone, company, website)
- Loading and error states for all API calls
- Search by name/email and filter by company, debounced so it doesn't
  re-filter on every keystroke
- View full user details in a modal, including that user's posts
  (`GET /posts?userId={id}`)
- Create a user via a validated form (`POST /users`)
- Edit a user, pre-filled with existing data (`PUT /users/{id}`)
- Delete a user with a confirmation step (`DELETE /users/{id}`)
- Toast notifications for success/error feedback
- Responsive layout (desktop and mobile)

## Project Structure

```
src/
  components/   UserList, UserCard, UserForm, UserDetails, ConfirmationModal, SearchFilter, Toast, Loader
  services/     userApi.js        (all API calls, isolated from UI)
  hooks/        useUsers.js       (fetch + CRUD state)
                useDebounce.js    (debounced search)
  pages/        Users.jsx         (page that wires everything together)
  App.jsx
  main.jsx
```

## Setup & Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
npm run preview
```

## Deployment

Deployed on Vercel (Vite apps deploy with zero config — default build
command `npm run build`, output directory `dist`).

- GitHub: `<add your repo link here>`
- Live app: `<add your Vercel link here>`

## Assumptions & Known Limitations

- **JSONPlaceholder is a fake/mock API.** It does not persist data —
  `POST`, `PUT`, and `DELETE` requests succeed with a valid-looking
  response but nothing actually changes on the server, and refreshing
  the page resets everything. All create/edit/delete actions are
  reflected instantly in the UI's local state (optimistic update after
  the API call resolves), which is the expected way to demonstrate
  these flows against a mock API.
- The API always returns a new user with `id: 11` on `POST`. To avoid
  ID collisions when creating multiple users in one session, a local
  unique ID (`Date.now()`) is assigned to newly created users.
- Search/filtering runs client-side against the already-fetched user
  list (JSONPlaceholder has only 10 users, so this is simpler and
  faster than adding server-side query params) — the debounce is there
  to demonstrate the pattern for a real, larger-scale API.
- No routing library was added since there's a single page; React
  Router would be straightforward to add if more pages were needed.
- No global state manager (Redux/Context) was used — all state fits
  naturally in a couple of hooks, so adding one wasn't justified.
