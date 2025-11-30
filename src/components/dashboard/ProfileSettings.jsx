import React, { useState } from "react";


export default function ProfileSettings() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="content-area">
                        <main id="main" className="main-content">
                            <div className="tfcl-dashboard">
                                <div className="tfcl-add-listing car-details">
                                <h1 className="admin-title mb-3">Admin Profile</h1>
                                    <div className="form-group">
                                        <label htmlFor="listing_title">Admin Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Enter title"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="listing_title">Admin Email *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Enter title"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h1 className="mb-3">Change Password</h1>
                                        <fieldset>
                                        <label htmlFor="listing_title">Current Password *</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Enter title"
                                            defaultValue=""
                                        />
                                        </fieldset>
                                        <fieldset>
                                        <label htmlFor="listing_title">New Password *</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Enter new password"
                                            defaultValue=""
                                        />
                                        </fieldset>
                                        <fieldset>
                                        <label htmlFor="listing_title">Confirm Password *</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Confirm Password"
                                            defaultValue=""
                                        />
                                        </fieldset>
                                    </div>
                                    <div className="group-button-submit">
                                        <button className="pre-btn">List Now</button>
                                        <button className="second-btn">Save &amp; Preview</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
