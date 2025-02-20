import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import { FormattedCustomersTable } from '@/app/lib/definitions'
import { UpdateCustomer, DeleteCustomer } from './buttons'
import { formatPhoneNumber } from '@/app/lib/utils'

export default async function CustomersTable({
	customers,
}: {
	customers: FormattedCustomersTable[]
}) {
	return (
		<div className="w-full">
			<h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
				Customers
			</h1>
			<Search placeholder="Search customers..." />
			<div className="mt-6 flow-root">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
							<div className="md:hidden">
								{customers?.map((customer) => (
									<div
										key={customer.id}
										className="mb-2 w-full rounded-md bg-white p-4"
									>
										<div className="flex items-center justify-between border-b pb-4">
											<div>
												<div className="mb-2 flex items-center">
													<div className="flex items-center gap-3">
														<p>{customer.name}</p>
													</div>
												</div>
												<p className="text-sm text-gray-500">{customer.email}</p>
											</div>
										</div>
										<div className="flex w-full items-center justify-between border-b py-5">
											<div className="flex w-1/2 flex-col">
												<p className="text-xs">Phone Number</p>
												<p className="font-medium"> {customer.phone}</p>
											</div>
										</div>
										<div className="pt-4 text-sm">
											<p>{customer.total_appointments} Total Appointments</p>
										</div>
										<div className="flex justify-end gap-2">
											<UpdateCustomer id={customer.id} />
											<DeleteCustomer id={customer.id} />
										</div>
									</div>
								))}
							</div>
							<table className="hidden min-w-full rounded-md text-gray-900 md:table">
								<thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
									<tr>
										<th
											scope="col"
											className="px-4 py-5 font-medium sm:pl-6"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-5 font-medium"
										>
											Email
										</th>
										<th
											scope="col"
											className="px-3 py-5 font-medium"
										>
											Total Appointments
										</th>
										<th
											scope="col"
											className="px-3 py-5 font-medium"
										>
											Phone Number
										</th>
										<th
											scope="col"
											className="relative py-3 pl-6 pr-3"
										>
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide-gray-200 text-gray-900">
									{customers.map((customer) => (
										<tr
											key={customer.id}
											className="group"
										>
											<td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
												<div className="flex items-center gap-3">
													<p>{customer.name}</p>
												</div>
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.email}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.total_appointments}
											</td>
											<td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
												{customer.phone}
											</td>
											<td className="whitespace-nowrap py-3 pl-6 pr-3">
												<div className="flex justify-end gap-3">
													<UpdateCustomer id={customer.id} />
													<DeleteCustomer id={customer.id} />
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
