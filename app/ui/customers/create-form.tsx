import { CustomerField } from '@/app/lib/definitions'
import Link from 'next/link'
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import { createCustomer } from '@/app/lib/customers-actions'

export default function Form({ customers }: { customers: CustomerField[] }) {
	return (
		<form action={createCustomer}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Customer Name */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="mb-2 block text-sm font-medium"
					>
						Full name of Customer
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="name"
								name="name"
								type="string"
								placeholder="Name"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				{/* Customer Telephone */}
				<div className="mb-4">
					<label
						htmlFor="phone"
						className="mb-2 block text-sm font-medium"
					>
						Phone number of Customer
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="phone"
								name="phone"
								type="string"
								placeholder="+420 [XXX-XXX-XXX-XXX] without any space or dash"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				{/* Customer Email */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-medium"
					>
						Email of Customer
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="email"
								name="email"
								type="string"
								placeholder="Surname"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>

				{/* Invoice Status */}
				{/* <fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Set the invoice status
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="pending"
									name="status"
									type="radio"
									value="pending"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label
									htmlFor="pending"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
								>
									Pending <ClockIcon className="h-4 w-4" />
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="paid"
									name="status"
									type="radio"
									value="paid"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
								/>
								<label
									htmlFor="paid"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
								>
									Paid <CheckIcon className="h-4 w-4" />
								</label>
							</div>
						</div>
					</div>
				</fieldset> */}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/customers"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">Create Customer</Button>
			</div>
		</form>
	)
}
