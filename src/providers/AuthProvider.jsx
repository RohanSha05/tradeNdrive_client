import config from "@/config/config";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const signInUser = async (email, password) => {
		try {
			// const response = await fetch(`${config.apiEndpoint}/login/`, {
			const response = await fetch(`${config.apiEndpoint}/login/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				mode: "cors",
			});
			const data = await response.json();

			if (data.status === "success") {
				localStorage.setItem("authToken", data.token);
				setUser({ email }); // Set the user state with the email
				return { status: "success" };
			} else {
				throw new Error(data.message || "Login failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			throw new Error("Something went wrong. Please try again later.");
		}
	};

	const logOut = async () => {
		try {
			const response = await fetch(`${config.apiEndpoint}/logout/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
				mode: "cors",
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Logout error data:", errorData);
				if (errorData.message === "Invalid token or user not authenticated") {
					localStorage.removeItem("authToken");
					setUser(null);
				} else {
					throw new Error("Logout failed. Please try again.");
				}
			} else {
				const data = await response.json();
				localStorage.removeItem("authToken");
				setUser(null);
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${data.message}`,
					showConfirmButton: false,
					timer: 1500,
					customClass: {
						popup: "custom-popup",
						title: "custom-title",
						icon: "custom-icon",
					},
				});
			}
		} catch (error) {
			console.error("Error during logout:", error);
			throw new Error("Something went wrong. Please try again later.");
		}
	};

	useEffect(() => {
		// Check if the user is already logged in
		const token = localStorage.getItem("authToken");
		if (token) {
			// You can add more logic here to validate the token if needed
			setUser({ user }); // Set the user state with a dummy email
		}
	}, []);

	const authInfo = { user, signInUser, logOut };

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

AuthProvider.propTypes = {
	children: PropTypes.node,
};