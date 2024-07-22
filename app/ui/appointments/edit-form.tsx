'use client'

import { AppointmentForm, CustomerField } from '@/app/lib/definitions'
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { updateAppointment } from '@/app/lib/actions'

export default function EditAppointmentForm({
	appointment,
	customers,
}: {
	appointment: AppointmentForm
	customers: CustomerField[]
}) {
	const updateAppointmentWithId = updateAppointment.bind(null, appointment.id)
	return (
		<form action={updateAppointmentWithId}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Customer Name */}
				<div className="mb-4">
					<label
						htmlFor="customer"
						className="mb-2 block text-sm font-medium"
					>
						Choose customer
					</label>
					<div className="relative">
						<select
							id="customer"
							name="customerId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue={appointment.customer_id}
						>
							<option
								value=""
								disabled
							>
								Select a customer
							</option>
							{customers.map((customer) => (
								<option
									key={customer.id}
									value={customer.id}
								>
									{customer.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
				</div>

				{/* appointment Amount */}
				<div className="mb-4">
					<label
						htmlFor="note"
						className="mb-2 block text-sm font-medium"
					>
						Note
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="note"
								name="note"
								type="string"
								step="note"
								defaultValue={appointment.note}
								placeholder="Change your note"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/appointments"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Edit Appointment</Button>
			</div>
		</form>
	)
}
