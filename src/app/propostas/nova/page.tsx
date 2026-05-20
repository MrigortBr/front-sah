import Footer from "@/components/footer/page";
import LayoutMaster from "@/components/layout/page";
import NewProposalComp from "@/components/newProposal/page";
import Topbar from "@/components/Topbar/page";
import { Suspense } from "react";

export default function NewProposal() {
    return (
        <LayoutMaster
            header={<Topbar />}
            // eslint-disable-next-line react/no-children-prop
            children={
                <Suspense>
                    <NewProposalComp></NewProposalComp>
                </Suspense>
            }
            footer={<Footer></Footer>}
        ></LayoutMaster>
    );
}
