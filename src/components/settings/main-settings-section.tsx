import { Edit } from 'lucide-react'
import Title from '../title'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { CustomInput } from '../ui/input'

export default function MainSettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Profile" type="sub-heading-2" />
      <div className="bg-secondary size-20 rounded-full flex items-center justify-center">
        <UpdateProfilePictureDialog />
      </div>
      <div className="flex gap-4 max-w-sm">
        <CustomInput
          label="First Name"
          htmlFor="first-name"
          placeholder="Enter your email"
          value={'Ayomide'}
          disabled
        />
        <CustomInput
          label="Last Name"
          htmlFor="last-name"
          placeholder="Enter your email"
          value={'Akintan'}
          disabled
        />
      </div>
      <CustomInput
        label="Email"
        htmlFor="email"
        placeholder="Enter your email"
        value={'emzyakints2005@gmail.com'}
        disabled
      />
      <UpdateProfileDialog />
    </section>
  )
}

function UpdateProfileDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <CustomInput
                label="First Name"
                htmlFor="first-name"
                placeholder="Enter your first name"
                value={'Ayomide'}
              />
              <CustomInput
                label="Last Name"
                htmlFor="last-name"
                placeholder="Enter your last name"
                value={'Akintan'}
              />
            </div>
            <CustomInput
              label="Email"
              htmlFor="email"
              placeholder="Enter your email"
              value={'emzyakints2005@gmail.com'}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

function UpdateProfilePictureDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Edit className="size-5 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture or update the existing one.
          </DialogDescription>
        </DialogHeader>
        <CustomInput htmlFor="picture" type="file" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
