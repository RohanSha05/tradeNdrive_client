import { AuthContext } from "@/providers/AuthProvider";
import config from "@/config/config";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
	const { user, logOut } = useContext(AuthContext);
	const token = localStorage.getItem("authToken");
	const [isAuthorized, setIsAuthorized] = useState(null); // Initialize as null

	useEffect(() => {
		const checkAuthorization = async () => {
			if (user || token) {
				try {
					const response = await fetch(`${config.apiEndpoint}/dashboard/`, {
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
						},
					});
					const data = await response.json();

					if (data.status === "success") {
						setIsAuthorized(true);
					} else {
						logOut();
						setIsAuthorized(false);
					}
				} catch (error) {
					Swal.fire({
						position: "top-end",
						icon: "error",
						title: `${error.message}`,
						showConfirmButton: false,
						timer: 1500,
						customClass: {
							popup: "custom-popup",
							title: "custom-title",
							icon: "custom-icon",
						},
					});
					logOut();
					setIsAuthorized(false);
				}
			} else {
				setIsAuthorized(false);
			}
		};
		checkAuthorization();
	}, [user, token, logOut]);

	if (isAuthorized === null) {
		return null;
	}

	if (isAuthorized) {
		return children;
	} else {
		return (
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: "Access Denied!",
				showConfirmButton: false,
				timer: 1500,
				customClass: {
					popup: "custom-popup",
					title: "custom-title",
					icon: "custom-icon",
				},
			}),
			(<Navigate to="/" />)
		);
	}
};

export default PrivateRoute;