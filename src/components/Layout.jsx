import React from 'react';

const Layout = ({children}) => {
    return (
        <div>
            
            <header>
                <h1><i className="fas fa-university"></i> Bank Form</h1>
            </header>
            <div className='componentContainer'>
                {children}
            </div>
            <footer>
                <h5><i className="fas fa-phone-alt"></i> Si presentas problemas puedes llamar a Atención al cliente</h5>
            </footer>

        </div>
    );
}

export default Layout;
