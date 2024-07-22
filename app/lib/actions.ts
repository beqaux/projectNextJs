'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	note: z.string(),
	date: z.string(),
})

const CreateAppointment = FormSchema.omit({ id: true, date: true })
const UpdateAppointment = FormSchema.omit({ id: true, date: true })

export async function createAppointment(formData: FormData) {
	const { customerId, note } = CreateAppointment.parse({
		customerId: formData.get('customerId'),
		note: formData.get('note'),
	})

	const date = new Date().toISOString().split('T')[0]

	try {
		await sql`
        INSERT INTO appointments (customer_id, note, date)
        VALUES (${customerId}, ${note}, ${date})
        `
	} catch (error) {
		return {
			message: 'Database Error: Failed to Create Appointment.',
		}
	}

	revalidatePath('/dashboard/appointments')
	redirect('/dashboard/appointments')
}

export async function updateAppointment(id: string, formData: FormData) {
	const { customerId, note } = UpdateAppointment.parse({
		customerId: formData.get('customerId'),
		note: formData.get('note'),
	})

	try {
		await sql`
        UPDATE appointments
        SET customer_id = ${customerId}, note = ${note}
        WHERE id = ${id}
        `
	} catch (error) {
		return { message: 'Database Error: Failed to Update Appointment.' }
	}

	revalidatePath('/dashboard/appointments')
	redirect('/dashboard/appointments')
}

export async function deleteAppointment(id: string) {
	try {
		await sql`DELETE FROM appointments WHERE id = ${id}`
		revalidatePath('/dashboard/appointments')
		return { message: 'Deleted Appointment.' }
	} catch (error) {
		return { message: 'Database Error: Failed to Delete Appointment.' }
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
