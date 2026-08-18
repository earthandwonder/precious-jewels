import PageviewTracker from "@/components/PageviewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { LocaleProvider } from "@/components/LocaleProvider";
import LanguagePicker from "@/components/LanguagePicker";
import { t, type Locale } from "@/lib/i18n";

export default function AppShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <PageviewTracker />
      <ScrollDepthTracker />
      {children}
      <LanguagePicker />
      <footer style={{ position: "fixed", bottom: 12, right: 16, zIndex: 10, fontFamily: "var(--font-jakarta-sans)", fontSize: 11, letterSpacing: "0.03em" }}>
        <a href="https://benmccarthy.com.au" style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 1 }}>{t(locale, "footer_author")}</a>
      </footer>
      {/* @ts-expect-error web component */}
      <bm-capture
        mode="relationship"
        source="rarest-gemstones"
        variant="invite-a"
        reveal-at="captureReveal"
        expand-at="captureExpand"
        theme="dark"
        genesis={t(locale, "capture_genesis")}
      />
      <script src="https://benmccarthy.com.au/shared/capture.js" defer />
    </LocaleProvider>
  );
}
