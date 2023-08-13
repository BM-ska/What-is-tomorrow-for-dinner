import * as React from 'react';

export default function Logout() {

    localStorage.removeItem('token');

    return (
        <>"Logout successfully"</>
    );
}
