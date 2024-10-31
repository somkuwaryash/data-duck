'use client';

import dynamic from 'next/dynamic';

const DocumentManagementPage = dynamic(() => import('@/components/DocumentManagementPage'), { ssr: false });

export default function Page() {
  return <DocumentManagementPage />;
}