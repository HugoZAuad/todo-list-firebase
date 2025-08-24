export function useAlert() {
  const showAlert = (
    message: string,
    type: "primary" | "success" | "danger" = "primary"
  ) => {
    const event = new CustomEvent("alert", {
      detail: { message, type },
    })
    window.dispatchEvent(event)
  }

  return { showAlert }
}
