export function SiteFooter() {
  return (
    <footer className="border-t bg-background/60">
      <div className="container px-4 md:px-6 py-8 grid gap-6 md:grid-cols-3 items-center">
        <div>
          <p className="font-semibold text-green-700">Kisan AI Assistant</p>
          <p className="text-sm text-muted-foreground">Empowering Indian farmers with AI insights.</p>
        </div>
        <div className="text-sm text-muted-foreground md:text-center">
          <p>
            Built for education and assistance. Connect real APIs for production.
          </p>
        </div>
        <div className="md:text-right text-sm">
          <a className="hover:underline" href="/scan">Scan Now</a>
          <span className="mx-2">•</span>
          <a className="hover:underline" href="/mandi">Mandi Prices</a>
          <span className="mx-2">•</span>
          <a className="hover:underline" href="/chat">Chatbot</a>
        </div>
      </div>
    </footer>
  );
}
