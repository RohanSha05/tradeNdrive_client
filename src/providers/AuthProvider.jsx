import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "@/config/firebase.init";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();

	// Create user with email and password
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// Sign in user with email and password
	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Sign in with Google
	const signInWithGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// Update user profile
	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	// Reset password
	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	// Log out user
	const logOut = () => {
		setLoading(true);
		return signOut(auth)
			.then(() => {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Successfully logged out",
					showConfirmButton: false,
					timer: 1500,
					customClass: {
						popup: "custom-popup",
						title: "custom-title",
						icon: "custom-icon",
					},
				});
			})
			.catch((error) => {
				console.error("Logout error:", error);
				throw error;
			});
	};

	// Observer for auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		createUser,
		signInUser,
		signInWithGoogle,
		updateUserProfile,
		resetPassword,
		logOut,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

AuthProvider.propTypes = {
	children: PropTypes.node,
};
