import Form from '@/app/ui/appointments/create-form'
import Breadcrumbs from '@/app/ui/appointments/breadcrumbs'
import { fetchCustomers } from '@/app/lib/data'

export default async function Page() {
	const customers = await fetchCustomers()

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Appointments', href: '/dashboard/appointments' },
					{
						label: 'Create Appointment',
						href: '/dashboard/appointments/create',
						active: true,
					},
				]}
			/>
			<Form customers={customers} />
		</main>
	)
}
