import { createFormHook } from '@tanstack/react-form'

import { InputField } from '@/integrations/tanstack-form/components/input-field'
import { SubscribeButton } from '@/integrations/tanstack-form/components/subscribe-button'
import { fieldContext, formContext } from '@/integrations/tanstack-form/hooks/form-context.tsx'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    Input: InputField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
