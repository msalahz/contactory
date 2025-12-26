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

import { senv } from '@/env.client'

interface VerifyEmailProps {
  name: string
  url: string
}

const baseUrl = senv.BASE_URL ? `${senv.BASE_URL}` : ''

export function VerifyEmail({ name, url }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="font-koala bg-white">
          <Preview>The intelligence platform that helps you manage your contacts.</Preview>
          <Container className="mx-auto py-5 pb-12">
            <Text className="text-base leading-[26px]">Hi {name},</Text>
            <Text className="text-base leading-[26px]">
              Click the button below to verify that this email address belongs to your account at{' '}
              <a href={`${baseUrl}`}>Contactory</a>
            </Text>
            <Section className="text-center">
              <Button
                className="block rounded-[3px] bg-rose-500 p-3 text-center text-base text-white no-underline"
                href={url}
              >
                Verify Email
              </Button>
              <Text className="text-muted-foreground text-sm leading-4">
                The link will expire in 1 hours.
              </Text>
            </Section>
            <Section className="text-center">
              Button not working? Use this link instead: <a href={url}>Verify Email</a>
            </Section>
            <Text className="text-base leading-[26px]">
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
