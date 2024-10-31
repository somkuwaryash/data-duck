import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const AnalysisPageClient = dynamic(() => import('@/components/AnalysisPage'), { ssr: false });

export default function AnalyzePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalysisPageClient />
    </Suspense>
  );
}