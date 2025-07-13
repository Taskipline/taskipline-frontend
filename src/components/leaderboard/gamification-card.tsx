import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function GamificationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        {/* <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}
