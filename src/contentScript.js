console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "executeDomActions") {
    try {
      const linkElement = Array.from(document.querySelectorAll('a')).find(
        (el) => el.textContent.trim() === "New"
      );

      if (linkElement) {
        console.log("Found the link element:", linkElement);
        linkElement.click();

        chrome.storage.local.set({ actionStep: "waitingForNextPage" });

        sendResponse({ status: "success", message: "Clicked the 'New' link!" });
      } else {
        console.warn("The 'New' link element was not found.");
        sendResponse({ status: "error", message: "The 'New' link element was not found." });
      }
    } catch (error) {
      console.error("Error executing DOM action:", error);
      sendResponse({ status: "error", message: error.message });
    }
  }
});

chrome.storage.local.get(["actionStep"], (result) => {
  if (result.actionStep === "waitingForNextPage") {
    setTimeout(() => {
      const inputElement = document.querySelector(
        'span.TextInputWrapper__StyledTextInputBaseWrapper-sc-1mqhpbi-0 input[type="text"]'
      );

      if (inputElement) {
        console.log("Found the input element:", inputElement);
        inputElement.value = "ai-assistant-repo";

        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);

        const radioButton = document.querySelector(
            'div.Box-sc-g0xbh4-0 input[type="radio"][value="private"]'
          );
  
          if (radioButton) {
            console.log("Found the radio button:", radioButton);
            radioButton.click();
          } else {
            console.warn("Radio button not found.");
          }
          const checkBox = document.querySelector(
            'div.Box-sc-g0xbh4-0 input[type="checkbox"]'
          );
  
          if (checkBox && checkBox.getAttribute("aria-checked") === "false") {
            console.log("Found the checkbox:", checkBox);
            checkBox.click();
          } else {
            console.warn("Checkbox not found or already checked.");
          }
        
          const createRepoButton = document.querySelector(
            'button[type="submit"] span.prc-Button-Label-pTQ3x'
          );
  
          if (createRepoButton) {
            console.log("Found the 'Create repository' button:", createRepoButton);
            createRepoButton.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
            createRepoButton.click();
            }, 1000);
            console.log("clicked the create repo button")
          } else {
            console.warn("'Create repository' button not found.");
          }

        chrome.storage.local.set({ actionStep: "completed" });
      } else {
        console.warn("Input field not found.");
      }
    }, 500);
  }
});
