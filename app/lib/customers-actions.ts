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

const CreateCustomer = z.object({
	name: z.string(),
	phone: z.string(),
	email: z.string(),
})

export async function createCustomer(formData: FormData) {
	const { name, phone, email } = CreateCustomer.parse({
		name: formData.get('name'),
		phone: formData.get('phone'),
		email: formData.get('email'),
	})

	try {
		await sql`
        INSERT INTO customers (name, phone, email)
        VALUES (${name}, ${phone}, ${email}})
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
	const { customerId, name, phone, email } = FormSchema.parse({
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
