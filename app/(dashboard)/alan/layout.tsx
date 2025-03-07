import { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core"; 
 
export default function AlanAILayout({ children }: { children: ReactNode }) {
  return (

        <CopilotKit runtimeUrl="/api/copilotkit"> 
          {children}
        </CopilotKit>
  );
}