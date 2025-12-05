import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PreLoader from "@/components/pre-loader/PreLoader";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <PreLoader />;
	}

	if (user) {
		return children;
	}

	return <Navigate to="/login" replace />;
};

export default PrivateRoute;