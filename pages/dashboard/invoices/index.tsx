import type { ReactElement } from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import Pagination from '../../../ui/invoices/pagination';
import Search from '../../../ui/search';
//import Table from '../../../ui/invoices/table';
import { CreateInvoice } from '../../../ui/invoices/buttons';
import { lusitana } from '../../../lib/fonts';
import { InvoicesTableSkeleton } from '../../../ui/skeletons';
import { Suspense } from 'react';
import { NextPageWithLayout } from "../../_app";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { fetchFilteredInvoices, fetchInvoicesPages } from '../../../lib/data';
//import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { encode } from 'querystring'
import Image from 'next/image';
//import { UpdateInvoice, DeleteInvoice } from '../../../ui/invoices/buttons';
import { UpdateInvoice } from '../../../ui/invoices/buttons';
import InvoiceStatus from '../../../ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '../../../lib/utils';

type FilteredInvoices = {
  id: string
  amount: number
  date: string
  status: 'pending' | 'paid';
  name: string
  email: string
  image_url: string
}

export const getServerSideProps = (async (context) => {
  const encodedQuery = encode(context.query);
  const params = new URLSearchParams(encodedQuery);

  const query = params.get('query') || '';
  const page = Number(params.get('page')) ? Number(params.get('page')) : 1;

  const totalPages = await fetchInvoicesPages(query);

  const invoices: FilteredInvoices[] = await fetchFilteredInvoices(query, page);

  return { props: { invoices: JSON.parse(JSON.stringify(invoices)), query, page, totalPages } }
}) satisfies GetServerSideProps<{ invoices: FilteredInvoices[], query: string, page: number, totalPages: number }>

const Invoices: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  invoices, query, page, totalPages
}: { invoices: FilteredInvoices[], query: string, page: number, totalPages: number }) => 
{
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={query + page} fallback={<InvoicesTableSkeleton />}>
        {/*<Table query={query} currentPage={currentPage} />*/}
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Image
                            src={invoice.image_url}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${invoice.name}'s profile picture`}
                          />
                          <p>{invoice.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{invoice.email}</p>
                      </div>
                      <InvoiceStatus status={invoice.status} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <p>{formatDateToLocal(invoice.date)}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <UpdateInvoice id={invoice.id} />
                        {/*<DeleteInvoice id={invoice.id} />*/}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {invoices?.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={invoice.image_url}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${invoice.name}'s profile picture`}
                          />
                          <p>{invoice.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <InvoiceStatus status={invoice.status} />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateInvoice id={invoice.id} />
                          {/*<DeleteInvoice id={invoice.id} />*/}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

Invoices.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  );
};

export default Invoices;