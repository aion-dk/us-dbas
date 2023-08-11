<script setup lang="ts">
import router from "../router";
</script>

<template>
  <main class="Expired">
    <AVCard class="Expired__Card">
      <AVIcon icon="clock-rotate-left" class="Expired__Icon" />
      <h2>{{ $t(`views.expired.title`) }}</h2>
      <p>{{ $t("views.expired.description") }}</p>
      <AVButton
        type="neutral"
        :label="$t('views.expired.button')"
        class="Expired__Button"
        @click="router.push({ name: 'Welcome' })"
      />
    </AVCard>
  </main>
</template>

<style type="text/css">
.Expired__Card {
  margin-top: 6rem;
  padding: 4rem !important;
  gap: 2rem;
  text-align: center;
  position: relative;
  height: fit-content;
}

.Expired__Card::before {
  content: "";
  background-color: var(--semantic-warning-1);
  height: 0.5rem;
  width: calc(100% + 2px);
  top: -0.5rem;
  left: -1px;
  position: absolute;
}

.Expired__Icon {
  color: var(--slate-600);
  height: 50px;
  width: 50px;
  align-self: center;
}

.Expired h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: var(--slate-700);
}

.Expired p {
  margin: 0;
  max-width: 28rem;
  align-self: center;
}

.Expired__Button {
  margin-top: 1rem;
  align-self: center;
  width: 24rem;
  max-width: 100%;
}
</style>
