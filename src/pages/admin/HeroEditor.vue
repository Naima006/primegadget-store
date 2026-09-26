<template>
  <AdminLayout>
    <div class="hero-editor">
      <header class="page-header">
        <div>
          <h1>Hero Section</h1>
          <p>Edit the homepage hero and preview changes live. Perfect for featuring new arrivals.</p>
        </div>
        <div class="header-actions">
          <button class="btn-ghost" @click="resetHero">
            <i class="bi bi-arrow-counterclockwise"></i> Reset
          </button>
          <button class="btn-primary" @click="saveHero">
            <i class="bi bi-check-lg"></i> Save Changes
          </button>
        </div>
      </header>

      <div class="editor-grid">
        <!-- Form -->
        <div class="form-panel">
          <h2>Content</h2>

          <div class="form-group">
            <label>Tag / Badge</label>
            <input v-model="local.tag" placeholder="NEW ARRIVAL" />
          </div>

          <div class="form-group">
            <label>Title (use line breaks)</label>
            <textarea
              v-model="local.title"
              rows="3"
              placeholder="IMMERSIVE SOUND&#10;FOR THE DIGITAL&#10;GENERATION"
            ></textarea>
            <p class="hint">Press Enter for new lines. Keep it bold & short.</p>
          </div>

          <div class="form-group">
            <label>Subtitle</label>
            <textarea
              v-model="local.subtitle"
              rows="3"
              placeholder="Experience premium wireless technology..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Hero Image</label>
            <ImageUpload v-model="local.image" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Primary Button Text</label>
              <input v-model="local.primaryBtnText" placeholder="Shop Now" />
            </div>
            <div class="form-group">
              <label>Primary Button Link</label>
              <input v-model="local.primaryBtnLink" placeholder="/shop" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Secondary Button Text</label>
              <input v-model="local.secondaryBtnText" placeholder="Explore" />
            </div>
            <div class="form-group">
              <label>Secondary Button Link</label>
              <input v-model="local.secondaryBtnLink" placeholder="/about" />
            </div>
          </div>
        </div>

        <!-- Live Preview -->
        <div class="preview-panel">
          <div class="preview-header">
            <h2>Live Preview</h2>
            <span class="live-badge"><span class="dot"></span> Live</span>
          </div>

          <div class="preview-frame">
            <section class="hero-preview" :style="{ background: local.backgroundColor || '#121212' }">
              <div class="hero-grid">
                <div class="hero-left">
                  <span class="tag">{{ local.tag || "NEW ARRIVAL" }}</span>
                  <h1 class="preview-title">
                    <template v-for="(line, i) in titleLines" :key="i">
                      {{ line }}<br v-if="i < titleLines.length - 1" />
                    </template>
                  </h1>
                  <p>{{ local.subtitle }}</p>
                  <div class="buttons">
                    <button class="primary">{{ local.primaryBtnText || "Shop Now" }}</button>
                    <button class="secondary">{{ local.secondaryBtnText || "Explore" }}</button>
                  </div>
                </div>
                <div class="hero-right">
                  <img
                    v-if="local.image"
                    :src="local.image"
                    alt="Hero"
                  />
                  <div v-else class="img-placeholder">
                    <i class="bi bi-image"></i>
                    <span>No image</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <p class="preview-note">
            This is a scaled preview. The real hero on the homepage will match these values exactly.
          </p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import AdminLayout from "../../layouts/AdminLayout.vue"
import ImageUpload from "../../components/ImageUpload.vue"
import { hero } from "../../stores/hero"
import { toast } from "../../stores/toast"

const local = ref({ ...hero.config })

const titleLines = computed(() => {
  return (local.value.title || "").split("\n").filter(Boolean)
})

function saveHero() {
  hero.update({ ...local.value })
  toast.open("Hero section updated successfully")
}

function resetHero() {
  if (confirm("Reset hero to original defaults?")) {
    hero.reset()
    local.value = { ...hero.config }
    toast.open("Hero reset to defaults")
  }
}

// Keep local in sync if store changes externally
watch(
  () => hero.config,
  (val) => {
    local.value = { ...val }
  },
  { deep: true }
)
</script>

<style scoped>
.hero-editor {
  max-width: 1400px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
}

.page-header p {
  color: #888;
  font-size: 15px;
  max-width: 520px;
}

.header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: #121212;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 50px;
  font-size: 14px;
  transition: 0.25s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(198, 255, 74, 0.3);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 50px;
  background: transparent;
  border: 1px solid #333;
  color: #ccc;
  font-weight: 600;
  font-size: 14px;
}

.btn-ghost:hover {
  border-color: #555;
  color: #fff;
}

/* Grid */
.editor-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 24px;
  align-items: start;
}

.form-panel,
.preview-panel {
  background: #16181d;
  border: 1px solid #252830;
  border-radius: 20px;
  padding: 24px;
}

.form-panel h2,
.preview-header h2 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.preview-header h2 {
  margin-bottom: 0;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
}

.live-badge .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Form */
.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 7px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  background: #0f1115;
  border: 1px solid #2a2e38;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hint {
  font-size: 12px;
  color: #666;
  margin-top: 6px;
}

.img-preview {
  margin-top: 10px;
  width: 100%;
  max-width: 160px;
  border-radius: 12px;
  overflow: hidden;
  background: #222;
  border: 1px solid #333;
}

.img-preview img {
  width: 100%;
  height: 100px;
  object-fit: contain;
}

/* Preview frame */
.preview-frame {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #2a2e38;
}

.hero-preview {
  background: #121212;
  color: white;
  padding: 40px 28px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 24px;
}

.tag {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 500;
}

.preview-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 14px;
  word-break: break-word;
}

.hero-left p {
  font-size: 13px;
  color: #c9c9c9;
  max-width: 100%;
  margin-bottom: 20px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.primary,
.secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 13px;
  cursor: default;
  pointer-events: none;
}

.primary {
  background: var(--primary);
  color: #121212;
  border: none;
}

.secondary {
  background: transparent;
  border: 1px solid white;
  color: white;
}

.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-right img {
  width: 100%;
  max-width: 220px;
  height: auto;
  object-fit: contain;
}

.img-placeholder {
  width: 160px;
  height: 160px;
  border: 2px dashed #333;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;
  gap: 8px;
}

.img-placeholder i {
  font-size: 32px;
}

.preview-note {
  font-size: 12px;
  color: #666;
  margin-top: 14px;
  text-align: center;
}

/* Responsive */
@media (max-width: 1100px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }

  .preview-title {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .page-header h1 {
    font-size: 26px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 20px;
  }

  .hero-left p {
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    justify-content: center;
  }

  .hero-preview {
    padding: 28px 18px;
  }

  .preview-title {
    font-size: 22px;
  }
}
</style>
