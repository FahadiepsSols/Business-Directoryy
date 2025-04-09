// app/components/BusinessListWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const BusinessList = dynamic(() => import('./BusinessList'), {
  loading: () => <p className="text-center mt-10">Loading businesses...</p>,
});

export default function BusinessListWrapper() {
  return <BusinessList />;
}
