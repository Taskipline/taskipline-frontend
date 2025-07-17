import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import Link from 'next/link'

export default function VerifyAccountPage() {
  if (false) return <Loading />
  //   notify

  if (false) {
    return (
      <div>
        <div className="max-w-sm mx-auto grid gap-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Resend Verification Email</h1>
          <p className="mb-6">
            A new verification link will be sent to your email address.
          </p>
          <CustomInput placeholder="Email Address" />
          <Button className="max-w-sm">Resend Verification Email</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-sm mx-auto grid gap-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Account Verified</h1>
        <p className="mb-6">
          Your account has been successfully verified. You can now log in to
          start using Taskipline.
        </p>
        <Button>
          <Link href="/signin">Signin</Link>
        </Button>
      </div>
    </div>
  )
}
