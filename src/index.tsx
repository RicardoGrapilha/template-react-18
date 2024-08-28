import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import * as serviceWorker from './serviceWorker';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create the root and render the application
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  );
} else {
  // Handle the case where the root element is not found
  console.error('Root element not found');
}

serviceWorker.unregister();
