import { ScanUploader } from "@/components/kisan/ScanUploader";

export default function Scan() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">Scan & Analyze</h1>
        <p className="text-muted-foreground">Upload or capture a photo of soil, seeds, crops or leaves to get instant AI analysis.</p>
      </div>
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <ScanUploader />
      </div>
    </div>
  );
}
