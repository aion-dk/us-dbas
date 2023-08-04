<script lang="ts" setup>
import DateTime from "./DateTime.vue";
import ExpandableSection from "./ExpandableSection.vue";

defineProps({
  activity: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="BallotActivity">
    <ExpandableSection>
      <template v-slot:collapsed>
        <div class="BallotActivity__Type" aria-label="Activity">
          {{ $t(`components.ballot_activity.${activity.type}.type`) }}
        </div>

        <div
          class="BallotActivity__RegisteredAt"
          aria-label="Activity registered"
        >
          <AVIcon icon="clock" class="BallotActivity__Icon" />
          <DateTime :date-time="activity.registered_at" />
        </div>

        <div class="BallotActivity__Author" aria-label="Activity author">
          <AVIcon icon="user" class="BallotActivity__Icon" />
          <span>
            {{ $t(`components.ballot_activity.${activity.type}.author`) }}
          </span>
        </div>
      </template>

      <template v-slot:expanded>
        <p class="BallotActivity__Type">
          {{ $t(`components.ballot_activity.${activity.type}.type`) }}
        </p>

        <p>
          <AVIcon icon="clock" class="BallotActivity__Icon" />
          {{ $t("components.ballot_activity.registered_at") }}
          <DateTime :date-time="activity.registered_at" format="long" />
        </p>
        <p>
          <AVIcon icon="user" class="BallotActivity__Icon" />
          {{
            $t("components.ballot_activity.author", {
              author: $t(`components.ballot_activity.${activity.type}.author`),
            })
          }}
          <span>
            {{ $t(`components.ballot_activity.${activity.type}.author`) }}
          </span>
        </p>
        <p>
          <AVIcon icon="circle-info" class="BallotActivity__Icon" />
          {{ $t("components.ballot_activity.meaning") }}
        </p>
        <p>
          {{ $t(`components.ballot_activity.${activity.type}.info`) }}
        </p>
      </template>
    </ExpandableSection>
  </div>
</template>

<style type="text/css" scoped>
.BallotActivity__RegisteredAt {
  width: 150px;
}

.BallotActivity__Type {
  width: 205px;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 18px;
  margin: 0;
  padding: 0;
}

.BallotActivity__Icon {
  margin-right: 5px;
}
</style>
