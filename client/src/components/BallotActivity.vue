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

const detailsMap = {
  AffidavitRejectItem:
    "Your affidavit has been rejected. Please contact your Election Officials office to cure your affidavit.",
  AffidavitAcceptItem:
    "Your affidavit has been accepted. A new item will appear here when it has been extracted for tallying.",
  CastRequestItem: "Your ballot has been received.",
  VoterSessionItem: "You have authenticated your self and signed in.",
};

const authorMap = {
  AffidavitRejectItem: "Election Official",
  AffidavitAcceptItem: "Election Official",
  CastRequestItem: "You",
  VoterSessionItem: "You",
};

const typeMap = {
  AffidavitRejectItem: "Affidavit Rejected",
  AffidavitAcceptItem: "Affidavit Accepted",
  CastRequestItem: "Ballot Cast",
  VoterSessionItem: "Sign In",
};

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div :class="classes">
    <div class="BallotActivity__Row">
      <div class="BallotActivity__Type">
        {{ typeMap[activity.type] }}
      </div>

      <DateTime
        class="BallotActivity__RegisteredAt"
        :date-time="activity.registered_at"
        v-if="!expanded"
      />

      <div class="BallotActivity__Author" v-if="!expanded">
        {{ authorMap[activity.type] }}
      </div>

      <div class="BallotActivity__Spacer" />

      <span class="BallotActivity__Expander" @click="toggleExpanded">
        <font-awesome-icon
          v-if="expanded"
          icon="fa-solid fa-minus"
          aria-label="Collapse this activity"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-plus"
          aria-label="Expand this activity"
        />
      </span>
    </div>

    <div class="BallotActivity__Row BallotActivity__Details" v-if="expanded">
      <p>
        Registered at:
        <DateTime :date-time="activity.registered_at" format="long" />
      </p>
      <p>Actor: {{ authorMap[activity.type] }}</p>
      <p>What does this mean?</p>
      <p>{{ detailsMap[activity.type] }}</p>
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

.BallotActivity__RegisteredAt {
  margin-left: 24px;
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
