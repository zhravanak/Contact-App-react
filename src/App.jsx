
import React from 'react';

import ContactList from './ContactList';
import { ContactProvider } from './ConcatContext';
function App() {
    return (
        <ContactProvider>
            <div className="App">
                <ContactList />
            </div>
        </ContactProvider>
    );
}

export default App;
