import React, { useEffect, useRef, useState } from "react";
import CAForm from "./CAFrom";

const CoAForm = () => {
	const formRef = useRef();
	const [success, setSuccess] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState(null); // State to hold form data

	const handleShowMessage = () => {
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	};

	const sendMail = (e) => {
		e.preventDefault();
		const form = formRef.current;
		const formDataObj = new FormData(form);
		const formData = Object.fromEntries(formDataObj.entries());
		setFormData(formData);
	};



	return <section className="tf-section-contact"></section>;
};

export default CoAForm;
