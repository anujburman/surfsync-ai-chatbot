"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
type Message = { role: "user" | "assistant"; content: string };
const starters = ["What services do you offer?", "How long does a project take?", "I need an ecommerce website", "Request a project consultation"];
const initial: Message = { role: "assistant", content: "Hello! I’m SurfSync’s AI business assistant. I can explain services, technologies, project process and help you submit a project enquiry." };
export default function Home() {
    const [messages, setMessages] = useState<Message[]>([initial]); const [text, setText] = useState(""); const [busy, setBusy] = useState(false); const [lead, setLead] = useState(false); const end = useRef<HTMLDivElement>(null);
    useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [messages, busy]);
    async function send(value = text) {
        const q = value.trim(); if (!q || busy) return; const next = [...messages, { role: "user" as const, content: q }]; setMessages(next); setText(""); setBusy(true); try { const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-12) }) }); const d = await r.json(); if (!r.ok) throw new Error(d.error); setMessages(m => [...m, { role: "assistant", content: d.answer }]); }
            catch (error) {
                const message =
                    error instanceof Error && error.message
                        ? error.message
                        : "I’m sorry, the assistant is temporarily unavailable. Please try again or contact info@surfsyncinfotech.in.";

                setMessages((current) => [
                    ...current,
                    {
                        role: "assistant",
                        content: message,
                    },
                ]);
            }
            finally { setBusy(false) }
    }
    return <main><section className="shell"><header><div><b>SurfSync Infotech</b><span>AI Business Assistant</span></div><button className="ghost" onClick={() => { setMessages([initial]); setLead(false) }}>Restart</button></header>
        <div className="messages" aria-live="polite">{messages.map((m, i) => <div key={i} className={`msg ${m.role}`}>{m.content}</div>)}{busy && <div className="msg assistant dots">Thinking…</div>}<div ref={end} /></div>
        {messages.length < 3 && <div className="chips">{starters.map(x => <button key={x} onClick={() => x.includes("consultation") ? setLead(true) : send(x)}>{x}</button>)}</div>}
        <div className="actions"><button className="leadBtn" onClick={() => setLead(true)}>Submit project enquiry</button></div>
        <form className="composer" onSubmit={(e) => { e.preventDefault(); send() }}><input aria-label="Message" value={text} maxLength={1000} onChange={e => setText(e.target.value)} placeholder="Ask about services, timelines or technologies…" /><button disabled={busy || !text.trim()}>Send</button></form>
        <p className="note">AI responses may require company confirmation. Do not share passwords or financial information.</p></section>{lead && <LeadForm close={() => setLead(false)} />}</main>
}
function LeadForm({ close }: { close: () => void }) {
    const [status, setStatus] = useState(""); async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setStatus("Submitting…"); const f = new FormData(e.currentTarget); const body = Object.fromEntries(f.entries()); try { const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const d = await r.json(); if (!r.ok) throw new Error(d.error); setStatus("Thank you. Your enquiry has been saved and the SurfSync team can follow up."); (e.target as HTMLFormElement).reset(); } catch (err) { setStatus(err instanceof Error ? err.message : "Submission failed. Please try again.") } }
    return <div className="modal"><form className="lead" onSubmit={submit}><div className="leadHead"><h2>Project enquiry</h2><button type="button" onClick={close}>×</button></div><label>Name<input name="name" required maxLength={80} /></label><label>Email<input name="email" type="email" required maxLength={120} /></label><label>Phone<input name="phone" type="tel" required pattern="[+0-9 ()-]{7,20}" /></label><label>Required service<select name="service" required defaultValue=""><option value="" disabled>Select</option><option>Website Development</option><option>Mobile App Development</option><option>AI and Automation</option><option>Digital Marketing</option><option>Ecommerce Solutions</option><option>Enterprise Software</option><option>Other IT Services</option></select></label><label>Project description<textarea name="description" required minLength={10} maxLength={2000} /></label><label>Estimated budget<input name="budget" maxLength={80} placeholder="Optional" /></label><label>Expected timeline<input name="timeline" maxLength={80} placeholder="Optional" /></label><label className="consent"><input type="checkbox" name="consent" value="true" required /> I consent to SurfSync storing and using these details to respond to my enquiry.</label><button className="submit">Submit enquiry</button>{status && <p className="status">{status}</p>}</form></div>
}
