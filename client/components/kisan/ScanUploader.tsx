import { useRef, useState } from "react";
import { mockAnalyzeImage, type AnalysisResult, type AnalysisType } from "@/lib/analysis";
import { Camera, Upload, Volume2 } from "lucide-react";

export function ScanUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [type, setType] = useState<AnalysisType>("auto");
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file?: File | null) => {
    if (!file) return;
    setResult(null);
    const url = URL.createObjectURL(file);
    setImage(url);
    setLoading(true);
    try {
      const r = await mockAnalyzeImage(file, type);
      setResult(r);
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(r.summary);
        speechSynthesis.speak(utter);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    onFile(f);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {(["auto", "soil", "seed", "crop"] as AnalysisType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              type === t ? "bg-green-600 text-white border-green-600" : "hover:bg-green-100"
            }`}
          >
            {t === "auto" ? "Auto" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-green-100 to-amber-100 grid place-items-center">
            {image ? (
              <img src={image} alt="preview" className="h-full w-full object-contain" />
            ) : (
              <div className="text-center text-muted-foreground">
                <p className="font-medium">Upload or capture a photo</p>
                <p className="text-sm">Soil, seeds, leaves, crops</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-green-50">
              <Upload className="h-4 w-4" />
              <span>Upload Photo</span>
              <input
                ref={inputRef}
                onChange={handleCapture}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
            <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-green-50">
              <Camera className="h-4 w-4" />
              <span>Use Camera</span>
              <input
                onChange={handleCapture}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
              />
            </label>
            {result && (
              <button
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-green-50"
                onClick={() => {
                  if (!result) return;
                  if ("speechSynthesis" in window) {
                    const utter = new SpeechSynthesisUtterance(result.summary);
                    speechSynthesis.speak(utter);
                  }
                }}
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Results</h3>
          {!result && !loading && (
            <p className="text-sm text-muted-foreground">No analysis yet. Add a photo to begin.</p>
          )}
          {loading && (
            <div className="grid gap-2 animate-pulse">
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-24 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded" />
            </div>
          )}
          {result && !loading && (
            <div className="grid gap-3">
              <div className="rounded-lg border p-3 bg-green-50 border-green-200">
                <p className="font-medium">Summary</p>
                <p className="text-sm mt-1">{result.summary}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.cards.map((c, i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.title}</p>
                    <p className="font-semibold mt-1">{c.value}</p>
                    {c.details && <p className="text-sm mt-1 text-muted-foreground">{c.details}</p>}
                  </div>
                ))}
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Connect AI API</p>
                <p className="text-sm mt-1">
                  Replace mock analysis with your Roboflow/HuggingFace endpoint by adding a server route
                  that proxies to your model. Ensure to keep keys server-side.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
