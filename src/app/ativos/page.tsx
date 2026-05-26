import Topbar from "@/components/Topbar/page";
import LayoutMaster from "@/components/layout/page";
import Footer from "@/components/footer/page";
import ActivesComponent from "@/components/actives/page";

export default function AtivosPage() {
    // eslint-disable-next-line react/no-children-prop
    return <LayoutMaster header={<Topbar />} children={<ActivesComponent></ActivesComponent>} footer={<Footer></Footer>}></LayoutMaster>;
}
