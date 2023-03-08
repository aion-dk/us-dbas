<script setup lang="ts">
  import useAVClient from "../lib/useAVClient"
  import { onMounted, ref } from "vue"

  let trackingCodeInput = ref(null)
  let avClient;
  let error = ref(null)

  async function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();

    error.value = null

    const trackingCode = trackingCodeInput.value.value

    try {
      const status = await avClient.checkBallotStatus(trackingCode)
    } catch (e) {
      error.value = "Unable to find the ballot"
    }
  }

  onMounted(async () => {
    avClient = await useAVClient("http://dbb:3003/us")
  })
</script>

<template>
  <form @submit="submitForm">
    <p>
      <input
        type="text"
        name="tracking-code"
        ref="trackingCodeInput" />
    </p>

    <p>{{ error }}</p>

    <p>
      <input
        type="submit"
        name="submit-tracking-code"
        value="Track my ballot" />
    </p>
  </form>
</template>
