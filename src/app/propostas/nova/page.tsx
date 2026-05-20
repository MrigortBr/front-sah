import Footer from "@/components/footer/page";
import LayoutMaster from "@/components/layout/page";
import NewProposalComp from "@/components/newProposal/page";
import Topbar from "@/components/Topbar/page";

export default function NewProposal() {
    // eslint-disable-next-line react/no-children-prop
    return <LayoutMaster header={<Topbar />} children={<NewProposalComp></NewProposalComp>} footer={<Footer></Footer>}></LayoutMaster>;
}
