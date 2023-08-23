import * as React from 'react';

export default function Logout() {

    localStorage.removeItem('token');
    window.location.href = "http://localhost:3000";
    return (
        <>"Logout successfully"</>
    );
}
