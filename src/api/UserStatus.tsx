import { logout } from "thin-backend";
import { useCurrentUser } from "thin-backend-react";

export default function UserStatus() {
  // Use the `useCurrentUser()` react hook to access the current logged in user
  const user = useCurrentUser();

  return (
    <div>
      {user?.email}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
