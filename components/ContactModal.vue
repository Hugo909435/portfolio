<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="$emit('close')" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <div class="modal-panel">
          <button class="modal-close mono" @click="$emit('close')" aria-label="Fermer">✕</button>

          <p class="modal-eyebrow mono">get in touch</p>
          <h2 id="contact-title" class="modal-title serif">Discutons.</h2>

          <form v-if="!sent" class="contact-form" @submit.prevent="submit" novalidate>
            <div class="field-group">
              <label class="field-label mono" for="cf-name">Nom</label>
              <input
                id="cf-name"
                v-model="form.name"
                class="field-input"
                type="text"
                placeholder="Votre nom"
                required
                autocomplete="name"
              />
            </div>

            <div class="field-group">
              <label class="field-label mono" for="cf-email">Email</label>
              <input
                id="cf-email"
                v-model="form.email"
                class="field-input"
                type="email"
                placeholder="votre@email.com"
                required
                autocomplete="email"
              />
            </div>

            <div class="field-group">
              <label class="field-label mono" for="cf-message">Message</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                class="field-input field-textarea"
                placeholder="Votre message..."
                rows="5"
                required
              />
            </div>

            <p v-if="error" class="form-error mono">{{ error }}</p>

            <button class="submit-btn mono" type="submit" :disabled="loading">
              <span v-if="loading">Envoi...</span>
              <span v-else>Envoyer →</span>
            </button>
          </form>

          <div v-else class="success-state">
            <p class="success-icon">✓</p>
            <p class="success-title serif">Message envoyé.</p>
            <p class="success-lead mono">Je vous répondrai dans les plus brefs délais.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const form = reactive({ name: '', email: '', message: '' })
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (!form.name || !form.email || !form.message) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }

  loading.value = true
  try {
    // Remplace l'URL par ton endpoint Formspree : https://formspree.io/f/XXXXXXXX
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error()
    sent.value = true
  } catch {
    error.value = 'Une erreur est survenue. Réessayez ou écrivez-moi directement.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(14, 12, 10, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.modal-panel {
  position: relative;
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  padding: clamp(28px, 5vw, 48px);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--text);
}

.modal-eyebrow {
  margin-bottom: 10px;
}

.modal-title {
  font-size: clamp(36px, 6vw, 52px);
  line-height: 1;
  color: var(--text);
  margin-bottom: 32px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  color: var(--text-muted);
}

.field-input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 15px;
  outline: none;
  padding: 11px 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  width: 100%;
}

.field-input::placeholder {
  color: var(--text-faint);
}

.field-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(198, 151, 105, 0.12);
}

.field-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  color: #e07070;
}

.submit-btn {
  align-self: flex-start;
  background: rgba(198, 151, 105, 0.14);
  border: 1px solid rgba(198, 151, 105, 0.5);
  border-radius: 8px;
  color: var(--accent);
  cursor: pointer;
  min-height: 42px;
  padding: 0 22px;
  transition:
    background 0.25s,
    transform 0.25s var(--ease-out);
}

.submit-btn:hover:not(:disabled) {
  background: rgba(198, 151, 105, 0.24);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  text-align: center;
}

.success-icon {
  font-size: 36px;
  color: var(--accent);
}

.success-title {
  font-size: 36px;
  color: var(--text);
}

.success-lead {
  color: var(--text-muted);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s var(--ease-out);
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.25s var(--ease-out), opacity 0.25s var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: translateY(16px);
  opacity: 0;
}
</style>
