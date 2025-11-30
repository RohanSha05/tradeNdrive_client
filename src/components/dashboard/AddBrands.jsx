import config from "@/config/config";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddListing() {
	const [isDragging, setIsDragging] = useState(false);
	const [images, setImages] = useState([]);
	const [ReaderImages, setReaderImages] = useState([]);
	const [brandName, setBrandName] = useState("");
	const token = localStorage.getItem("authToken");
	const [success, setSuccess] = useState(false);

	const mainlogoIdLS = localStorage.getItem("CarBrandLogoId");

	const handleImageChange = (e, index) => {
		const file = e.target.files[0];
		if (file) {
			const newImages = [...images];
			newImages[index] = file;
			setImages(newImages);

			const reader = new FileReader();
			reader.onloadend = () => {
				const newImages1 = [...ReaderImages];
				newImages1[index] = reader.result;
				setReaderImages(newImages1);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDelete = (index) => {
		const newImages = images.filter((_, imgIndex) => imgIndex !== index);
		setImages(newImages);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files).slice(0, 10 - images.length);
		files.forEach((file, index) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImages((prevImages) => {
					const newImages = [...prevImages];
					newImages[prevImages.length + index] = reader.result;
					return newImages;
				});
			};
			reader.readAsDataURL(file);
		});
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleMainLogoUpload = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("file_path", images[0]);

			const response = await fetch(`${config.apiEndpoint}/upload-image/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
				},
				body: formData,
			});
			if (response.ok) {
				const data = await response.json();
				if (data.status === "success") {
					localStorage.setItem("CarBrandLogoId", data.data[0].id);
					//setMainLogoId(data.data[0].id);
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Uploaded Successfully",
						showConfirmButton: false,
						timer: 1500,
						customClass: {
							popup: "custom-popup",
							title: "custom-title",
							icon: "custom-icon",
						},
					});
					setSuccess(true);
				}
			} else {
				console.error("Failed to submit form data");
			}
		} catch (error) {
			console.error("Error submitting form data:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {});
		try {
			const response = await fetch(`${config.apiEndpoint}/car-brand/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Brand added successfully!");
			} else {
				alert("Failed to add brand.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while adding the brand.");
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="content-area">
						<main id="main" className="main-content">
							<div className="tfcl-dashboard">
								<h1 className="admin-title mb-3">Add listing</h1>
								<form onSubmit={handleSubmit}>
									<div className="tfcl-add-listing upload-photo-container">
										<div className="tfcl-add-listing upload-photo col-md-12">
											<div className="col-md-12">
												<h3>Brand Logo</h3>
												<div
													className="upload-media"
													style={
														isDragging
															? {
																	borderStyle: "solid",
																	backgroundColor: "#f2f3f4",
															  }
															: {}
													}
													onDrop={handleDrop}
													onDragOver={handleDragOver}
													onDragLeave={handleDragLeave}
												>
													{ReaderImages.length > 0 ? (
														<div>
															<div className="">
																{ReaderImages.map((imgSrc, index) => (
																	<div key={index} className="item">
																		<img
																			alt="img"
																			src={imgSrc}
																			width={615}
																			height={405}
																		/>

																		<a onClick={() => handleDelete(index)}>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width={16}
																				height={16}
																				viewBox="0 0 16 16"
																				fill="none"
																			>
																				<path
																					d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568"
																					stroke="white"
																					strokeWidth="1.5"
																					strokeLinecap="round"
																					strokeLinejoin="round"
																				/>
																			</svg>
																		</a>

																		{success ? (
																			"Uploaded"
																		) : (
																			<button
																				type=""
																				className="sc-button text-white border-0 mx-2 mx-2"
																				onClick={handleMainLogoUpload}
																			>
																				Upload
																			</button>
																		)}
																	</div>
																))}
															</div>
														</div>
													) : (
														<div className="inner">
															{/* {logo.file_url && (
																<img
																	alt="img"
																	src={logo.file_url}
																	width={615}
																	height={405}
																/>
															)} */}
															<a href="#" className="relative">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width={18}
																	height={14}
																	viewBox="0 0 18 14"
																	fill="none"
																>
																	<path
																		d="M0.875 10.125L5.17417 5.82583C5.34828 5.65172 5.55498 5.51361 5.78246 5.41938C6.00995 5.32515 6.25377 5.27665 6.5 5.27665C6.74623 5.27665 6.99005 5.32515 7.21754 5.41938C7.44502 5.51361 7.65172 5.65172 7.82583 5.82583L12.125 10.125M10.875 8.875L12.0492 7.70083C12.2233 7.52672 12.43 7.38861 12.6575 7.29438C12.885 7.20015 13.1288 7.15165 13.375 7.15165C13.6212 7.15165 13.865 7.20015 14.0925 7.29438C14.32 7.38861 14.5267 7.52672 14.7008 7.70083L17.125 10.125M2.125 13.25H15.875C16.2065 13.25 16.5245 13.1183 16.7589 12.8839C16.9933 12.6495 17.125 12.3315 17.125 12V2C17.125 1.66848 16.9933 1.35054 16.7589 1.11612C16.5245 0.881696 16.2065 0.75 15.875 0.75H2.125C1.79348 0.75 1.47554 0.881696 1.24112 1.11612C1.0067 1.35054 0.875 1.66848 0.875 2V12C0.875 12.3315 1.0067 12.6495 1.24112 12.8839C1.47554 13.1183 1.79348 13.25 2.125 13.25ZM10.875 3.875H10.8817V3.88167H10.875V3.875ZM11.1875 3.875C11.1875 3.95788 11.1546 4.03737 11.096 4.09597C11.0374 4.15458 10.9579 4.1875 10.875 4.1875C10.7921 4.1875 10.7126 4.15458 10.654 4.09597C10.5954 4.03737 10.5625 3.95788 10.5625 3.875C10.5625 3.79212 10.5954 3.71263 10.654 3.65403C10.7126 3.59542 10.7921 3.5625 10.875 3.5625C10.9579 3.5625 11.0374 3.59542 11.096 3.65403C11.1546 3.71263 11.1875 3.79212 11.1875 3.875Z"
																		stroke="white"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
																Select photos
																<input
																	name="logo"
																	type="file"
																	className="ip-file"
																	accept="image/*"
																	onChange={(e) =>
																		handleImageChange(e, images.length)
																	}
																/>
																<input
																	type="hidden"
																	name="logo"
																	value={mainlogoIdLS}
																/>
															</a>
															<div className="desc">
																or drag photos here <br />
															</div>
														</div>
													)}
												</div>
												<div className="form-group grid-md-8 mt-3">
													<label htmlFor="listing_title">
														Car Type Title *
													</label>
													<input
														type="text"
														className="form-control"
														name="title"
														placeholder="Enter title"
														//value={title}
														//onChange={(e) => setTitle(e.target.value)}
													/>
												</div>
											</div>
											<div className="group-button-submit grid-md-4">
												<button type="submit" className="pre-btn">
													List Now
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
