import type { ReactElement } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
//import CardWrapper from '../ui/dashboard/cards';
import RevenueChart from '../../ui/dashboard/revenue-chart';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import { lusitana } from '../../lib/fonts';
//import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/pages/lib/data';
import { fetchLatestInvoices, fetchCardData, fetchRevenue } from '../..//lib/data';
import DashboardLayout from '@/components/DashboardLayout';
import RootLayout from '@/components/Layout';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '../../ui/skeletons';
import Card from '../../ui/dashboard/cards';
import { NextPageWithLayout } from "../_app";

type CardData = {
  totalPaidInvoices: string
  totalPendingInvoices: string
  numberOfInvoices: number
  numberOfCustomers: number
}

type Revenue = {
  month: string
  revenue: number
}

type LatestInvoice = {
  amount: string
  name: string
  image_url: string
  email: string
  id: string
}

export const getServerSideProps = (async () => {
  const card: CardData = await fetchCardData();
  const revenue: Revenue[] = await fetchRevenue();
  const invoice: LatestInvoice[] = await fetchLatestInvoices();

  return { props: { card, revenue, invoice } }
}) satisfies GetServerSideProps<{ card: CardData, revenue: Revenue[], invoice: LatestInvoice[] }>

const Dashboard: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ card, revenue, invoice }: { card: CardData, revenue: Revenue[], invoice: LatestInvoice[] }) => {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Card title="Collected" value={card.totalPaidInvoices} type="collected" />
          <Card title="Pending" value={card.totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={card.numberOfInvoices} type="invoices" />
          <Card
            title="Total Customers"
            value={card.numberOfCustomers}
            type="customers"
          />
        </Suspense>

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart rev={revenue} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices inv={invoice} />
        </Suspense>
      </div>
    </main>
  );
};

/*
Dashboard.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
*/

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
}

export default Dashboard;