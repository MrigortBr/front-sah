import { PagesPermissions } from "@/data/pages";
import Loading from "../spinner/page";
import { CancelButton, Container, DeleteButton, SaveButton, SendButton } from "./styled";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PROPS = {
    generate: () => void;
    deleteProposal?: () => void;
    load: boolean;
};

export default function FooterNewProposal({ generate, deleteProposal, load }: PROPS) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Container>
            <CancelButton onClick={() => router.push(PagesPermissions[pathname].go)}>← Cancelar</CancelButton>
            <SaveButton hidden={true}>💾 Salvar rascunho</SaveButton>
            {deleteProposal ? <DeleteButton onClick={() => deleteProposal()}>Deletar Habilitação</DeleteButton> : <></>}

            <SendButton onClick={generate}>{load ? <Loading text="" /> : "Enviar proposta →"}</SendButton>
        </Container>
    );
}
