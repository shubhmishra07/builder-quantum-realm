import { Link } from "react-router-dom";
import { ScanLine, CloudSun, IndianRupee, MapPin, MessageCircle, Sprout } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="grid gap-10">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-green-100 via-emerald-100 to-amber-100 p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs border">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live demo
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-green-800">
              {t.heroHeading}
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-prose">
              {t.heroSub}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white shadow hover:bg-green-700"
              >
                <ScanLine className="h-5 w-5" /> {t.scanNow}
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 bg-white/80 hover:bg-white"
              >
                <MessageCircle className="h-5 w-5" /> Chatbot
              </Link>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="ml-auto rounded-md border bg-white/80 px-3 py-2 text-sm"
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-emerald-300/60 blur-2xl" />
            <div className="absolute -left-6 -bottom-10 h-40 w-40 rounded-full bg-amber-300/60 blur-2xl" />
            <div className="relative rounded-xl border bg-white/70 p-4 backdrop-blur shadow-lg">
              <div className="grid grid-cols-3 gap-3">
                {["Soil", "Seeds", "Leaves"].map((x) => (
                  <div key={x} className="rounded-lg border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Scan</p>
                    <p className="font-semibold">{x}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border p-3 bg-green-50">
                <p className="text-sm"><span className="font-medium">Tip:</span> Use natural light for best results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-green-800">Everything a farmer needs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon={<ScanLine className="h-5 w-5" />} title="Scan & Analyze" desc="Detect soil type, seed quality and crop diseases using AI." to="/scan" />
          <FeatureCard icon={<CloudSun className="h-5 w-5" />} title="Crop Advisory" desc="Personalized irrigation and sowing guidance with weather." to="/advisory" />
          <FeatureCard icon={<IndianRupee className="h-5 w-5" />} title="Mandi Prices & MSP" desc="Daily mandi prices and government MSP by crop and region." to="/mandi" />
          <FeatureCard icon={<Sprout className="h-5 w-5" />} title="Soil & Storage" desc="Fertilizer suggestions and storage best practices." to="/storage" />
          <FeatureCard icon={<MapPin className="h-5 w-5" />} title="Nearby Mandis & Shops" desc="Find fertilizer shops, mandis and warehouses on map." to="/mandi" />
          <FeatureCard icon={<MessageCircle className="h-5 w-5" />} title="AI Chatbot" desc="Ask questions in Hindi/English with voice support." to="/chat" />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Today’s Mandi Snapshot</h3>
            <Link to="/mandi" className="text-sm text-green-700 hover:underline">View all</Link>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { crop: "Wheat", price: "₹2,250/q", place: "Karnal, HR" },
              { crop: "Rice", price: "₹2,350/q", place: "Raipur, CG" },
              { crop: "Maize", price: "₹2,000/q", place: "Nashik, MH" },
              { crop: "Bajra", price: "₹1,900/q", place: "Jaipur, RJ" },
            ].map((m) => (
              <div key={m.crop} className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">{m.place}</p>
                <p className="font-semibold">{m.crop}</p>
                <p className="text-green-700 font-medium">{m.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Connect Agmarknet/FCI API for live prices.</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold">Get started in 3 steps</h3>
          <ol className="mt-2 grid gap-2 list-decimal list-inside text-sm">
            <li>Open Scan & upload a clear photo</li>
            <li>See instant AI results and treatment advice</li>
            <li>Ask chatbot for help in your language</li>
          </ol>
          <Link
            to="/scan"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            <ScanLine className="h-4 w-4" /> {t.scanNow}
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, to }: { icon: React.ReactNode; title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-green-600 text-white grid place-items-center">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-green-700 opacity-0 group-hover:opacity-100">Open →</div>
    </Link>
  );
}
