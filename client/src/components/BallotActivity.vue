<script lang="ts" setup>
import { reactive, ref } from "vue";
import DateTime from "./DateTime.vue";

defineProps({
  activity: {
    type: Object,
    required: true,
  },
});

const expanded = ref(false);

const classes = reactive({
  BallotActivity: true,
  ["BallotActivity--expanded"]: expanded,
});

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div :class="classes">
    <div class="BallotActivity__Row">
      <div class="BallotActivity__Type">
        {{ $t(`components.ballot_activity.${activity.type}.type`) }}
      </div>

      <DateTime
        class="BallotActivity__RegisteredAt"
        :date-time="activity.registered_at"
        v-if="!expanded"
      />

      <div class="BallotActivity__Author" v-if="!expanded">
        {{ $t(`components.ballot_activity.${activity.type}.author`) }}
      </div>

      <div class="BallotActivity__Spacer" />

      <span class="BallotActivity__Expander" @click="toggleExpanded">
        <font-awesome-icon
          v-if="expanded"
          icon="fa-solid fa-minus"
          :aria-label="$t('components.ballot_activity.collapse')"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-plus"
          :aria-label="$t('components.ballot_activity.expand')"
        />
      </span>
    </div>

    <div class="BallotActivity__Row BallotActivity__Details" v-if="expanded">
      <p>
        <font-awesome-icon icon="fa-solid fa-clock" />
        {{ $t("components.ballot_activity.registered_at") }}
        <DateTime :date-time="activity.registered_at" format="long" />
      </p>
      <p>
        <font-awesome-icon icon="fa-solid fa-user" />
        {{
          $t("components.ballot_activity.author", {
            author: $t(`components.ballot_activity.${activity.type}.author`),
          })
        }}
      </p>
      <p>
        <font-awesome-icon icon="fa-solid fa-circle-info" />
        {{ $t("components.ballot_activity.meaning") }}
      </p>
      <p>{{ $t(`components.ballot_activity.${activity.type}.details`) }}</p>
    </div>
  </div>
</template>

<style type="text/css" scoped>
.BallotActivity {
  font-family: "Open Sans";
  border: solid 1px #dee2e6;
  margin-bottom: 20px;
  padding: 20px 32px;
  border-radius: 12px;
}

.BallotActivity__Row {
  display: flex;
  align-items: center;
}

.BallotActivity__Details {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.BallotActivity__Details p {
  margin: 0;
  margin-top: 10px;
  padding: 0;
}

.BallotActivity__Details svg {
  color: #6c757d;
}

.BallotActivity__RegisteredAt {
  width: 150px;
}

.BallotActivity__Type {
  width: 205px;
  text-transform: uppercase;
  font-weight: 900;
}

.BallotActivity__CollapsedWrapper {
  display: flex;
}

.BallotActivity__Spacer {
  flex-grow: 1;
}

.BallotActivity__Expander {
  width: 30px;
  height: 30px;
  background-color: #333;
  border-radius: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
