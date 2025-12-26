import { createFormHook } from '@tanstack/react-form'

import { InputField } from '@/integrations/tanstack-form/components/InputField'
import { SwitchField } from '@/integrations/tanstack-form/components/SwitchField'
import { ResetButton } from '@/integrations/tanstack-form/components/ResetButton'
import { SubmitButton } from '@/integrations/tanstack-form/components/SubmitButton'
import { fieldContext, formContext } from '@/integrations/tanstack-form/hooks/formContext.tsx'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    Input: InputField,
    Switch: SwitchField,
  },
  formComponents: {
    SubmitButton,
    ResetButton,
  },
  fieldContext,
  formContext,
})
