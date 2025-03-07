import type { Metadata } from "next";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import { Noto_Serif, Lato } from "next/font/google";
import { ResearchProvider } from "@/components/research-context";
import { TooltipProvider } from "@/components/ui/tooltip";
// import "./globals.css";

const lato = Lato({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
    weight: ['300', '400', '700']
});

const noto = Noto_Serif({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto'
});

export const metadata: Metadata = {
    title: "Legal Drafting",
    description: "Legal Drafting",
};

export default function LegalDraftingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${lato.variable} ${noto.variable}`}>
            <CopilotKit
                    publicApiKey={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY} // if using copilot cloud
                    runtimeUrl={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY ?
                        // copilot cloud
                        "https://api.cloud.copilotkit.ai/copilotkit/v1" :
                        // local
                        "/api/copilotkit"}
                    showDevConsole={false}
                    agent="agent"
                >
                <ResearchProvider>
                    <TooltipProvider>
                        <main className="flex min-h-90vh w-full flex-col">
                            {children}
                        </main>
                    </TooltipProvider>
                </ResearchProvider>
            </CopilotKit>
        </div>
    );
}
