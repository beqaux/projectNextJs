'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { randomUUID } from 'crypto'

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	name: z.string(),
	phone: z.string(),
	email: z.string(),
	date: z.string(),
})

const CreateCustomer = FormSchema.omit({ id: true, date: true })
const UpdateCustomer = FormSchema.omit({ id: true, date: true })

export async function createCustomer(formData: FormData) {
	const { name, phone, email } = CreateCustomer.parse({
		name: formData.get('name'),
		phone: formData.get('phone'),
		email: formData.get('email'),
	})

	const customerId = randomUUID()
	const date = new Date().toISOString().split('T')[0]

	try {
		await sql`
        INSERT INTO customers (customer_id, name, phone, email, date)
        VALUES (${customerId}, ${name}, ${phone}, ${email}, ${date})
        `
	} catch (error) {
		return {
			message: 'Database Error: Failed to Create Customer.',
		}
	}

	revalidatePath('/dashboard/customers')
	redirect('/dashboard/customers')
}

export async function updateCustomer(id: string, formData: FormData) {
	const { customerId, name, phone, email } = UpdateCustomer.parse({
		customerId: formData.get('customerId'),
		name: formData.get('name'),
		phone: formData.get('phone'),
		email: formData.get('email'),
	})

	try {
		await sql`
        UPDATE customers
        SET customer_id = ${customerId}, name = ${name}, phone = ${phone}, email = ${email}
        WHERE id = ${id}
        `
	} catch (error) {
		return { message: 'Database Error: Failed to Update Customer.' }
	}

	revalidatePath('/dashboard/customers')
	redirect('/dashboard/customers')
}

export async function deleteCustomer(id: string) {
	try {
		await sql`DELETE FROM customers WHERE id = ${id}`
		revalidatePath('/dashboard/customers')
		return { message: 'Deleted Customer.' }
	} catch (error) {
		return { message: 'Database Error: Failed to Delete Customer.' }
	}
}

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn('credentials', formData)
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.'
				default:
					return 'Something went wrong.'
			}
		}
		throw error
	}
}
