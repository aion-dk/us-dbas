<script setup lang="ts">
import router from "../router";
</script>

<template>
  <main class="ErrorScreen">
    <AVCard class="ErrorScreen__Card">
      <AVIcon icon="triangle-exclamation" class="ErrorScreen__Icon" />
      <h2>{{ $t(`views.general_error.title`) }}</h2>
      <p>{{ $t("views.general_error.description") }}</p>
      <AVButton
        type="neutral"
        :label="$t('views.general_error.button')"
        class="ErrorScreen__Button"
        @click="router.push({ name: 'Welcome' })"
      />
    </AVCard>
  </main>
</template>

<style type="text/css">
.ErrorScreen__Card {
  margin-top: 6rem;
  padding: 4rem !important;
  gap: 2rem;
  text-align: center;
  position: relative;
  height: fit-content;
}

.ErrorScreen__Card::before {
  content: "";
  background-color: var(--semantic-warning-1);
  height: 0.5rem;
  width: calc(100% + 2px);
  top: -0.5rem;
  left: -1px;
  position: absolute;
}

.ErrorScreen__Icon {
  color: var(--slate-600);
  height: 50px;
  width: 50px;
  align-self: center;
}

.ErrorScreen h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: var(--slate-700);
}

.ErrorScreen p {
  margin: 0;
  max-width: 28rem;
  align-self: center;
}

.ErrorScreen__Button {
  margin-top: 1rem;
  align-self: center;
  width: 24rem;
}
</style>
