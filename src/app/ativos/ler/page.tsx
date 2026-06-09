import Footer from "@/components/footer/page";
import LayoutMaster from "@/components/layout/page";
import LoadActiveComponent from "@/components/loadActive/page";
import Topbar from "@/components/Topbar/page";
import { Suspense } from "react";

export default function LoadActives() {
    return (
        <LayoutMaster
            header={<Topbar />}
            // eslint-disable-next-line react/no-children-prop
            children={
                <Suspense>
                    <LoadActiveComponent></LoadActiveComponent>
                </Suspense>
            }
            footer={<Footer></Footer>}
        ></LayoutMaster>
    );
}
