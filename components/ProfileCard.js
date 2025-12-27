export default function ProfileCard({ user }) {
  return (
    <div>
      <img src="https://i.pravatar.cc/120" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
