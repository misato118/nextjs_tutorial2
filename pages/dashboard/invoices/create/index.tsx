import type { ReactElement } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Form from '../../../../ui/invoices/create-form';
import Breadcrumbs from '../../../../ui/invoices/breadcrumbs';
import { fetchCustomers } from '../../../../lib/data';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { NextPageWithLayout } from "../../../_app";

type Customer = {
    id: string
    name: string
}

export const getServerSideProps = (async () => {
    const customer: Customer[] = await fetchCustomers();
  
    return { props: { customer } }
  }) satisfies GetServerSideProps<{ customer: Customer[] }>
 
const Create: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ customer }: { customer: Customer[] }) =>  {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customer} />
    </main>
  );
}

Create.getLayout = function getLayout(page: ReactElement) {
    return (
      <DashboardLayout>{page}</DashboardLayout>
    );
  };
  
export default Create;