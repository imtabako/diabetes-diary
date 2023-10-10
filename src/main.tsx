import React, {PropsWithChildren, useMemo} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { SDKProvider, useInitData, useSDK } from "@tma.js/sdk-react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
function DisplayGate({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK();
  const errorMessage = useMemo<null | string>(() => {
    if (!error) {
      return null;
    }

    return error instanceof Error ? error.message : 'Unknown error';
  }, [error]);

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return <div>SDK init function is not yet called.</div>;
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return (
      <>
        <p>
          SDK was unable to initialize. Probably, current application is being used
          not in Telegram Web Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage}</p>
        </blockquote>
      </>
    );
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return <div>Loading..</div>;
  }

  // Safely render application.
  return children;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SDKProvider initOptions={{ cssVars: true }}>
          <DisplayGate>
            <App />
          </DisplayGate>
        </SDKProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
