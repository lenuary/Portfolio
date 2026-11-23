<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface ContactFormState {
  name: string
  email: string
  message: string
}

const CONTACT_EMAIL = 'contact@lenuary.dev'

const state = reactive<ContactFormState>({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const validate = (formState: Partial<ContactFormState>): FormError[] => {
  const errors: FormError[] = []

  if (!formState.name?.trim()) {
    errors.push({ name: 'name', message: 'Name is required.' })
  }

  if (!formState.email?.trim()) {
    errors.push({ name: 'email', message: 'Email is required.' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    errors.push({ name: 'email', message: 'Please enter a valid email address.' })
  }

  if (!formState.message?.trim()) {
    errors.push({ name: 'message', message: 'Message cannot be empty.' })
  }

  return errors
}

const onSubmit = (event: FormSubmitEvent<ContactFormState>) => {
  const { name, email, message } = event.data
  const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`)
  const body = encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
  )

  submitted.value = true

  if (import.meta.client) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }
}
</script>

<template>
  <UPageSection
    id="contact"
    title="Contact"
    description="Have a project in mind or want to collaborate? Leave a short message and I will get back to you as soon as possible."
    :ui="{
      root: 'bg-transparent scroll-mt-24 pt-12 pb-24',
      container: 'max-w-2xl',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400'
    }"
  >
    <UPageCard
      variant="outline"
      :ui="{
        root: 'bg-zinc-950/75 border-zinc-800/80 backdrop-blur-md rounded-xl',
        body: 'p-6 sm:p-7'
      }"
    >
      <UForm
        :state="state"
        :validate="validate"
        class="contact-form"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name" required>
          <UInput
            v-model="state.name"
            placeholder="Your name"
            color="neutral"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            type="email"
            placeholder="you@example.com"
            color="neutral"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Message" name="message" required>
          <UTextarea
            v-model="state.message"
            :rows="4"
            placeholder="Tell me briefly about your project..."
            color="neutral"
            variant="outline"
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="submitted"
          color="neutral"
          variant="subtle"
          icon="i-lucide-check"
          title="Message ready to send"
          description="Your default email client has been opened with the pre-filled message."
        />

        <div class="contact-submit">
          <UButton
            type="submit"
            color="neutral"
            variant="solid"
            trailing-icon="i-lucide-send"
            label="Send message"
            class="cursor-pointer"
          />
        </div>
      </UForm>
    </UPageCard>
  </UPageSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.contact-form {
  @apply flex flex-col gap-4;
}

.contact-submit {
  @apply flex justify-end pt-1;
}
</style>