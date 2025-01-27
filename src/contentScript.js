console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "createRepo") {
    Array.from(document.querySelectorAll('a')).find((el) => el.textContent.trim() === "New").click();
    chrome.storage.local.set({ actionStep: "waitingForNextPage" });
  }

  if (message.action === "triggerAction") {
    document.querySelector('#actions-tab').click();
    chrome.storage.local.set({ actionStep: "actionsPage" });
  }

  if (message.action === "createPR") {
    window.location.href = `${window.location.origin}${window.location.pathname}/compare/main...test`;
    chrome.storage.local.set({ actionStep: "comparePage" });
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
        inputElement.value = "ai-assistant-test-repo";

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

  if (result.actionStep === "actionsPage") {
    document.querySelector('a[href="/Srivyshnavi-K/my-ai-assistant/actions/workflows/main.yml"]').click();
    chrome.storage.local.set({ actionStep: "myAction" });
    document.querySelector('details.js-dropdown-details > summary.primary.btn-sm.btn').click();
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('button.Button--primary.Button--small.Button.mt-2').click();
    });
  }

  if (result.actionStep === "comparePage") {
    setTimeout(() => {
      document.querySelector('button.js-details-target.btn-primary.btn').click();
    }, 1000);
  }

  chrome.storage.local.remove("actionStep");
});
