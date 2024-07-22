import Form from '@/app/ui/appointments/edit-form'
import Breadcrumbs from '@/app/ui/appointments/breadcrumbs'
import { fetchAppointmentById, fetchCustomers } from '@/app/lib/data'

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id
	const [appointment, customers] = await Promise.all([
		fetchAppointmentById(id),
		fetchCustomers(),
	])
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Appointments', href: '/dashboard/appointments' },
					{
						label: 'Edit Appoinment',
						href: `/dashboard/appointments/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form
				appointment={appointment}
				customers={customers}
			/>
		</main>
	)
}
