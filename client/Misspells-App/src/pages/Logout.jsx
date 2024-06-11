import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Clear stored user data, such as cookies or localStorage
    document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Optionally perform any additional logout actions (e.g., redirect)
  }, []);

  return (
    <div>
      <h2>Logout</h2>
      <p>You have been logged out.</p>
      {/* Optionally add a link to redirect users after logout */}
      {/* <a href="/">Go to Home</a> */}
    </div>
  );
}

export default Logout;
