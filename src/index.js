import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { AuthUserProvider } from "./auth";
import { PostHogProvider } from 'posthog-js/react';

const options = {
    api_host: 'https://eu.posthog.com',
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PostHogProvider
        apiKey={'phc_9Ncb5V1XYnCUUWWO5bRtahKLNVlHWWhuCzBqAWFUGrX'}
        options={options}
    >
        <AuthUserProvider>
            <App />
        </AuthUserProvider>
    </PostHogProvider>
);
