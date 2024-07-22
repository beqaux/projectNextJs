import { fetchFilteredCustomers, fetchAppointmentsPages } from '@/app/lib/data'
import CustomersTable from '@/app/ui/customers/table'
import { CreateCustomer } from '@/app/ui/customers/buttons'

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string
		page?: string
	}
}) {
	const query = searchParams?.query || ''
	const currentPage = Number(searchParams?.page) || 1

	const totalPages = await fetchAppointmentsPages(query)
	const table = await fetchFilteredCustomers(query)
	return (
		<div className="w-full">
			<div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
				<CreateCustomer />
			</div>
			{/* <div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div> */}
			<CustomersTable customers={table} />
		</div>
	)
}
