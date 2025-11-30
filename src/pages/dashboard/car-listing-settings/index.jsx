
import MetaComponent from "@/components/common/MetaComponent";
import CarListingSettings from "@/components/dashboard/CarListSettings";

import { useApi } from "@/providers/ApiProvider";

export default function CarListingSettingsPage() {
    const { data } = useApi();
    const { site_title, moto, description1 } = data.data || {};

    const metadata = {
        title: `Listing Settings || ${site_title ?? "Isam Auto"} || ${
            moto ?? "Sells & Repair"
        }`,
        description: description1,
    };

    return (
        <>
            <MetaComponent meta={metadata} />
            <div className="dashboard-toggle">Show DashBoard</div>
            <CarListingSettings />
        </>
    );
}
