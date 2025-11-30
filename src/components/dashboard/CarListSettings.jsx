import React, { useState } from "react";
import AddCarType from "./AddCarType";
import AddBrandsPage from "@/pages/dashboard/add-brands";
import AddBodyType from "./AddBodyType";
import AddFuelType from "./AddFuelType";
import AddDriveTitle from "./AddDriveTitle";
import AddGearType from "./AddGearType";
import AddOwnerType from "./AddOwnerType";
import AddFeature from "./AddFeature";
import AddCarModel from "./AddCarModel";
import AddModelYear from "./AddModelYear";

export default function CarListingSettings() {
  const [activeTab, setActiveTab] = useState("CarType");

  const renderTabContent = () => {
    switch (activeTab) {
      case "CarType":
        return <AddCarType></AddCarType>;
      case "CarBrand":
        return <AddBrandsPage></AddBrandsPage>;
      case "CarBodyType":
        return <AddBodyType></AddBodyType>;
      case "FuelType":
        return <AddFuelType></AddFuelType>;
      case "DriveType":
        return <AddDriveTitle></AddDriveTitle>;
      case "GearType":
        return <AddGearType></AddGearType>;
      case "OwnerType":
        return <AddOwnerType></AddOwnerType>;
      case "Feature":
        return <AddFeature></AddFeature>;
      case "CarModel":
        return <AddCarModel></AddCarModel>;
      case "ModelYear":
        return <AddModelYear></AddModelYear>;
      case "CarDealer":
        return <div>Content for CarDealer</div>;
      case "CarListing":
        return <div>Content for CarListing</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="content-area">
            <main id="main" className="main-content">
              <div className="tfcl-dashboard">
                <h1 className="admin-title mb-3">Edit listing</h1>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarType" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarType")}
                    >
                      CarType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarBrand" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarBrand")}
                    >
                      CarBrand
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarBodyType" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarBodyType")}
                    >
                      CarBodyType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "FuelType" ? "active" : ""}`}
                      onClick={() => setActiveTab("FuelType")}
                    >
                      FuelType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "DriveType" ? "active" : ""}`}
                      onClick={() => setActiveTab("DriveType")}
                    >
                      DriveType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "GearType" ? "active" : ""}`}
                      onClick={() => setActiveTab("GearType")}
                    >
                      GearType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "OwnerType" ? "active" : ""}`}
                      onClick={() => setActiveTab("OwnerType")}
                    >
                      OwnerType
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "Feature" ? "active" : ""}`}
                      onClick={() => setActiveTab("Feature")}
                    >
                      Feature
                    </a>
                  </li>
                
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarModel" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarModel")}
                    >
                      CarModel
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "ModelYear" ? "active" : ""}`}
                      onClick={() => setActiveTab("ModelYear")}
                    >
                      ModelYear
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarDealer" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarDealer")}
                    >
                      CarDealer
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "CarListing" ? "active" : ""}`}
                      onClick={() => setActiveTab("CarListing")}
                    >
                      CarListing
                    </a>
                  </li>
                </ul>
                <div className="tab-content mt-3">
                  {renderTabContent()}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}