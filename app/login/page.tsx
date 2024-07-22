import AcmeLogo from '@/app/ui/acme-logo'
import LoginForm from '@/app/ui/login-form'

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex item w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex h-20 w-full flex-auto items-center rounded-lg bg-blue-500 p-3 md:h-48">
					<div className="w-32 text-white md:w-96 flex flex-col-reverse">
						Dye Controller
					</div>
				</div>
				<LoginForm />
			</div>
		</main>
	)
}
