import { sql } from '@vercel/postgres'
import {
	AppointmentForm,
	AppointmentsTable,
	CustomerField,
	CustomerForm,
	CustomersTableType,
	LatestAppointment,
	Revenue,
} from './definitions'
import { formatPhoneNumber } from './utils'

export async function fetchRevenue() {
	try {
		const data = await sql<Revenue>`SELECT * FROM revenue`
		return data.rows
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch revenue data.')
	}
}

export async function fetchLatestAppointments() {
	try {
		const data = await sql<LatestAppointment>`
      SELECT appointments.id, appointments.note, appointments.date, customers.name, customers.phone, customers.email
      FROM appointments
      JOIN customers ON appointments.customer_id = customers.id
      ORDER BY appointments.date DESC
      LIMIT 5`
		return data.rows
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch the latest appointments.')
	}
}

export async function fetchCardData() {
	try {
		const appointmentCountPromise = sql`SELECT COUNT(*) FROM appointments`
		const customerCountPromise = sql`SELECT COUNT(*) FROM customers`

		const data = await Promise.all([
			appointmentCountPromise,
			customerCountPromise,
		])

		const numberOfAppointments = Number(data[0].rows[0].count ?? '0')
		const numberOfCustomers = Number(data[1].rows[0].count ?? '0')

		return {
			numberOfCustomers,
			numberOfAppointments,
		}
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch card data.')
	}
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredAppointments(
	query: string,
	currentPage: number
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE

	try {
		const appointments = await sql<AppointmentsTable>`
      SELECT
        appointments.id,
        appointments.note,
        appointments.date,
        customers.name,
        customers.email,
        customers.phone
      FROM appointments
      JOIN customers ON appointments.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        appointments.note::text ILIKE ${`%${query}%`} OR
        appointments.date::text ILIKE ${`%${query}%`}
      ORDER BY appointments.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

		return appointments.rows
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch appointments.')
	}
}

export async function fetchAppointmentsPages(query: string) {
	try {
		const count = await sql`SELECT COUNT(*)
    FROM appointments
    JOIN customers ON appointments.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      appointments.note::text ILIKE ${`%${query}%`} OR
      appointments.date::text ILIKE ${`%${query}%`}
  `

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
		return totalPages
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch total number of appointments.')
	}
}

export async function fetchAppointmentById(id: string) {
	try {
		const data = await sql<AppointmentForm>`
      SELECT
        appointments.id,
        appointments.customer_id,
        appointments.note,
        appointments.date
      FROM appointments
      WHERE appointments.id = ${id};
    `

		return data.rows[0]
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch appointment.')
	}
}

export async function fetchCustomers() {
	try {
		const data = await sql<CustomerField>`
      SELECT
        id,
        name,
		email,
		phone
      FROM customers
      ORDER BY name ASC
    `
		return data.rows
	} catch (err) {
		console.error('Database Error:', err)
		throw new Error('Failed to fetch all customers.')
	}
}

export async function fetchFilteredCustomers(query: string) {
	try {
		const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.phone,
		  COUNT(appointments.id) AS total_appointments
		FROM customers
		LEFT JOIN appointments ON customers.id = appointments.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email
		ORDER BY customers.name ASC
	  `

		const filteredCustomers = data.rows.map((customer) => ({
			...customer,
			phone: formatPhoneNumber(customer.phone),
		}))
		return filteredCustomers
	} catch (err) {
		console.error('Database Error:', err)
		throw new Error('Failed to fetch customer table.')
	}
}

export async function fetchModifiedCustomers(query: string) {
	try {
		const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  COUNT(appointments.id) AS total_appointments
		FROM customers
		LEFT JOIN appointments ON customers.id = appointments.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email
		ORDER BY customers.name ASC
	  `
		return data.rows
	} catch (err) {
		console.error('Database Error:', err)
		throw new Error('Failed to fetch customer table.')
	}
}

export async function fetchCustomerById(customerId: string) {
	try {
		const data = await sql<CustomerForm>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.phone
      FROM customers
      WHERE customers.id = ${customerId};
    `
		return data.rows[0]
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch customer.')
	}
}
