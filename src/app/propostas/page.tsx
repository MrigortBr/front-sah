import Topbar from "@/components/Topbar/page";
import LayoutMaster from "@/components/layout/page";
import Footer from "@/components/footer/page";
import Proposal from "@/components/proposal/page";

export default function ProposakPage() {
    // eslint-disable-next-line react/no-children-prop
    return <LayoutMaster header={<Topbar />} children={<Proposal></Proposal>} footer={<Footer></Footer>}></LayoutMaster>;
}
