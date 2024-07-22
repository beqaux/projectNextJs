// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
export type User = {
	id: string
	name: string
	email: string
	password: string
}

export type Customer = {
	id: string
	name: string
	phone: string
	email: string
}

export type Appointment = {
	id: string
	customer_id: string
	note: string
	date: string
}

export type Revenue = {
	month: string
	appointment: number
}

export type LatestAppointment = {
	id: string
	name: string
	note: string
}

export type AppointmentsTable = {
	id: string
	customer_id: string
	name: string
	note: string
	date: string
}
export type CustomersTableType = {
	id: string
	name: string
	email: string
	phone: string
	total_appointments: number
}

export type FormattedCustomersTable = {
	id: string
	name: string
	email: string
	phone: string
	total_appointments: number
}
export type ModifiedCustomersTable = {
	id: string
	name: string
	phone: string
	email: string
	total_appointments: number
}

export type CustomerField = {
	id: string
	name: string
	email: string
	phone: string
}

export type AppointmentForm = {
	id: string
	customer_id: string
	note: string
}
//take care here it might be problem about id's
export type CustomerForm = {
	id: string
	customer_id: string
	name: string
	phone: string
	email: string
}
