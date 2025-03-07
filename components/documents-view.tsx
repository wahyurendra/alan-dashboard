import { Section } from "@/lib/types";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DocumentOptions from "@/components/document-options";
import { DocumentsScrollbar } from "@/components/documents-scrollbar";
import { DocumentViewer } from "@/components/document-viewer";
import { useResearch } from "@/components/research-context";
import { DocumentOptionsState } from "types/document-options-state";
import { useCopilotChat } from "@copilotkit/react-core";
import { cn } from "@/lib/utils";

interface DocumentsViewProps {
    sections: Section[];
    selectedSection?: Section;
    onSelectSection: (sectionId: string) => void;
    streamingSection?: Section | null;
}

export function DocumentsView({ sections, selectedSection, onSelectSection, streamingSection }: DocumentsViewProps) {
    const { state, setResearchState } = useResearch()
    const { isLoading: running } = useCopilotChat()
    const [viewableSection, setViewableSection] = useState(selectedSection)
    const [documentOptionsState, setDocumentOptionsState] = useState<DocumentOptionsState>({ mode: 'full', editMode: false })

    const handleSectionEdit = useCallback((editedSection: Section) => {
        setResearchState({
            ...state,
            sections: state.sections.map(section => section.id === editedSection.id ? editedSection : section)
        })
    }, [setResearchState, state])

    useEffect(() => {
        if (selectedSection) {
            setViewableSection(selectedSection)
            return;
        }

        if (streamingSection?.id && streamingSection.id !== (selectedSection as Section | undefined)?.id) {
            setViewableSection(streamingSection as Section)
        }
    }, [streamingSection, selectedSection]);

    const emptyState = useMemo(() => {
        let placeholder = 'Begin by identifying the legal issue and gathering relevant information to support your case.'
        if (running && !sections.length) {
            placeholder = 'The agent is running. As draft is created, it will show up here'
        }
        if (sections.length) {
            placeholder = 'Pick a section from the sections tab to the right, to view and edit'
        }
        return (
            <DocumentViewer
                editMode={false}
                onSectionEdit={handleSectionEdit}
                zoomLevel={100}
                placeholder={placeholder}
            />
        )
    }, [sections.length, running, handleSectionEdit])

    return (
        <div className={cn('flex flex-col flex-1 overflow-y-hidden h-full p-4', !sections.length ? 'pr-0' : '' )}>
            <DocumentOptions
                onChange={change => setDocumentOptionsState(prev => ({ ...prev, ...change }))}
                state={documentOptionsState}
                canEdit={Boolean(!running && sections.length && (viewableSection || documentOptionsState.mode === 'full'))}
            />

            <div className="flex flex-1 overflow-hidden">
                {documentOptionsState.mode === 'section' ? (
                <div className="flex flex-1 overflow-hidden">
                    {/* Selected section view on the left */}
                    {viewableSection ? (
                        <DocumentViewer
                            section={viewableSection}
                            zoomLevel={100}
                            onSelect={onSelectSection}
                            onSectionEdit={handleSectionEdit}
                            editMode={documentOptionsState.editMode}
                        />
                    ) : emptyState}

                    {/* Scrollable thumbnails on the right */}
                </div>
            ) : (
                sections.length ? (
                    <div className="overflow-auto space-y-4 flex-1">
                        {sections?.map(section => (
                                <DocumentViewer
                                    key={section.id}
                                    section={section}
                                    zoomLevel={100}
                                    highlight={false}
                                    compact={false}
                                    onSelect={() => {
                                    }}
                                    onSectionEdit={handleSectionEdit}
                                    editMode={documentOptionsState.editMode}
                                />
                            ))}
                    </div>
                ) : emptyState
            )}
            {sections.length > 0 && (
                        <DocumentsScrollbar
                            sections={sections}
                            selectedSectionId={selectedSection?.id}
                            onSelectSection={onSelectSection}
                        />
                    )}
            </div>
        </div>
    )
}
