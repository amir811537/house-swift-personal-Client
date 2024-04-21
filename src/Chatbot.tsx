/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

// Extend the Window interface
declare global {
  interface Window {
    botpressWebChat: any; // Adjust the type according to your needs
  }
}

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: '14363d2e-b71b-4bda-a9b3-c5350e930e67',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '14363d2e-b71b-4bda-a9b3-c5350e930e67',
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
