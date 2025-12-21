import { createFormHook } from '@tanstack/react-form'

import { InputField } from '@/integrations/tanstack-form/components/input-field'
import { SwitchField } from '@/integrations/tanstack-form/components/swtch-field'
import { ResetButton } from '@/integrations/tanstack-form/components/reset-button'
import { SubmitButton } from '@/integrations/tanstack-form/components/submit-button'
import { fieldContext, formContext } from '@/integrations/tanstack-form/hooks/form-context.tsx'

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
