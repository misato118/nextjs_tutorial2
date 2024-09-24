import type { ReactElement } from 'react'
import CardWrapper from '../../lib/ui/dashboard/cards';
import RevenueChart from '../../lib/ui/dashboard/revenue-chart';
import LatestInvoices from '../../lib/ui/dashboard/latest-invoices';
import { lusitana } from '../../lib/ui/fonts';
//import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/pages/lib/data';
//import { fetchLatestInvoices, fetchCardData } from '@/pages/lib/data';
import DashboardLayout from '@/components/DashboardLayout';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '../../lib/ui/skeletons';

export default function Dashboard() {
  //const revenue = await fetchRevenue();
  //const latestInvoices = await fetchLatestInvoices();
  {/*
      const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  */}


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
};

Dashboard.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);