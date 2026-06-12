import { strings } from "@/lib/i18n/strings";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

const GROUPS: {
  title: string;
  items: { title: string; text: string; icon: string }[];
}[] = [
  {
    title: strings.futureFeaturesPage.groups.capture,
    items: [
      { ...strings.placeholders.barcodeScanner, icon: "📷" },
      { ...strings.placeholders.labelScanner, icon: "🏷️" },
      { ...strings.placeholders.voiceLogging, icon: "🎤" },
      { ...strings.placeholders.mealPhoto, icon: "🍽️" },
    ],
  },
  {
    title: strings.futureFeaturesPage.groups.assistance,
    items: [
      { ...strings.placeholders.aiAssistant, icon: "🤖" },
      { ...strings.placeholders.verifiedDatabase, icon: "✅" },
      { ...strings.placeholders.consultationScheduling, icon: "🗓️" },
      { ...strings.placeholders.recipes, icon: "📖" },
    ],
  },
  {
    title: strings.futureFeaturesPage.groups.payments,
    items: [
      { ...strings.placeholders.mpesa, icon: "📱" },
      { ...strings.placeholders.emola, icon: "📱" },
      { ...strings.placeholders.mkesh, icon: "📱" },
      { ...strings.placeholders.stripe, icon: "💳" },
    ],
  },
  {
    title: strings.futureFeaturesPage.groups.management,
    items: [
      { ...strings.placeholders.adminDashboard, icon: "🛠️" },
      { ...strings.placeholders.weeklyReport, icon: "📊" },
      { ...strings.placeholders.savedFoods, icon: "⭐" },
      { ...strings.placeholders.hydration, icon: "💧" },
      { ...strings.placeholders.offlineSync, icon: "🔄" },
    ],
  },
];

export default function FutureFeaturesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.futureFeaturesPage.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.futureFeaturesPage.subtitle}
      </p>

      <div className="mt-6 flex flex-col gap-8">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="font-semibold text-brand-800">{group.title}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <PlaceholderFeature key={item.title} {...item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
