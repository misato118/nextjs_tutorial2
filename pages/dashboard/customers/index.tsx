import type { ReactElement } from 'react'
import DashboardLayout from '@/components/DashboardLayout';

const Customers = () => {
    return (
      <p>Customers Page</p>
    );
}

Customers.getLayout = (page: ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Customers;