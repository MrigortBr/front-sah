import Topbar from "@/components/Topbar/page";
import LayoutMaster from "@/components/layout/page";
import Footer from "@/components/footer/page";
import Module from "@/components/module/page";

export default function ModulesPage() {
    // eslint-disable-next-line react/no-children-prop
    return <LayoutMaster header={<Topbar />} children={<Module></Module>} footer={<Footer></Footer>}></LayoutMaster>;
}
