<template>
  <div class="image-upload">
    <div
      class="dropzone"
      :class="{ dragging: isDragging, 'has-image': modelValue }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="triggerInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        @change="onFile"
      />

      <template v-if="modelValue">
        <img :src="modelValue" alt="Preview" class="preview" />
        <div class="overlay">
          <span>Click or drop to replace</span>
        </div>
      </template>
      <template v-else>
        <i class="bi bi-cloud-arrow-up"></i>
        <p>Drag & drop an image here</p>
        <span class="hint">or click to browse · PNG, JPG, WEBP · max 2MB</span>
      </template>
    </div>

    <div v-if="modelValue" class="actions">
      <button type="button" class="clear-btn" @click.stop="clear">
        <i class="bi bi-trash"></i> Remove
      </button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
})
const emit = defineEmits(["update:modelValue"])

const fileInput = ref(null)
const isDragging = ref(false)
const error = ref("")

function triggerInput() {
  fileInput.value?.click()
}

function clear() {
  emit("update:modelValue", "")
  error.value = ""
}

function processFile(file) {
  error.value = ""
  isDragging.value = false

  if (!file) return
  if (!file.type.startsWith("image/")) {
    error.value = "Please select an image file."
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    error.value = "Image must be under 2MB."
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    emit("update:modelValue", e.target.result)
  }
  reader.onerror = () => {
    error.value = "Failed to read file."
  }
  reader.readAsDataURL(file)
}

function onFile(e) {
  processFile(e.target.files?.[0])
  e.target.value = ""
}

function onDrop(e) {
  processFile(e.dataTransfer.files?.[0])
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed #2a2e38;
  border-radius: 16px;
  background: #0f1115;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.25s;
  position: relative;
  overflow: hidden;
  padding: 20px;
  text-align: center;
}

.dropzone:hover,
.dropzone.dragging {
  border-color: var(--primary);
  background: rgba(198, 255, 74, 0.04);
}

.dropzone i {
  font-size: 36px;
  color: var(--primary);
}

.dropzone p {
  color: #ccc;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
}

.hint {
  font-size: 12px;
  color: #666;
}

.dropzone.has-image {
  padding: 0;
  min-height: 140px;
}

.preview {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #1a1c22;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.25s;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.dropzone.has-image:hover .overlay {
  opacity: 1;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.clear-btn {
  background: rgba(255, 80, 80, 0.12);
  color: #ff6b6b;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-btn:hover {
  background: rgba(255, 80, 80, 0.22);
}

.error {
  margin-top: 8px;
  color: #ff6b6b;
  font-size: 13px;
}
</style>
