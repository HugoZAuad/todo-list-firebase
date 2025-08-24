export function showAlert(message: string, type: "primary" | "success" | "danger") {
  const event = new CustomEvent("alert", {
    detail: { message, type },
  });
  window.dispatchEvent(event);
}
