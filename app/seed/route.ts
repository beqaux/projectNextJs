import bcrypt from 'bcrypt'
import { db } from '@vercel/postgres'
import {
	appointments,
	customers,
	revenue,
	users,
} from '../lib/placeholder-data'

const client = await db.connect()

async function seedUsers() {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
	await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `

	const insertedUsers = await Promise.all(
		users.map(async (user) => {
			const hashedPassword = await bcrypt.hash(user.password, 10)
			return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `
		})
	)

	return insertedUsers
}

async function seedAppointments() {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

	await client.sql`
    CREATE TABLE IF NOT EXISTS appointments	 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      note VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `

	const insertedAppointments = await Promise.all(
		appointments.map(
			(appointment) => client.sql`
        INSERT INTO appointments (customer_id, note, date)
        VALUES (${appointment.customer_id}, ${appointment.note}, ${appointment.date})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	)

	return insertedAppointments
}

async function seedCustomers() {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

	await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL
    );
  `

	const insertedCustomers = await Promise.all(
		customers.map(
			(customer) => client.sql`
        INSERT INTO customers (id, name, email, phone)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.phone})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	)

	return insertedCustomers
}

async function seedRevenue() {
	await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      appointment INT NOT NULL
    );
  `

	const insertedRevenue = await Promise.all(
		revenue.map(
			(rev) => client.sql`
        INSERT INTO revenue (month, appointment)
        VALUES (${rev.month}, ${rev.appointment})
        ON CONFLICT (month) DO NOTHING;
      `
		)
	)

	return insertedRevenue
}

export async function GET() {
	try {
		await client.sql`BEGIN`
		await seedUsers()
		await seedCustomers()
		await seedAppointments()
		await seedRevenue()
		await client.sql`COMMIT`

		return Response.json({ message: 'Database seeded successfully' })
	} catch (error) {
		await client.sql`ROLLBACK`
		return Response.json({ error }, { status: 500 })
	}
}
