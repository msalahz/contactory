import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from '@react-email/components'

import { envServer } from '@/env.server'

interface ResetPasswordEmailProps {
  name: string
  url: string
}

const baseUrl = envServer.BASE_URL ? `${envServer.BASE_URL}` : ''

export function ResetPasswordEmail({ name, url }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="font-koala bg-white">
          <Preview>The intelligence platform that helps you manage your contacts.</Preview>
          <Container className="mx-auto py-5 pb-12">
            <Text className="text-[16px] leading-6.5">Hi {name},</Text>
            <Text className="text-[16px] leading-6.5">
              Click the button below to verify that this email address belongs to your account at{' '}
              <a href={`${baseUrl}`}>Contactory</a>
            </Text>
            <Section className="text-center">
              <Button
                className="block rounded-[3px] bg-rose-500 p-3 text-center text-[16px] text-white no-underline"
                href={url}
              >
                Reset Password
              </Button>
              <Text className="text-muted-foreground text-sm leading-4">
                The link will expire in 1 hours.
              </Text>
            </Section>
            <Section className="text-center">
              Button not working? Use this link instead: <a href={url}>Reset Password</a>
            </Section>
            <Text className="text-[16px] leading-6.5">
              Best,
              <br />
              The Contactory team
            </Text>
            <Hr className="my-5 border-[#cccccc]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
