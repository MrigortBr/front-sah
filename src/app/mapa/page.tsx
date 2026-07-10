import Topbar from "@/components/Topbar/page";
import LayoutMaster from "@/components/layout/page";
import Footer from "@/components/footer/page";
import MapaComponent from "@/components/mapa/page";

export default function MapaPage() {
    // eslint-disable-next-line react/no-children-prop
    return <LayoutMaster header={<Topbar />} children={<MapaComponent></MapaComponent>} footer={<Footer />} />;
}
