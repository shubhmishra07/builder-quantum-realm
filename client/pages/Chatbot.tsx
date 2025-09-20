import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Namaste! Ask me anything about your crops in Hindi or English." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const reply = `You said: ${input}. In production, connect your AI assistant here.`;
    setMessages((m) => [...m, { role: "user", text: input }, { role: "bot", text: reply }]);
    setInput("");
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(reply);
      speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800">AI Chatbot</h1>
      <div className="rounded-xl border bg-white p-4 shadow-sm min-h-[300px] grid">
        <div className="space-y-2 max-h-[40vh] overflow-auto pr-2">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span className={`inline-block rounded-lg px-3 py-2 ${m.role === "user" ? "bg-green-600 text-white" : "bg-green-100"}`}>
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="rounded-md bg-green-600 text-white px-4 py-2" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
