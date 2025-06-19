import * as React from "react";

// Nav items props declarations
export interface NavItems {
  id: number; // Unique identifier for each navigation item
  label: string; // Text shown in the nav item
  path: string; // The route or URL it links to
}

// Props for a custom button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // Text shown on the button
  isLoading?: boolean; // If true, shows a loading indicator

  otherStyles?: string;
  onClick?: () => void;
}

// Form types declaration
export interface Field {
  label: string; // Label for the input field
  name: string; // Used to identify and handle the field
  type: string; // Input type (e.g., text, email, password)
  placeholder?: string; // Placeholder text
  required?: boolean; // Whether the field is required
}

export interface FormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fields: Field[]; // Array of input field definitions
}

// AuthContext Types D{ecalration

// This interface defines the shape of a "User" object
export interface User {
  id: string;
  name: string;
  email: string;
}

// This interface defines what data and functions will be shared in AuthContext
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
