import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="blue" className={className}>
      <span className="font-semibold">Attention:</span>Payment details will be sent in email
    </Badge>
  )
}

export default PaymentTest
