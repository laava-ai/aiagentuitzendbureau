import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Agent ROI Calculator | Bereken uw besparingen',
  description: 'Bereken hoeveel tijd en geld uw bedrijf kan besparen door onze AI-agenten te implementeren in uw klantenservice team.',
  openGraph: {
    title: 'AI-Agent ROI Calculator',
    description: 'Bereken uw potentiële besparingen met AI-ondersteuningsagenten',
    type: 'website',
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
} 