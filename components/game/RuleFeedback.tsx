import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

export function RuleFeedback({ kind, title, messages }: { kind: "success" | "error" | "info"; title: string; messages: string[] }) {
  const Icon = kind === "success" ? CheckCircle2 : kind === "error" ? TriangleAlert : Info;
  return (
    <div className={`rule-feedback rule-feedback-${kind}`} role="status" aria-live="polite">
      <Icon aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        {messages.map((message) => <p key={message}>{message}</p>)}
      </div>
    </div>
  );
}
