import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '../fonts';
//import { fetchCardData } from '../../data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

{/*
const CardWrapper = () => {
  const [totalPaidInvoices, setTotalPaidInvoices] = useState('');
  const [totalPendingInvoices, setTotalPendingInvoices] = useState('');
  const [numberOfInvoices, setNumberOfInvoices] = useState(0);
  const [numberOfCustomers, setNumberOfCustomers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { 
        totalPaidInvoices,
        totalPendingInvoices,
        numberOfInvoices,
        numberOfCustomers
      } = await fetchCardData();
      setTotalPaidInvoices(totalPaidInvoices);
      setTotalPendingInvoices(totalPendingInvoices);
      setNumberOfInvoices(numberOfInvoices);
      setNumberOfCustomers(numberOfCustomers);
    }
    fetchData();
  }, []);

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}  
*/}

{/*
export default async function CardWrapper({
  paid,
  pending,
  invoices,
  customers
}: {
  paid: string;
  pending: string;
  invoices: number;
  customers: number;
}) {
  const { 
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers
  } = await fetchCardData();

  return (
    <>
      //NOTE: Uncomment this code in Chapter 9

      <Card title="Collected" value={paid} type="collected" />
      <Card title="Pending" value={pending} type="pending" />
      <Card title="Total Invoices" value={invoices} type="invoices" />
      <Card
        title="Total Customers"
        value={customers}
        type="customers"
      />
    </>
  );
}
*/}

export default function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

//export default CardWrapper;
