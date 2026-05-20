import React, { useState } from "react";
import { TabsWrapper, Tab, TabIcon } from "./styled";

export type TabId = "lista-propostas" | "gerador-notas";

interface TabItem {
    id: TabId;
    label: string;
    icon: string;
}

const TABS: TabItem[] = [
    { id: "lista-propostas", label: "Lista de Propostas", icon: "📋" },
    { id: "gerador-notas", label: "Gerador de Notas", icon: "📝" },
];

interface TabsProps {
    defaultTab?: TabId;
    onChange?: (tabId: TabId) => void;
}

export function Tabs({ defaultTab = "lista-propostas", onChange }: TabsProps) {
    const [active, setActive] = useState<TabId>(defaultTab);

    function handleSelect(id: TabId) {
        setActive(id);
        onChange?.(id);
    }

    return (
        <TabsWrapper role="tablist" aria-label="Navegação principal">
            {TABS.map((tab) => (
                <Tab key={tab.id} role="tab" aria-selected={active === tab.id} $active={active === tab.id} onClick={() => handleSelect(tab.id)}>
                    <TabIcon aria-hidden="true">{tab.icon}</TabIcon>
                    {tab.label}
                </Tab>
            ))}
        </TabsWrapper>
    );
}
