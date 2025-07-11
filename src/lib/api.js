import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  
  // Store token if provided
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  
  // Store token if provided
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    
    return response.data;
  } catch (error) {
    // Even if logout fails on server, clear local token
    localStorage.removeItem('authToken');
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    
    // If unauthorized, clear token
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
    }
    
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

// Payment API functions
export const createPaymentOrder = async (amount, currency = "INR") => {
  const response = await axiosInstance.post("/payment/create-order", { amount, currency });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await axiosInstance.post("/payment/verify", paymentData);
  return response.data;
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Utility function to get token
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Alias for consistency with existing code
export const getMyFriends = getUserFriends;