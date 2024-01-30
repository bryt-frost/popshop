export function extractErrorMessage(error) {
  return error.response?.data?.message || error.response?.data?.detail || error.message || error.toString();
}
