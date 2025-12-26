import { PlusIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/integrations/shadcn/components/ui/button'

export function ContactNewBtn() {
  return (
    <Button asChild size="sm" className="ms-auto">
      <Link to="/console/contacts/new">
        <PlusIcon /> New Contact
      </Link>
    </Button>
  )
}
