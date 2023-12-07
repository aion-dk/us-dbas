export const es = {
  locales: {
    en: "English",
    es: "Español",
  },
  errors: {
    verify: {
      invalid_code: {
        title: "NO SE ENCONTRÓ EL CÓDIGO DE VERIFICACIÓN",
        description_l1:
          "Verifique que haya ingresado correctamente el código de verificación de la boleta. Asegúrese de que mayúsculas y minúsculas coincidan.",
        description_l2: "¿Necesita ayuda adicional? ",
        link: "Comuníquese con su funcionario electoral local.",
      },
    },
    track: {
      invalid_code: {
        title: "NO SE ENCONTRÓ EL CÓDIGO DE SEGUIMIENTO",
        description_l1_p1:
          "Compruebe que el código de seguimiento se haya ingresado correctamente. El código distingue entre mayúsculas y minúsculas. Si está comprobando para asegurarse de que su boleta se registró correctamente antes de enviarla, use el",
        description_l1_link: "sitio de verificación de boletas",
        description_l1_p2: "en su lugar.",
        description_l2: "¿Sigue teniendo problemas? ",
        link: "Comuníquese con su funcionario electoral local.",
      },
    },
  },
  header: {
    dbas: "Sitio de auditoría de votación digital",
    about: "Acerca de",
    logs: {
      logs: "Registros",
      config: "Registro de configuraciones",
      activity: "Registro de actividades",
    },
    help: "Ayuda",
    contact: "Contacto",
    check: "Verificar mi boleta",
    track: "Rastreador de boletas",
    change_locale: {
      en: "Switch to English",
      es: "Cambiar a Español",
    },
    open_menu_aria_label: "Abrir menú",
    close_menu_aria_label: "Cerrar menú",
  },
  footer: [
    "Revisar mi boleta",
    "Código encontrado",
    "Verificar clave de acceso",
    "Revisar la boleta sin sellar",
    "Finalizar",
  ],
  components: {
    board_item: {
      registered: "Registrado el: ",
      author: "Autor: ",
      address: "Identificador: ",
      info: "¿Qué significa esto?",
      expand: "Click para leer más",
      collapse: "Click para leer menos",
      SegmentsConfigItem: {
        type: "Elemento de configuración de segmentación",
        author: "Funcionario Electoral",
        info: "El funcionario electoral ha configurado la segmentación que es publicada sobre los votantes.",
      },
      SpoilRequestItem: {
        type: "Elemento de solicitud de nulidad",
        author: "Votante",
        info: "Se registra esta actividad cuando un votante ha iniciado una verificación de boleta para comprobar que su boleta esté registrada y encriptada correctamente. La verificación de la boleta anula el paquete de boleta encriptada para desencriptar la boleta y permitir que el sitio de verificación independiente muestre al votante la boleta desencriptada en texto sin formato.",
      },
      SessionExpiryItem: {
        type: "Sesión caducada",
        author: "Votante",
        info: "Se registra esta actividad cuando la sesión del votante caducó sin la presentación de una boleta. La sesión puede haber caducado debido a que un votante salió de la aplicación de votación sin emitir su voto o el tiempo de espera de inactividad de la aplicación de votación obligó al votante a comenzar una nueva sesión.",
      },
      ExtractionDataItem: {
        type: "Boletas extraídas",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando un funcionario electoral completa una extracción de boletas. Las boletas encriptadas extraídas ya están listas para que se desencripten en el servidor local. Este proceso tiene lugar en un entorno fuera de línea, sin conexión a una red externa.",
      },
      ExtractionConfirmationItem: {
        type: "Confirmación de extracción",
        author: "Administradores",
        info: "Se registra esta actividad cuando un funcionario electoral carga la confirmación de que un paquete de boletas se desencriptó correctamente en el servidor local. Los administradores deben constatar la confirmación de extracción como parte del registro de la cadena de custodia para el registro oficial de la elección.",
      },
      ExtractionIntentItem: {
        type: "Intento de extracción",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando un funcionario electoral inicia una extracción de boletas. Las boletas encriptadas que se aceptan para el conteo pueden ser parte de una extracción de boletas. El funcionario electoral transporta las boletas encriptadas utilizando medios extraíbles a un servidor local sin conexión a Internet o red externa. Allí, los administradores colaboran para desencriptar las boletas antes de que se impriman en boletas de papel legibles por máquinas para su tabulación.",
      },
      AffidavitRejectItem: {
        type: "Elemento de rechazo de declaración jurada",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando los funcionarios electorales han revisado y no aprobado una declaración jurada de boleta de voto en ausencia. El voto emitido correspondiente ahora se marca como no aceptado para el escrutinio y no estará disponible para su exportación para desencriptar e imprimir las boleta.",
      },
      AffidavitAcceptItem: {
        type: "Elemento de aceptación de declaración jurada",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando los funcionarios electorales han revisado y aprobado una declaración jurada de boleta de voto en ausencia. El voto emitido correspondiente ahora se marca como aceptado para el escrutinio.",
      },
      GenesisItem: {
        type: "Proceso de creación",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando un funcionario electoral crea una nueva elección.",
      },
      VoterAuthorizationConfigItem: {
        type: "Configuración de la autorización del votante",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando el funcionario electoral configura el servicio de contraseña de un solo uso.",
      },
      ContestConfigItem: {
        type: "Elemento de configuración de boletas",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando el funcionario electoral importa archivos de definición de boleta en la configuración electoral.",
      },
      VotingRoundConfigItem: {
        type: "Configuración de la ronda de votación",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando el archivo de definición de la elección que contiene la contienda electoral y la información del candidato se carga en la elección.",
      },
      BallotConfigItem: {
        type: "Elemento de configuración de boletas",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando el funcionario electoral importa archivos de definición de boleta en la configuración electoral.",
      },
      ElectionConfigItem: {
        type: "Elemento de configuración electoral",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando un funcionario electoral configura la información y los requisitos electorales.",
      },
      ThresholdConfigItem: {
        type: "Elemento de configuración de umbrales",
        author: "Administradores",
        info: "Se registra esta actividad cuando los administradores electorales han generado una clave de encriptado para la elección. Debe completarse antes de que la votación esté abierta en una elección.",
      },
      CastRequestItem: {
        type: "Elemento de solicitud de emisión",
        author: "Votante",
        info: "Se registra esta actividad cuando un votante envía un paquete de boleta encriptada. Contiene el registro de voto emitido encriptado y la declaración jurada en ausencia encriptada.",
      },
      VoterSessionItem: {
        type: "Elemento de sesión de votante",
        author: "Votante",
        info: "Se registra esta actividad cuando un votante ha sido autorizado a usar el retorno digital respondiendo con éxito a la solicitud de código de acceso de un solo uso en la aplicación VoteHub. Si los votantes no completan el proceso de votación en esta sesión, deberán obtener una nueva autorización cuando vuelvan a abrir la aplicación de votación.",
      },
      BallotCryptogramsItem: {
        type: "Boleta encriptada",
        author: "Votante",
        info: "Se registra esta actividad cuando se encriptó una boleta y está lista para su envío. Un votante puede optar por realizar una verificación de la boleta para verificar que la boleta esté encriptada correctamente.",
      },
      BoardEncryptionCommitmentItem: {
        type: "Compromiso de encriptación",
        author: "Urna electoral digital",
        info: "Se registra esta actividad cuando el votante y la urna digital iniciaron el proceso de encriptación de la boleta.",
      },
      VoterEncryptionCommitmentItem: {
        type: "Compromiso de encriptación",
        author: "Votante",
        info: "Se registra esta actividad cuando el votante y la urna digital iniciaron el proceso de encriptación de la boleta.",
      },
    },
    ballot_activity_list: {
      title: "Actividad relacionada con el código de seguimiento",
      type: "Tipo de actividad",
      time: "Fecha y hora",
      actor: "Actor",
      identifier: "Identificador",
      tooltips: {
        type: "Tipo de actividad registrada en la urna electoral digital",
        identifier:
          "Código que los funcionarios electorales y los administradores utilizan para confirmar la exactitud de la configuración.",
        actor: "Origen del tipo de actividad",
      },
    },
    ballot_activity: {
      registered_at: "Marca de tiempo:",
      author: "Actor:",
      meaning: "¿Qué significa esto?",
      AffidavitRejectItem: {
        type: "Elemento de rechazo de declaración jurada",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando los funcionarios electorales han revisado y no aprobado una declaración jurada de boleta de voto en ausencia. El voto emitido correspondiente ahora se marca como no aceptado para el escrutinio y no estará disponible para su exportación para desencriptar e imprimir las boleta.",
      },
      SpoilRequestItem: {
        type: "Elemento de solicitud de nulidad",
        author: "Usted",
        info: "Se registra esta actividad cuando un votante ha iniciado una verificación de boleta para comprobar que su boleta esté registrada y encriptada correctamente. La verificación de la boleta anula el paquete de boleta encriptada para desencriptar la boleta y permitir que el sitio de verificación independiente muestre al votante la boleta desencriptada en texto sin formato.",
      },
      SessionExpiryItem: {
        type: "Sesión caducada",
        author: "Usted",
        info: "Se registra esta actividad cuando la sesión del votante caducó sin la presentación de una boleta. La sesión puede haber caducado debido a que un votante salió de la aplicación de votación sin emitir su voto o el tiempo de espera de inactividad de la aplicación de votación obligó al votante a comenzar una nueva sesión.",
      },
      AffidavitAcceptItem: {
        type: "Elemento de aceptación de declaración jurada",
        author: "Funcionario Electoral",
        info: "Se registra esta actividad cuando los funcionarios electorales han revisado y aprobado una declaración jurada de boleta de voto en ausencia. El voto emitido correspondiente ahora se marca como aceptado para el escrutinio.",
      },
      CastRequestItem: {
        type: "Voto emitido",
        author: "Usted",
        info: "Se registra esta actividad cuando un votante envió un paquete de boleta encriptada. El paquete contiene la boleta encriptada por separado y la declaración jurada por ausencia.",
      },
      VoterSessionItem: {
        type: "Inicio de sesión",
        author: "You",
        info: "Se registra esta actividad cuando un votante ha sido autorizado a usar el retorno digital respondiendo con éxito a la solicitud de código de acceso de un solo uso en la aplicación VoteHub. Si los votantes no completan el proceso de votación en esta sesión, deberán obtener una nueva autorización cuando vuelvan a abrir la aplicación de votación.",
      },
    },
  },
  views: {
    BallotVerifierView: {
      finish: "Finalizar",
    },
    about: {
      content: {
        main_title: "Acerca de este sitio web",
        main_description:
          "Este sitio brinda a los votantes la capacidad de verificar independientemente que su boleta se registre, se reciba y se incluya en el escrutinio correctamente. Todas las actividades relacionadas con la urna electoral digital de VoteHub son visibles y se pueden someter a auditorías para que el público pueda verificar de manera independiente que los resultados de la elección sean correctos.",
        ballot_check_title: "Verificación de boletas",
        ballot_check_description:
          "Los votantes pueden utilizar esta sección para verificar, independientemente, que su boleta ha sido registrada y sellada correctamente en la aplicación VoteHub. Esta verificación de la boleta es realizada antes de que la misma sea emitida. La verificación de la boleta es una herramienta importante para asegurar que la decisión del votante es emitica correctamente. Después de que una boleta es emitida, los votantes pueden utilizar el Rastreador de Boletas para confirmar que la misma fue recibida correctamente y, luego, que la declaración jurada ha sido verificada y la boleta ha sido aceptada e impresa para ser escrutada. Aprenda más sobre las características de seguridad de VoteHub ",
        ballot_check_link: "aquí",
        ballot_track_title: "Rastreador de boletas",
        ballot_track_description:
          "Los votantes pueden usar esta pestaña para verificar que su boleta se recibió correctamente en la urna electoral digital de VoteHub. Los votantes también pueden hacer un seguimiento de cuándo se verifica su declaración jurada de firma y cuándo se desencripta y se imprime su boleta fuera de línea para el escrutinio. Los votantes no pueden ver o cambiar sus boletas una vez que han sido enviadas, y el sitio no solicita ni revela ninguna información sobre la identidad del votante.",
        activity_log_title: "Registro de actividad electoral",
        activity_log_description:
          "El público puede usar esta pestaña para ver y auditar todas las actividades relacionadas con la urna electoral digital de VoteHub.",
        configuration_log_title: "Registro de configuración electoral",
        configuration_log_description:
          "El público puede usar esta pestaña para ver y verificar toda la actividad relacionada con la configuración electoral y las actividades de backend.",
      },
    },
    BallotTrackerStart: {
      header: "Rastreador de boletas",
      p1: "He votado y deseo hacer un seguimiento de mi boleta.",
      p2: "Para verificar el estado de su boleta, debe ingresar el código de seguimiento del recibo del votante.",
      tracking_code_input: "Código de seguimiento de boletas",
      track_ballot_button: "Hacer un seguimiento de mi boleta",
      locate_tracking_code:
        "¿Dónde puedo encontrar mi Código de seguimiento de boletas?",
      locate_tracking_code_tooltip:
        "Su código de seguimiento de boletas se mostró en la aplicación VoteHub después de enviar su boleta. También se envió a la dirección de correo electrónico en su registro de votante.",
      footer: {
        prefix: "¿Quiso decir",
        main: "Verificación de boleta",
        suffix: "en su lugar?",
      },
      ballot_checker_info_tooltip:
        "Antes de enviar la boleta, se realiza una verificación. Le permite confirmar que su boleta fue registrada y encriptada correctamente.",
    },
    verifier: {
      start: {
        title: "Revisar mi boleta",
        intro:
          "Ingrese el código de verificación de la boleta que se muestra en la aplicación VoteHub",
        placeholder: "Código de verificación de boletas",
        submit: "Revisar mi boleta",
        footer: {
          prefix:
            "¿Está tratando de hacer un seguimiento de su boleta enviada con el",
          main: "Rastreador de boletas",
          suffix: "?",
        },
        ballot_tracker_info_tooltip:
          "Use el rastreador de boletas para verificar que su boleta enviada fue recibida y para verificar que la declaración jurada de su firma fue revisada y aceptada. También podrá verificar cuándo se desencripta su boleta para imprimirla para el escrutinio.",
      },
      found: {
        title: "Código de verificación de boletas encontrado",
        description:
          "Se ha encontrado el código de verificación de su boleta. Para continuar, toque Código ingresado en la aplicación VoteHub.",
      },
      inprogress: {
        title: "Verificar clave de acceso",
        info: "¿Coinciden las claves de acceso? Toque Sí o No en la aplicación VoteHub.",
        alert_title: "Se le está acabando el tiempo.",
        alert_text:
          "Antes de que expire su sesión, confirme que las claves de acceso coinciden en la aplicación VoteHub. Si su sesión expira, deberá volver a sellar su boleta y comenzar nuevamente con un nuevo código de verificación de boletas.",
      },
      spoiled: {
        title: "Boleta sin sellar",
        description:
          "El contenido de su boleta tal como está registrado se muestra a continuación. Si el contenido parece correcto, toque Sí en la aplicación VoteHub para volver a sellar su boleta.",
      },
      blank_pile: "Voto en blanco",
    },
    help: {
      title: "Ayuda",
      info: "¿Tiene preguntas? Estamos aquí para ayudar.",
      ballot_check_title: "Ayuda para usar la verificación de boletas",
      ballot_track_title: "Ayuda para usar el rastreador de boletas",
      still_have_questions: "¿Aún tiene preguntas?",
      cant_find_answers:
        "¿No encuentra las respuestas que busca? Comuníquese con su funcionario electoral local. ",
      election_office_website: "Ir al sitio web de la Oficina Electoral",
      ballot_check: {
        q1: {
          question: "Falta el código de verificación de boletas",
          answer: {
            p1: "El código de verificación de boleta se muestra en la aplicación VoteHub después de que el paquete de votación haya sido sellado y esté listo para ser enviado. Si ha enviado su boleta, ya no podrá realizar la verificación de boleta. En su lugar, puede usar el Rastreador de boletas para verificar que se recibió en la urna electoral digital. Use el código de seguimiento de boletas enviado a su correo electrónico o en exhibición con su etiqueta adhesiva Yo voté en la aplicación VoteHub.",
          },
        },
        q2: {
          question: "La clave de acceso no coincide",
          answer: {
            p1: "No se recomienda que utilice el retorno digital para enviar su boleta. Toque No en la aplicación VoteHub y, si puede, seleccione imprimir boleta para imprimir y devolver una boleta física a su oficina electoral. Comuníquese también con su funcionario electoral local para obtener más ayuda.",
          },
        },
        q3: {
          question: "¿Qué sucede con una boleta una vez que se ha enviado?",
          answer: {
            p1: "Las boletas enviadas se almacenan de forma segura en una urna electoral digital hasta el momento del escrutinio.",
            p2: "Una vez que su boleta se envía a la urna electoral digital, permanece encriptada hasta que esté lista para el cómputo de votos con otras boletas de voto en ausencia.",
            p3: "Los funcionarios electorales verifican las firmas siguiendo los mismos procedimientos que las boletas de papel para voto en ausencia.",
            p4: "Los funcionarios electorales realizarán la verificación de firmas en la declaración jurada de su boleta y confirmarán cualquier otra información requerida de conformidad con las normas y los requisitos locales.",
            p5: "Los votantes pueden rastrear el estado de su boleta en el sitio de auditoría de votación digital.",
            p6: "Una vez que se verifican las firmas, la urna electoral digital filtra las boletas encriptadas aceptadas para el escrutinio. Puede hacer un seguimiento del estado de su boleta utilizando el código de rastreo que recibe al enviar su boleta en VoteHub.",
            p7: "Simplemente visite el sitio de auditoría de votación digital para ingresar su código de rastreo y ver el estado actual de su boleta enviada. El estado incluirá una confirmación de que se recibió, cuándo ha sido aceptada (o rechazada) para el escrutinio y cuándo se ha impreso para el cómputo de votos.",
            p8: "Las boletas se extraen de la urna electoral digital, se trasladan fuera de línea, se desencriptan y se imprimen para el escrutinio.",
            p9: "Cuando las boletas están listas para ser desencriptadas e impresas para el cómputo de votos con otras boletas de voto en ausencia, los funcionarios electorales deben extraer primero las boletas encriptadas de la urna electoral digital. Las boletas encriptadas se exportan a medios extraíbles y se transportan a una red aislada sin conexión a Internet. Una junta de administración proporcionará la clave para mezclar y desencriptar las boletas. Una vez desencriptadas, las boletas se pueden imprimir para obtener boletas legibles por máquinas para poder escanearlas y computar los votos junto con otras boletas de papel para voto en ausencia.",
          },
        },
        q4: {
          question: "¿Cómo envío mi boleta después de su verificación?",
          answer: {
            p1: "Una vez que haya verificado que su boleta se registró correctamente, puede tocar Sí en la aplicación VoteHub para volver a sellar su boleta. Podrá enviar su boleta, o puede realizar la verificación de la boleta nuevamente usando un nuevo código de verificación de boleta que se muestra en la aplicación VoteHub.",
          },
        },
        q5: {
          question:
            "¿Qué sucede si la aplicación VoteHub agota el tiempo de espera o deja de funcionar durante una verificación de boleta?",
          answer: {
            p1: "Si la aplicación deja de funcionar durante una verificación de boleta, informe el problema a su funcionario electoral local. Haga clic aquí para comunicarse con su funcionario electoral local. Debería poder reiniciar la aplicación, pero tendrá que marcar nuevamente su boleta. Le recomendamos que regrese al sitio de Verificar mi boleta para realizar la verificación de la boleta una vez que su boleta recién marcada esté sellada y lista para su envío.",
          },
        },
      },
      ballot_track: {
        q1: {
          question: "Falta el código de seguimiento de boletas",
          answer: {
            p1: "El código de seguimiento de boletas se envió a la dirección de correo electrónico en su registro de votante. Asegúrese de revisar su carpeta de correo no deseado en caso de que haya sido entregado allí. ¿Todavía no lo encuentra? Puede abrir la aplicación VoteHub y volver a ingresar su información de identificación. También deberá completar la autorización del código de acceso de un solo uso para recuperar su código de seguimiento en la aplicación.",
          },
        },
        q2: {
          question: "Boleta no encontrada",
          answer: {
            p1: "El rastreador de boletas se utiliza para confirmar que su boleta ha sido recibida en la urna electoral digital. Asegúrese de haber enviado una boleta y haber recibido un código de seguimiento de boletas antes de usar este sitio. Es posible que tenga un código de verificación de boletas que se usa antes de enviar su boleta para verificar que su boleta se registró y encriptó correctamente. Para realizar una verificación de boleta con un código de verificación de boleta, haga clic aquí.",
            p2: "Si ha enviado su boleta y ha recibido un código de seguimiento de boleta, asegúrese de verificar que ha ingresado correctamente el código de seguimiento de boleta de 7 dígitos. El código distingue entre mayúsculas y minúsculas. Si aún no se encuentra su boleta, comuníquese con su administrador electoral local.",
          },
        },
        q3: {
          question: "Acerca de los estados de las boletas electorales",
          answer: {
            p1: "Boleta recibida: su boleta ha sido recibida en la urna electoral digital y está a la espera de la verificación de la firma por parte de los funcionarios electorales locales.",
            p2: "Boleta aceptada: su declaración jurada de firma ha sido verificada y su boleta es aceptada para el escrutinio.",
            p3: "Boleta no aceptada: hay un problema con su declaración jurada de firma. Comuníquese con su funcionario electoral local para conocer los próximos pasos y para corregir su declaración jurada.",
            p4: "Boleta impresa para el escrutinio: su boleta se ha extraído de la urna electoral digital y se ha desencriptado fuera de línea. Se ha impreso en una boleta de papel para su escaneado y cómputo con otras boletas de voto en ausencia.",
          },
        },
      },
    },
    logs: {
      config: {
        title: "Registro de configuración electoral",
        intro:
          "TEl público puede usar esta pestaña para ver y verificar toda la actividad relacionada con la configuración electoral y las actividades de backend.",
      },
      activity: {
        title: "Registro de actividad electoral",
        intro:
          "El público puede usar esta pestaña para ver y auditar todas las actividades relacionadas con la urna electoral digital de VoteHub.",
      },
      download_button:
        "Descargar el registro completo de la actividad electoral (json)",
      pagination_aria_label: {
        first: "Primera página",
        prev: "Página anterior",
        next: "Próxima página",
        last: "Última página",
      },
    },
    tracker: {
      activity_log: "Actividad relacionada con el código de seguimiento",
      currently_tracking: "Código de seguimiento de boleta",
      cancel_cross_label: "Cancelar rastreo %{trackingCode}",
      info: {
        title: "Se encontró la boleta en la urna digital.",
      },
      status_map: {
        pending: {
          title: "Boleta recibida",
          description:
            "Su paquete de votación ha sido recibido. Vuelva a verificar para comprobar que su boleta haya sido aceptada para el escrutinio.",
        },
        accepted: {
          title: "Boleta aceptada",
          description:
            "Su declaración jurada de firma ha sido verificada y su boleta es aceptada para el escrutinio.",
        },
        rejected: {
          title: "Boleta no aceptada",
          description:
            "Hay un problema con su declaración jurada de firma. No fue aceptada debido a “MOTIVO DE RECHAZO”. Comuníquese con su funcionario electoral local para conocer los próximos pasos y para corregir su declaración jurada.",
          contact: "Comuníquese con su funcionario electoral",
        },
        extracted: {
          title: "Boleta desencriptada para impresión",
          description:
            "Su boleta ha sido extraída de la urna electoral digital y desencriptada fuera de línea. Se ha impreso en una boleta de papel para su escaneado y cómputo con otras boletas de voto en ausencia.",
        },
      },
    },
    welcome: {
      title: "¿Ya envió su boleta?",
      intro:
        'Use este sitio para verificar que su boleta se registre y se reciba correctamente. También puede ver toda la actividad en el sistema VoteHub a través de la pestaña "Registros"',
      yes: "Si",
      no: "No",
    },
    expired: {
      title: "Su sesión ha caducado debido a inactividad",
      description:
        "Siga las instrucciones en la aplicación VoteHub para reiniciar la verificación de la boleta nuevamente.",
      button: "Aceptar",
    },
  },
  timedown: {
    title: "La clave de acceso caducará en %{timeLeft}",
  },
};
