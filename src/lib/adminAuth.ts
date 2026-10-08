import { useState, useEffect } from "react";

export const API_BASE_URL = "https://sumiraj-backend.vercel.app/api";

const AUTH_KEY = "sumiraj_admin_authenticated";
const ACCESS_TOKEN_KEY = "sumiraj_access_token";
const REFRESH_TOKEN_KEY = "sumiraj_refresh_token";
const USER_KEY = "sumiraj_admin_user";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
  };
}

export interface ProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: UserProfile;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): UserProfile | null {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  const token = getAccessToken();
  const authState = localStorage.getItem(AUTH_KEY) === "true";
  return Boolean(token && authState);
}

/**
 * Call POST https://sumiraj-backend.vercel.app/api/auth/login
 */
export async function loginAdminApi(emailInput: string, passwordInput: string): Promise<{ success: boolean; message: string; user?: UserProfile }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.trim(),
        password: passwordInput.trim(),
      }),
    });

    const resData: LoginResponse = await response.json();

    if (response.ok && resData.success && resData.data) {
      const { accessToken, refreshToken, user } = resData.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_KEY, "true");

      window.dispatchEvent(new Event("admin-auth-changed"));

      return {
        success: true,
        message: resData.message || "Logged in successfully",
        user,
      };
    } else {
      return {
        success: false,
        message: resData.message || "Login failed. Please check your credentials.",
      };
    }
  } catch (error: any) {
    console.error("Login API Error:", error);
    return {
      success: false,
      message: error?.message || "Unable to connect to login server. Please try again later.",
    };
  }
}

/**
 * Call GET https://sumiraj-backend.vercel.app/api/auth/profile
 */
export async function fetchProfileApi(): Promise<UserProfile | null> {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData: ProfileResponse = await response.json();

    if (response.ok && resData.success && resData.data) {
      localStorage.setItem(USER_KEY, JSON.stringify(resData.data));
      window.dispatchEvent(new Event("admin-auth-changed"));
      return resData.data;
    }
    return null;
  } catch (error) {
    console.error("Fetch profile API error:", error);
    return null;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("admin-auth-changed"));
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(getStoredUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(isAdminAuthenticated());
      setUserProfile(getStoredUser());
    };

    window.addEventListener("admin-auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    // If authenticated, fetch profile to ensure data is fresh
    if (isAdminAuthenticated()) {
      fetchProfileApi().then((freshProfile) => {
        if (freshProfile) {
          setUserProfile(freshProfile);
        }
      });
    }

    return () => {
      window.removeEventListener("admin-auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return {
    isAuthenticated,
    userProfile,
    login: loginAdminApi,
    logout: logoutAdmin,
    fetchProfile: fetchProfileApi,
    getAccessToken,
  };
}
