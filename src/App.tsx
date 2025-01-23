// import "./App.css"
import Chatbot from "react-chatbot-kit";

import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import 'react-chatbot-kit/build/main.css';

function App() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <button className="repo" onClick={handleDomActions}>Create a Repo</button>
    </div>
  );
}

function sendMessageToContentScript(action: string) {
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
