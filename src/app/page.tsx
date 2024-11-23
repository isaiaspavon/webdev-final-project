'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from "next/navigation"; // For programmatic navigation
import { signIn } from "next-auth/react";

// Helper function for credential login
export async function doCredentialLogin(formData: FormData): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    console.log("Attempting to sign in...");
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false, // Avoid automatic redirects
    });
    console.log("SignIn Response:", response);
    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return null;
  }
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare data as FormData
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        // Call the credential login function
        const response = await doCredentialLogin(formData);

        if (response?.ok && !response.error) {
            console.log("Login successful!");
            router.push("/Home")
        } else {
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className={styles.signupBackground}>
            <div className={styles.overlay}></div> {/* Blurred background overlay */}
            <div className={styles.content}>
                <h1 className="text-2xl font-semibold mb-6">RoomSync</h1>
                <h2 className="text-2xl font-semibold mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                    )}
                    <div className={styles.buttonContainer}>
                        <button type="button"
                            onClick={() => router.push("/signup")}
                            className={styles.submitButton}>
                            Sign up
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;