import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

// Schemas
const CreateCustomerSchema = z.object({
	name: z.string(),
	phone: z.string(),
	email: z.string().email(),
})

const UpdateCustomerSchema = z.object({
	id: z.string(),
	name: z.string(),
	phone: z.string(),
	email: z.string().email(),
})

export async function POST(request: NextRequest) {
	const formData = await request.formData()

	const customerData = {
		name: formData.get('name') as string,
		phone: formData.get('phone') as string,
		email: formData.get('email') as string,
	}

	try {
		const { name, phone, email } = CreateCustomerSchema.parse(customerData)

		await sql`
			INSERT INTO customers (name, phone, email)
			VALUES (${name}, ${phone}, ${email})
		`

		revalidatePath('/dashboard/customers')
		return NextResponse.redirect(new URL('/dashboard/customers', request.url))
	} catch (error) {
		console.error('Error creating customer:', error)
		return NextResponse.json(
			{
				message: 'Database Error: Failed to Create Customer.',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}

export async function PUT(request: NextRequest) {
	const formData = await request.formData()

	const customerData = {
		id: formData.get('id') as string,
		name: formData.get('name') as string,
		phone: formData.get('phone') as string,
		email: formData.get('email') as string,
	}

	try {
		const { id, name, phone, email } = UpdateCustomerSchema.parse(customerData)

		await sql`
			UPDATE customers
			SET name = ${name}, phone = ${phone}, email = ${email}
			WHERE id = ${id}
		`

		revalidatePath('/dashboard/customers')
		return NextResponse.redirect(new URL('/dashboard/customers', request.url))
	} catch (error) {
		console.error('Error updating customer:', error)
		return NextResponse.json(
			{
				message: 'Database Error: Failed to Update Customer.',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
