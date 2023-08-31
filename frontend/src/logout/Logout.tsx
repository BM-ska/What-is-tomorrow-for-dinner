import * as React from 'react';

export default function Logout() {

    localStorage.removeItem('token');
    window.location.href = "http://34.116.180.131:3000";
    return (
        <>"Logout successfully"</>
    );
}
