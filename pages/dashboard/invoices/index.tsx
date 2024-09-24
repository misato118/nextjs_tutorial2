import type { ReactElement } from 'react'
import DashboardLayout from '@/components/DashboardLayout';

const Invoices = () => {
    return (
      <p>Invoices Page</p>
    );
}

Invoices.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Invoices;