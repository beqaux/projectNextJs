import {
	BanknotesIcon,
	ClockIcon,
	UserGroupIcon,
	InboxIcon,
} from '@heroicons/react/24/outline'
import { fetchCardData } from '@/app/lib/data'
import { lusitana } from '../fonts'

const iconMap = {
	collected: BanknotesIcon,
	customers: UserGroupIcon,
	pending: ClockIcon,
	appointments: InboxIcon,
}

export default async function CardWrapper() {
	const { numberOfAppointments, numberOfCustomers } = await fetchCardData()
	return (
		<>
			{/* NOTE: Uncomment this code in Chapter 9 */}
			<Card
				title="Total Appointments"
				value={numberOfAppointments}
				type="Appointments"
			/>
			<Card
				title="Total Customers"
				value={numberOfCustomers}
				type="customers"
			/>
		</>
	)
}

export function Card({
	title,
	value,
	type,
}: {
	title: string
	value: number | string
	type: 'Appointments' | 'customers' | 'pending' | 'collected'
}) {
	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
			<div className="flex p-4">
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p
				className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value}
			</p>
		</div>
	)
}
