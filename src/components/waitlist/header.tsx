import Button from '../UI/button'
import TaskiplineLogo from '../UI/Icons/taskipline-logo'

export default function WaitlistHeader() {
  return (
    <nav className="py-10 px-3 flex">
      <div className="flex items-center gap-x-4">
        <TaskiplineLogo />
        <h1 className="text-[18px] leading-[23px] font-bold">Taskipline</h1>
      </div>
      <div className="flex-1 flex justify-end gap-x-8">
        <ul className="flex items-center gap-x-9">
          <li>
            <a href="#" className="text-sm leading-[21px] font-medium">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="text-sm leading-[21px] font-medium">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="text-sm leading-[21px] font-medium">
              Resources
            </a>
          </li>
        </ul>
        <Button variant="secondary">Log in</Button>
      </div>
    </nav>
  )
}
