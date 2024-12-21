function isTokenExpired(token) {
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    // Decode the token payload without verifying it
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    // Check if the token has an exp field
    if (!payload.exp) {
      throw new Error("Token does not have an expiration time");
    }

    // Calculate expiration time in milliseconds
    const expirationTime = payload.exp * 1000; // JWT exp is in seconds
    const currentTime = Date.now();

    // Return whether the token is expired
    return currentTime >= expirationTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Assume expired if token is invalid
  }
}

// Example usage
const token = "12343232";
if (isTokenExpired(token)) {
  console.log("Token is expired");
} else {
  console.log("Token is valid");
}
