<script lang="ts" setup>
import config from "../lib/config";
import { RouterLink } from "vue-router";
import { ref } from 'vue'

defineProps({
  errorPath: {
    type: String,
    required: true,
  },
});

const error = ref(null);
error.value?.scrollIntoView({ behavior: "smooth" });
</script>

<template>
  <AVAlert
    type="danger"
    :title="$t(`errors.${errorPath}.title`)"
    icon="triangle-exclamation"
    disable-dismiss
    class="AVAlert__Override"
    ref="error"
  >
    <template v-if="errorPath.startsWith('verify')">
      <p>
        {{ $t(`errors.${errorPath}.description_l1`) }}
      </p>
      <p>
        {{ $t(`errors.${errorPath}.description_l2`) }}
        <a
          role="link"
          :href="config.contactUrl"
          target="_blank"
          class="Error__Link"
        >
          <span>
            <AVIcon icon="arrow-up-right-from-square" />
            {{ $t(`errors.${errorPath}.link`) }}
          </span>
        </a>
      </p>
    </template>
    <template v-else-if="errorPath.startsWith('track')">
      <p>
        {{ $t(`errors.${errorPath}.description_l1_p1`) }}
        <RouterLink :to="{ name: 'BallotVerifierStart' }" class="Error__Link">{{
          $t(`errors.${errorPath}.description_l1_link`)
        }}</RouterLink>
        {{ $t(`errors.${errorPath}.description_l1_p2`) }}
      </p>
      <p>
        {{ $t(`errors.${errorPath}.description_l2`) }}
        <a
          role="link"
          :href="config.contactUrl"
          target="_blank"
          class="Error__Link"
        >
          <span>
            <AVIcon icon="arrow-up-right-from-square" />
            {{ $t(`errors.${errorPath}.link`) }}
          </span>
        </a>
      </p>
    </template>
    <template v-else>
      {{ $t(`errors.${errorPath}.description`) }}
    </template>
  </AVAlert>
</template>

<style type="text/css" scoped>
.AVAlert__Override {
  margin-bottom: 40px;
}

.AVAlert__Override > p {
  margin: 0;
}

.Error__Link {
  color: var(--slate-700);
  font-weight: 600;
  text-decoration: none;
}

.Error__Link:hover {
  color: var(--slate-900);
  text-decoration: underline;
}
</style>
