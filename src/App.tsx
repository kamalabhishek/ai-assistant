import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import './App.css';

function App() {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export function sendMessageToContentScript(action: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      console.log("Sending message to content script:", { action });
      chrome.tabs.sendMessage(tabs[0].id, { action }, (response) => {
        console.log("Response from content script:", response);
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        }
      });
    } else {
      console.error("No active tab found");
    }
  });
}


function handleDomActions() {
  sendMessageToContentScript("executeDomActions");
}

export default App;
