// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle
//   } from '@/components/ui/card';
  'use client'

import Chat from "@/components/chat";
import { useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { useCoAgentStateRender, useCopilotAction } from "@copilotkit/react-core";

import { ResearchState } from "@/lib/types";
import { Progress } from "@/components/progress";
import SourcesModal from "@/components/resource-modal";
import { useResearch } from "@/components/research-context";
import { DocumentsView } from "@/components/documents-view";
import { useStreamingContent } from '@/lib/hooks/useStreamingContent';
import { ProposalViewer } from "@/components/structure-proposal-viewer";
import { Card } from '@/components/ui/card';

const CHAT_MIN_WIDTH = 30;
const CHAT_MAX_WIDTH = 50;
  
  export default function LegalDraftingPage() {
    const [chatWidth, setChatWidth] = useState(50) // Initial chat width in percentage
    const dividerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { state: researchState, setResearchState } = useResearch()

    // Handle all "logs" - The loading states that show what the agent is doing
    useCoAgentStateRender<ResearchState>({
        name: 'agent',
        render: ({ state }) => {
            if (state.logs?.length > 0) {
                return <Progress logs={state.logs} />;
            }
            return null;
        },
    }, [researchState]);

    useCopilotAction({
        name: "review_proposal",
        description:
            "Prompt the user to review structure proposal. Right after proposal generation",
        available: "remote",
        parameters: [],
        // @ts-expect-error -- null element is legit
        renderAndWaitForResponse: ({ handler, status }) => status !== 'complete' ? (
            <ProposalViewer
                onSubmit={(approved, proposal) => handler?.({
                            ...proposal,
                            approved,
                        })}
            />
        ) : null,
    });

    const streamingSection = useStreamingContent(researchState);

    useEffect(() => {
        const divider = dividerRef.current
        const container = containerRef.current
        let isDragging = false

        const startDragging = () => {
            isDragging = true
            document.addEventListener('mousemove', onDrag)
            document.addEventListener('mouseup', stopDragging)
        }

        const onDrag = (e: MouseEvent) => {
            if (!isDragging) return
            const containerRect = container!.getBoundingClientRect()
            const newChatWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
            setChatWidth(Math.max(CHAT_MIN_WIDTH, Math.min(CHAT_MAX_WIDTH, newChatWidth))) // Limit chat width between 20% and 80%
        }

        const stopDragging = () => {
            isDragging = false
            document.removeEventListener('mousemove', onDrag)
            document.removeEventListener('mouseup', stopDragging)
        }

        divider?.addEventListener('mousedown', startDragging)

        return () => {
            divider?.removeEventListener('mousedown', startDragging)
            document.removeEventListener('mousemove', onDrag)
            document.removeEventListener('mouseup', stopDragging)
        }
    }, [])
    const {
        sections,
    } = researchState

    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    return (
      <Card>
        {/* <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>View all customers and their orders.</CardDescription>
        </CardHeader>
        <CardContent></CardContent> */}
        <div className="h-[90vh]  text-[#3D2B1F] font-lato px-8 2xl:px-[8vw]">
            <div className="h-full border-black/10 border-y-0">
                {/* Toolbar */}
                {/*<Toolbar />*/}

                {/* Main Chat Window */}
                <div className="flex h-full overflow-hidden flex-1" ref={containerRef}>
                    <div style={{width: `${chatWidth}%`}}>
                        <Chat
                            onSubmitMessage={async () => {
                                // clear the logs before starting the new research
                                setResearchState({ ...researchState, logs: [] });
                                await new Promise((resolve) => setTimeout(resolve, 30));
                            }}
                        />
                    </div>

                    <div
                        ref={dividerRef}
                        className="w-1 bg-[var(--border)] hover:bg-[var(--primary)] cursor-col-resize flex items-center justify-center"
                    >
                        <GripVertical className="h-6 w-6 text-[var(--primary)]"/>
                    </div>

                    {/* Document Viewer */}
                    <DocumentsView
                        sections={sections ?? []}
                        streamingSection={streamingSection}
                        selectedSection={sections?.find(s => s.id === selectedSectionId)}
                        onSelectSection={setSelectedSectionId}
                    />
                </div>
            </div>
            <SourcesModal />
        </div>
      </Card>
    );
  }
  