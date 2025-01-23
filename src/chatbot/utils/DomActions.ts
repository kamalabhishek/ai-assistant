export async function waitForElementToRenderWithRetries(
  selector: any,
  callback: (arg0: any) => Promise<any>,
  maxAttempts = 10,
  delay = 500,
  postFindDelay = 1000
) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkElement = () => {
      attempts++;
      const element = document.querySelector(selector);
      if (element) {
        // Wait a bit before calling the callback to ensure element is ready
        setTimeout(() => {
          try {
            callback(element)
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          } catch (error) {
            reject(error);
          }
        }, postFindDelay);
      } else if (attempts >= maxAttempts) {
        reject(new Error(`Element not found: ${selector}`));
      } else {
        setTimeout(checkElement, delay);
      }
    };
    checkElement();
  });
}

export async function typeInInput(element: HTMLInputElement, text: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )!.set;

  nativeInputValueSetter!.call(element, text); // Update the input's value

  // Dispatch input event to trigger React's state update
  const inputEvent = new Event("input", { bubbles: true });
  element.dispatchEvent(inputEvent);

  // Dispatch change event if necessary
  const changeEvent = new Event("change", { bubbles: true });
  element.dispatchEvent(changeEvent);
}

export async function typeInTextArea(
  element: HTMLTextAreaElement,
  text: string
) {
  // Access the native value setter for the HTMLTextAreaElement
  const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  )!.set;

  // Use the setter to update the value
  nativeTextAreaValueSetter!.call(element, text);

  // Dispatch the `input` event to notify React (or any framework) of the change
  const inputEvent = new Event("input", { bubbles: true });
  element.dispatchEvent(inputEvent);

  // Dispatch the `change` event if necessary
  const changeEvent = new Event("change", { bubbles: true });
  element.dispatchEvent(changeEvent);
}

export const clickOn = async (selector: string) => {
  await waitForElementToRenderWithRetries(selector, async (element) => {
    element.click();
  });
};

export const typeIn = async (selector: string, value: string) => {
    await waitForElementToRenderWithRetries('[data-testid="table-name"]', async (element) => {
        typeInInput(element, value)
    });
};
