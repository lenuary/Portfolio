<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface ContactFormState {
  name: string
  email: string
  message: string
  website: string
}

const state = reactive<ContactFormState>({
  name: '',
  email: '',
  message: '',
  website: '' // honeypot
})

const startedAt = ref(Date.now())
const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

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
  } else if (formState.message.trim().length < 10) {
    errors.push({ name: 'message', message: 'Message must be at least 10 characters.' })
  }

  return errors
}

const onSubmit = async (event: FormSubmitEvent<ContactFormState>) => {
  isSubmitting.value = true
  submitted.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...event.data,
        startedAt: startedAt.value
      }
    })

    submitted.value = true
    state.name = ''
    state.email = ''
    state.message = ''
    state.website = ''
    startedAt.value = Date.now()
  } catch (err: any) {
    errorMessage.value =
      err?.data?.statusMessage || 'Something went wrong. Please try again later.'
  } finally {
    isSubmitting.value = false
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
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <!-- Ukryte pole honeypot dla botów -->
        <input
          v-model="state.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          class="hidden"
        />

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
          title="Message sent"
          description="Thanks for reaching out! I will get back to you as soon as possible."
        />

        <UAlert
          v-if="errorMessage"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-circle"
          title="Could not send message"
          :description="errorMessage"
        />

        <div class="flex justify-end pt-1">
          <UButton
            type="submit"
            color="neutral"
            variant="solid"
            trailing-icon="i-lucide-send"
            label="Send message"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            class="cursor-pointer"
          />
        </div>
      </UForm>
    </UPageCard>
  </UPageSection>
</template>