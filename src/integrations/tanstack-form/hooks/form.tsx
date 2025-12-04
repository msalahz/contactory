import { createFormHook } from '@tanstack/react-form'

import { fieldContext, formContext } from './form-context.tsx'
import { InputField } from '@/integrations/tanstack-form/components/input-field'
import { SubscribeButton } from '@/integrations/tanstack-form/components/subscribe-button'

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
