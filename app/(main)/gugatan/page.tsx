'use client';

import { CopilotPopup } from '@copilotkit/react-ui';
import React, { useState, Suspense } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const GugatanContent = () => {
    const docs = [
        {
            uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
            // uri:"doc1.docx",
            filetype: "docx",
            fileName: "demo.docx"
        }
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Document Viewer</h5>
                    <div className="flex flex-column gap-2">
                        {docs.length > 0 && (
                            <div style={{ height: '800px', width: '100%', background: '#fff' }}>
                                <DocViewer
                                    documents={docs}
                                    pluginRenderers={DocViewerRenderers}
                                    style={{ height: 800 }}
                                    // config={{
                                    //     header: {
                                    //       disableHeader: false,
                                    //       disableFileName: false,
                                    //       retainURLParams: false,
                                    //     },
                                    //   }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <CopilotPopup
                instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                labels={{
                    title: "ALAN 1.0",
                    initial: "Halo adakah yang bisa saya bantu?",
                }}
            />
        </div>
    );
};

const Gugatan = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GugatanContent />
        </Suspense>
    );
};

export default Gugatan;