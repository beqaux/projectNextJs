'use client'

import Link from 'next/link'
import { Button } from '@/app/ui/button'

export default function Form() {
	return (
		<form
			action="/api/customers"
			method="post"
		>
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
								type="text"
								placeholder="Name"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								required
							/>
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
								type="text"
								placeholder="+420 [XXX-XXX-XXX-XXX] without any space or dash"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								required
							/>
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
								type="email"
								placeholder="Email"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								required
							/>
						</div>
					</div>
				</div>
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
