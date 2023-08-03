export const en = {
  locales: {
    en: "English",
    es: "Español",
  },
  errors: {
    verify: {
      invalid_code: {
        title: "CHECKING CODE NOT FOUND",
        description_l1:
          "Verify you have entered the ballot checking code correctly. Be sure to match case.",
        description_l2: "Need additional help? ",
        link: "Contact your local election official",
      },
    },
    track: {
      invalid_code: {
        title: "TRACKING CODE NOT FOUND",
        description_l1_p1:
          "Please verify that the tracking code was entered correctly. The code is case sensitive. If you are checking to make sure your ballot was recorded correctly before submitting, use the",
        description_l1_link: "ballot check tab",
        description_l1_p2: "instead.",
        description_l2: "Still having problems? ",
        link: "Contact your local election official",
      },
    },
  },
  header: {
    dbas: "VoteHub Ballot Verification",
    about: "About",
    logs: {
      logs: "Logs",
      config: "Configuration logs",
      activity: "Activity logs",
    },
    help: "Help",
    contact: "Contact",
    check: "Ballot check",
    track: "Ballot tracker",
    change_locale: {
      en: "Switch to English",
      es: "Cambiar a Español",
    },
  },
  footer: [
    "Check My Ballot",
    "Code Found",
    "Verify Passkey",
    "Review Unsealed Ballot",
    "Finish",
  ],
  components: {
    item_identifier: {
      tooltip: "Click to copy",
      copied: "Copied",
    },
    board_item: {
      info: "What does this mean?",
      expand: "Click to read more",
      collapse: "Click to read less",
      SegmentsConfigItem: {
        type: "Segments configured",
        author: "Election Official",
        info: "The election official has configured the segments that is publicized about the voters.",
      },
      SpoilRequestItem: {
        type: "Spoil Request",
        author: "Voter",
        info: "This activity is logged when a voter has initiated a ballot check to verify that their ballot is recorded and encrypted correctly. The ballot check spoils the encrypted ballot package in order to decrypt the ballot and permit the independent verification site to display the decrypted ballot in plain text for the voter.",
      },
      SessionExpiryItem: {
        type: "Explicit Session Expiry",
        author: "Voter",
        info: "A session has explicitly been expired.",
      },
      ExtractionDataItem: {
        type: "Extracted votes",
        author: "Election Official",
        info: "Extracted and decrypted votes.",
      },
      ExtractionConfirmationItem: {
        type: "Extraction confirmation",
        author: "Trustees",
        info: "Confirmation item indicating that the trustees decrypted the votes in the previous extraction intent item.",
      },
      ExtractionIntentItem: {
        type: "Extraction intent",
        author: "Election Official",
        info: "Election official intents to extract and decrypt votes. Following items will confirm if this has happened successfully.",
      },
      AffidavitRejectItem: {
        type: "Rejected affidavit",
        author: "Election Official",
        info: "This activity is logged when an absentee ballot affidavit has been reviewed and not approved by election officials. The corresponding cast ballot is now flagged as not accepted for counting and will not be available for export for ballot decryption and printing.",
      },
      AffidavitAcceptItem: {
        type: "Accepted affidavit",
        author: "Election Official",
        info: "This activity is logged when an absentee ballot affidavit has been reviewed and approved by election officials. The corresponding cast ballot is now flagged as accepted for counting. ",
      },
      GenesisItem: {
        type: "Genesis item",
        author: "Election Official",
        info: "The election has been created.",
      },
      VoterAuthorizationConfigItem: {
        type: "Voter authorization config",
        author: "Election Official",
        info: "Voter authorization has been configured.",
      },
      ContestConfigItem: {
        type: "Contest config",
        author: "Election Official",
        info: "This activity is logged when the election official imports ballot definition files in the election configuration.",
      },
      VotingRoundConfigItem: {
        type: "Voting round config",
        author: "Election Official",
        info: "Contest information has been updated.",
      },
      BallotConfigItem: {
        type: "Ballot config",
        author: "Election Official",
        info: "This activity is logged when the election official imports ballot definition files in the election configuration.",
      },
      ElectionConfigItem: {
        type: "Election config",
        author: "Election Official",
        info: "This activity is logged when election information and requirements are configured by an election official.",
      },
      ThresholdConfigItem: {
        type: "Ballot encryption key",
        author: "Trustee",
        info: "This activity is logged when the election trustees have generated an encryption key for the election. It must be completed before voting is open in a election.",
      },
      CastRequestItem: {
        type: "Ballot cast",
        author: "Voter",
        info: "This activity is logged when an encrypted ballot package is submitted by a voter. It contains the encrypted cast vote record and encrypted absentee affidavit.",
      },
      VoterSessionItem: {
        type: "Voter session",
        author: "Voter",
        info: "This activity is logged when a voter has been authorized to use digital return by successfully responding to the one-time access code prompt in the VoteHub app. If voters do not complete the voting process in this session, they will need to be re-authorized when they re-open the voting app.",
      },
      BallotCryptogramsItem: {
        type: "Ballot cryptogram",
        author: "Voter",
        info: "Voter and Digital Ballot Box have exchanged cryptographic information establishing trust.",
      },
      BoardEncryptionCommitmentItem: {
        type: "Encryption commitment",
        author: "Digital Ballot Box",
        info: "Voter and Digital Ballot Box have exchanged cryptographic information establishing trust.",
      },
      VoterEncryptionCommitmentItem: {
        type: "Encryption commitment",
        author: "Voter",
        info: "Voter and Digital Ballot Box have exchanged cryptographic information establishing trust.",
      },
    },
    ballot_activity_list: {
      title: "Activity connected to the tracking code",
      type: "Activity type",
      time: "Date and time",
      actor: "Actor",
      identifier: "Verification Code",
    },
    ballot_activity: {
      registered_at: "Timestamp:",
      author: "Actor:",
      meaning: "What does this mean?",
      AffidavitRejectItem: {
        type: "Affidavit Rejected",
        author: "Election Official",
        info: "This activity is logged when an absentee ballot affidavit has been reviewed and not approved by election officials. The corresponding cast ballot is now flagged as not accepted for counting and will not be available for export for ballot decryption and printing.",
      },
      SpoilRequestItem: {
        type: "Spoil Request",
        author: "You",
        info: "This activity is logged when a voter has initiated a ballot check to verify that their ballot is recorded and encrypted correctly. The ballot check spoils the encrypted ballot package in order to decrypt the ballot and permit the independent verification site to display the decrypted ballot in plain text for the voter.",
      },
      SessionExpiryItem: {
        type: "Explicit Session Expiry",
        author: "You",
        info: "A session has explicitly been expired.",
      },
      AffidavitAcceptItem: {
        type: "Affidavit Accepted",
        author: "Election Official",
        info: "This activity is logged when an absentee ballot affidavit has been reviewed and approved by election officials. The corresponding cast ballot is now flagged as accepted for counting. ",
      },
      CastRequestItem: {
        type: "Ballot Cast",
        author: "You",
        info: "Your ballot has been received.",
      },
      VoterSessionItem: {
        type: "Sign in",
        author: "You",
        info: "This activity is logged when a voter has been authorized to use digital return by successfully responding to the one-time access code prompt in the VoteHub app. If voters do not complete the voting process in this session, they will need to be re-authorized when they re-open the voting app.",
      },
    },
  },
  views: {
    BallotVerifierView: {
      finish: "Finish",
    },
    about: {
      title: "About this website",
      content: `
        <p>This site gives voters the ability to independently verify that their ballot is received and counted correctly. All activity in the VoteHub digital ballot box is viewable and auditable so the public can independently verify the results of the election are correct.</p>

        <h2>Ballot Check</h2>
        <p>Voters can use this tab to independently verify that their ballot is recorded and sealed correctly in the VoteHub voting app.  This ballot check is performed before a ballot is submitted. The check is an important tool to ensure every voter's ballot is cast correctly.  After a ballot is submitted, voters can use the Ballot Tracker to verify that it was received correctly and confirm later when the signature affidavit has been verified and their ballot is accepted and printed for counting. Learn more about the security features of VoteHub here.</p>

        <h2>Ballot Tracker</h2>
        <p>Voters can use this tab to verify their ballot was received correctly in the VoteHub digital ballot box. Voters can also track when their signature affidavit is verified and when their ballot is decrypted and printed offline for counting.  Voters cannot view or change their ballots after they have been submitted, and the site does not ask for or reveal any information about the voter's identity.</p>

        <h2>Election Activity Log</h2>
        <p>The public can use this tab to view and audit all activity in the VoteHub digital ballot box.</p>

        <h2>Election Configuration Log</h2>
        <p>The public can use this tab to view and audit all activity connected to the election configuration and backend activities. </p>
      `,
    },
    BallotTrackerStart: {
      header: "Ballot Tracker",
      p1: "Enter the Ballot Tracking Code displayed in the VoteHub app and sent to your email.",
      p2: "Use the Ballot Tracker to track the status of your digital ballot after it has been submitted.",
      tracking_code_input: "Ballot Tracking Code",
      track_ballot_button: "Track My Ballot",
      locate_tracking_code: "Where can I find my Ballot Tracking Code?",
      locate_tracking_code_tooltip:
        "Your ballot tracking code was displayed in the VoteHub app after you submitted your ballot. It was also sent to the email address in your voter registration record. Can't find your code? You can re-open the VoteHub app and enter your identifying information to retrieve the Tracking Code.",
      footer: {
        prefix: "Did you mean",
        main: "Ballot Check",
        suffix: "instead?",
      },
      ballot_checker_info_tooltip:
        "Use the Ballot Check before you submit your ballot to verify it was recorded correctly.",
    },
    verifier: {
      start: {
        title: "Check My Ballot",
        intro: "Enter the ballot checking code displayed in the VoteHub app",
        placeholder: "Ballot Checking Code",
        submit: "Check My Ballot",
        footer: {
          prefix: "Are you trying to track your submitted ballot with the",
          main: "Ballot Tracker",
          suffix: "?",
        },
        ballot_tracker_info_tooltip:
          "Use the Ballot Tracker to verify your submitted ballot was received and to verify that your signature affidavit was reviewed and accepted. You'll also be able to verify when your ballot is decrypted for printing for counting.",
      },
      found: {
        title: "Ballot Checking Code Found",
        description:
          "Your ballot checking code has been found. To proceed, tap Code Entered in the VoteHub app.",
      },
      inprogress: {
        title: "Verify Passkey",
        info: "Passkeys match? Tap Yes or No in the VoteHub app.",
      },
      spoiled: {
        title: "Unsealed ballot",
        description:
          "The contents of your ballot as recorded are displayed below. If the contents look correct, tap Yes in the VoteHub app to reseal your ballot.",
      },
      blank_pile: "Blank",
    },
    help: {
      title: "Help",
      info: "Have questions? We are here to help.",
    },
    logs: {
      config: {
        title: "Election Configuration log",
        intro:
          "This log filters out voter activity and only displays the election configuration log.",
      },
      activity: {
        title: "Election Activity log",
        intro: "This log shows all activity in the digital ballot box.",
      },
      download_button: "Download the full election log (json)",
      config_only: "Configuration items only?",
    },
    tracker: {
      activity_log: "Activity connected to the tracking code",
      currently_tracking: "Ballot Tracking Code",
      cancel_cross_label: "Cancel tracking %{trackingCode}",
      info: {
        title: "Ballot was found in digital ballot box",
      },
      status_map: {
        pending: {
          title: "Ballot Received",
          description:
            "Your ballot package has been received. Check back to verify that your ballot was accepted for counting.",
        },
        accepted: {
          title: "Ballot Accepted",
          description:
            "Your signature affidavit has been verified and your ballot is accepted for counting.",
        },
        rejected: {
          title: "Ballot Not Accepted",
          description:
            "There is a problem with your signature affidavit. It was not accepted due to “REJECTION REASON”. Contact your local election official for next steps and to cure your affidavit.",
          contact: "Contact your election official",
        },
        extracted: {
          title: "Ballot Decrypted for Printing",
          description:
            "Your ballot has been extracted from the digital ballot box and decrypted offline. It has been printed onto a paper ballot for scanning and tabulation with other absentee ballots.",
        },
      },
    },
    welcome: {
      title: "Have you already submitted your ballot?",
      intro:
        "Use this site to verify your ballot is recorded and received correctly. You can also view all activity in the VoteHub system through the Election Log tab.",
      yes: "Yes",
      no: "No",
    },
  },
  timedown: {
    title: "The passkey will expire in %{timeLeft}",
  },
};
