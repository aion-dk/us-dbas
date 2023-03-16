export const latestConfig = {
  items: {
    electionConfig: {
      content: {
        locales: ["en", "es"],
        title: {
          en: "Funny Election",
          es: "Elección divertida",
        },
      },
    },
  },
};

export const foundBallotStatus = {
  status: "found",
  activities: [
    {
      type: "VoterSessionItem",
      registered_at: "2023-03-14T13:26:54.211Z",
    },
    {
      type: "CastRequestItem",
      registered_at: "2023-03-14T13:26:55.101Z",
    },
  ],
};

export const rejectedBallotStatus = {
  status: "rejected",
  activities: [
    {
      type: "VoterSessionItem",
      registered_at: "2023-03-14T13:26:54.211Z",
    },
    {
      type: "CastRequestItem",
      registered_at: "2023-03-14T13:26:55.101Z",
    },
    {
      type: "AffidavitRejectItem",
      registered_at: "2023-03-14T13:26:56.101Z",
    },
  ],
};
