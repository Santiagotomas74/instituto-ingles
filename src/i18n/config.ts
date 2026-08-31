import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      dashboard: {
        greeting: "¡Hola, {{name}} {{lastname}}!",
        welcome: "Bienvenido nuevamente al Campus Virtual.",
        campus_virtual: "Campus virtual",
        my_classrooms: "Mis aulas",
        empty_title: "No estás inscripto en ninguna aula",
        empty_desc:
          "Cuando un administrador te asigne a un aula, aparecerá aquí.",
        classmates: "compañeros",
        materials: "materiales",
        enrolled: "Inscripto",
        enter_classroom: "Ingresar al aula",
      },
      classroom: {
        back: "Volver a mis aulas",
        loading: "Cargando aula...",
        loading_wait: "Aguarde unos segundos.",
        teacher_prefix: "Prof.",
        select_section: "Seleccionar sección",
        tabs: {
          materials: "Materiales",
          tasks: "Tareas",
          announcements: "Anuncios",
          events: "Fechas importantes",
          questions: "Preguntas",
        },
      },
      materials: {
        loading_title: "Cargando materiales...",
        loading_subtitle: "Por favor aguarde un momento.",
        search_placeholder:
          "Buscar material por título, descripción o profesor...",
        material_type: "Tipo de material",
        title: "Materiales",
        found_one: "{{count}} material encontrado",
        found_other: "{{count}} materiales encontrados",
        no_materials_title: "No se encontraron materiales",
        no_materials_desc:
          "Intenta cambiar los filtros o el término de búsqueda.",
        clear_filters: "Limpiar filtros",
        default_creator: "Instituto",
        subcategories: {
          all: "Todos",
          book: "Libros",
          document: "Documentos",
          video: "Videos",
          image: "Imágenes",
          audio: "Audios",
          presentation: "Presentaciones",
          exercise: "Ejercicios",
          guide: "Guías",
          quiz: "Cuestionarios",
          text: "Textos",
        },
        subcategory_labels: {
          book: "Libro",
          document: "Documento",
          video: "Video",
          image: "Imagen",
          audio: "Audio",
          presentation: "Presentación",
          exercise: "Ejercicio",
          guide: "Guía",
          quiz: "Cuestionario",
          text: "Texto",
        },
        academic_categories: {
          all: "Todas",
          grammar: "Gramática",
          vocabulary: "Vocabulario",
          reading: "Lectura",
          listening: "Escucha",
          speaking: "Habla",
          writing: "Escritura",
          homework: "Tarea",
          exam: "Examen",
        },
      },
      tasks: {
        loading: "Cargando tareas...",
        loading_wait: "Aguarde unos segundos.",
        empty: "No hay tareas publicadas.",

        status: {
          graded: "Calificada",
          submitted: "Entregada",
          overdue: "Vencida",
          pending: "Pendiente",
        },

        actions: {
          submit: "Entregar",
          view_submission: "Ver mi entrega",
          view_feedback: "Ver devolución",
        },

        metadata: {
          due_date: "Fecha límite",
          due_time: "Hora límite",
          max_score: "Puntaje máx.",
          points: "pts",
          mode: "Modalidad",
        },

        submission_type: {
          pool: "En grupo / Pool",
          individual: "Individual",
        },

        instructions: "Instrucciones",

        grade: {
          assigned: "Nota asignada",
        },

        submission: {
          in_review: "Tu entrega fue realizada con éxito y está en revisión.",
        },
      },
      announcements: {
        loading_title: "Cargando anuncios...",
        loading_subtitle: "Aguarde unos segundos.",
        empty_title: "No hay anuncios",
        empty_description:
          "Cuando el profesor publique un anuncio aparecerá aquí.",
        important: "Importante",
        time_suffix: "hs",
      },
      events: {
        loading_title: "Cargando fechas importantes...",
        loading_subtitle: "Aguarde unos segundos.",
        empty_title: "No hay fechas importantes",
        empty_description: "El profesor todavía no agregó fechas importantes.",
        types: {
          clase: "Clase",
          examen: "Examen",
          evento: "Evento",
          reunion: "Reunión",
        },
      },
      questions: {
        title: "Consultas generales",

        description:
          "Realizá consultas al profesor y participá de las respuestas.",

        new_question: "Nueva consulta",

        loading_title: "Cargando consultas...",
        loading_wait: "Aguarde unos segundos.",

        empty_title: "Todavía no hay consultas",

        empty_description:
          "Sé el primero en realizar una pregunta al profesor o a tus compañeros.",

        reply_one: "respuesta",
        reply_other: "respuestas",

        thread: {
          loading_title: "Cargando conversación",
          loading_description: "Obteniendo detalles y respuestas...",

          load_error_title: "Error de carga",

          load_error: "No se pudo obtener la consulta.",

          conversation_error: "Ocurrió un error al cargar la conversación.",

          reload_error: "Error al actualizar respuestas.",

          question_not_found:
            "No se encontró la consulta solicitada o fue eliminada.",

          retry: "Reintentar",
          close: "Cerrar",
          close_modal: "Cerrar modal",

          back: "Volver a consultas",
          back_short: "Volver",

          title: "Hilo de Consulta",

          question_badge: "Consulta",

          reply_one: "Respuesta",
          reply_other: "Respuestas",

          no_replies_title: "Todavía no hay respuestas",

          no_replies_description:
            "Sé el primero en responder esta consulta o aguardá la respuesta del docente.",

          teacher: "Profesor",
          student: "Alumno",
        },
        create: {
          title: "Nueva consulta",
          subtitle: "Escribí tu duda para que el profesor pueda responderla.",
          close: "Cerrar modal",

          title_label: "Título de la consulta",
          title_placeholder: "Ej: Duda sobre el ejercicio de Present Perfect",

          content_label: "Detalle de la consulta",
          content_placeholder: "Explicá tu duda de manera clara...",

          cancel: "Cancelar",
          publishing: "Publicando...",
          publish: "Publicar consulta",

          error_publish: "Error al publicar la consulta.",
          error_alert: "No se pudo publicar la consulta.",
        },
      },
      sidebar: {
        menu: {
          my_classrooms: "Mis Aulas",
          tasks: "Tareas",
          grades: "Calificaciones",
          calendar: "Calendario",
          chat: "Mensajes",
          profile: "Mi Perfil",
        },

        open_menu: "Abrir menú",
        close_menu: "Cerrar menú",

        campus_virtual: "Campus Virtual",
        institute: "Instituto de Inglés I.N.K.",
      },
      submission_detail: {
        title: "Mi entrega",
        close_window: "Cerrar ventana",

        submitted_success: "Entrega registrada con éxito",
        submitted_at: "Entregado el {{date}} hs",

        grade: {
          title: "Calificación",
          evaluated: "Nota evaluada por el profesor.",
          pending: "Pendiente de corrección",
          pending_description:
            "El docente aún no ha asignado puntaje a esta entrega.",
        },

        feedback: {
          title: "Devolución",
          empty: "Sin comentarios del profesor por el momento.",
        },

        student_comment: {
          title: "Tu respuesta o comentario",
        },

        attachment: {
          title: "Archivo adjunto",
          default_name: "Documento adjunto",
          open_download: "Haz clic para abrir o descargar",
        },

        close: "Cerrar",
      },
      tasks2: {
        pending: {
          title: "Tareas Pendientes",
          count_label: "{{count}}",
          description: "Entrega a tiempo para mantener tus calificaciones.",

          search_placeholder: "Buscar tarea o materia...",
          refresh: "Actualizar tareas",

          error_title: "Error al obtener las tareas",
          error_fallback: "Ocurrió un error inesperado.",
          retry: "Reintentar",

          no_tasks: "No se encontraron tareas",
          no_tasks_description:
            'Ninguna tarea coincide con el término "{{search}}".',
          clear_search: "Limpiar búsqueda",

          empty_title: "¡No tienes tareas pendientes!",
          empty_description:
            "Ya entregaste todas las actividades disponibles o aún no te asignaron nuevas. ¡Buen trabajo!",

          teacher: "Profesor",
          due_date: "Fecha límite",
          due_time: "Hora límite",
          no_due_date: "Sin fecha",
          default_due_time: "23:59",
          go_to_task: "Ir a la tarea",

          status: {
            overdue: "Atrasada",
            due_today: "Vence hoy",
            due_tomorrow: "Vence mañana",
          },
        },
      },
      grades: {
        title: "Tus Calificaciones",

        retry: "Reintentar",

        errors: {
          title: "Error al cargar",
          server: "Error al conectar con el servidor.",
          load: "Error al cargar calificaciones.",
          unexpected: "Ocurrió un error inesperado.",
        },

        summary: {
          average: "Promedio general",
          approved: "Aprobadas",
          total: "Total corregidas",
        },

        empty: {
          title: "Sin calificaciones",
          description:
            "Todavía no tienes evaluaciones corregidas. Cuando los profesores califiquen tus tareas, aparecerán aquí.",
        },

        card: {
          classroom: "Aula",
          teacher: "Profesor",
          graded_at: "Corregido el",
          feedback: "Observación",
          view_detail: "Ver detalle",
        },

        modal: {
          close: "Cerrar modal",
          evaluation_detail: "Detalle de la evaluación",
          general_info: "Información general",

          classroom: "Aula",
          teacher: "Profesor",
          submitted: "Entregada",
          graded: "Corregida",

          final_grade: "Calificación Final",
          student_response: "Tu respuesta",
          no_student_comment: "No agregaste ningún comentario en la entrega.",

          submitted_file: "Archivo entregado",
          download: "Descargar",

          teacher_feedback: "Observación del profesor",
          no_teacher_feedback:
            "El profesor no dejó ninguna observación adicional.",
        },
      },
    },
  },
  en: {
    translation: {
      dashboard: {
        greeting: "Hello, {{name}} {{lastname}}!",
        welcome: "Welcome back to the Virtual Campus.",
        campus_virtual: "Virtual Campus",
        my_classrooms: "My Classrooms",
        empty_title: "You are not enrolled in any classroom",
        empty_desc:
          "When an administrator assigns you to a classroom, it will appear here.",
        classmates: "classmates",
        materials: "materials",
        enrolled: "Enrolled",
        enter_classroom: "Enter classroom",
      },
      classroom: {
        back: "Back to my classrooms",
        loading: "Loading classroom...",
        loading_wait: "Please wait a few seconds.",
        teacher_prefix: "Prof.",
        select_section: "Select section",
        tabs: {
          materials: "Materials",
          tasks: "Tasks",
          announcements: "Announcements",
          events: "Important dates",
          questions: "Questions",
        },
      },
      materials: {
        loading_title: "Loading materials...",
        loading_subtitle: "Please wait a moment.",
        search_placeholder:
          "Search material by title, description, or teacher...",
        material_type: "Material Type",
        title: "Materials",
        found_one: "{{count}} material found",
        found_other: "{{count}} materials found",
        no_materials_title: "No materials found",
        no_materials_desc: "Try changing the filters or search term.",
        clear_filters: "Clear filters",
        default_creator: "Institute",
        subcategories: {
          all: "All",
          book: "Books",
          document: "Documents",
          video: "Videos",
          image: "Images",
          audio: "Audios",
          presentation: "Presentations",
          exercise: "Exercises",
          guide: "Guides",
          quiz: "Quizzes",
          text: "Texts",
        },
        subcategory_labels: {
          book: "Book",
          document: "Document",
          video: "Video",
          image: "Image",
          audio: "Audio",
          presentation: "Presentation",
          exercise: "Exercise",
          guide: "Guide",
          quiz: "Quiz",
          text: "Text",
        },
        academic_categories: {
          all: "All",
          grammar: "Grammar",
          vocabulary: "Vocabulary",
          reading: "Reading",
          listening: "Listening",
          speaking: "Speaking",
          writing: "Writing",
          homework: "Homework",
          exam: "Exam",
        },
      },
      tasks: {
        loading: "Loading tasks...",
        loading_wait: "Please wait a few seconds.",
        empty: "No tasks published.",

        status: {
          graded: "Graded",
          submitted: "Submitted",
          overdue: "Overdue",
          pending: "Pending",
        },

        actions: {
          submit: "Submit",
          view_submission: "View my submission",
          view_feedback: "View feedback",
        },

        metadata: {
          due_date: "Due date",
          due_time: "Due time",
          max_score: "Max. score",
          points: "pts",
          mode: "Submission mode",
        },

        submission_type: {
          pool: "Group / Pool",
          individual: "Individual",
        },

        instructions: "Instructions",

        grade: {
          assigned: "Grade assigned",
        },

        submission: {
          in_review:
            "Your submission was successfully completed and is under review.",
        },
      },
      announcements: {
        loading_title: "Loading announcements...",
        loading_subtitle: "Please wait a few seconds.",
        empty_title: "No announcements",
        empty_description:
          "When the teacher publishes an announcement, it will appear here.",
        important: "Important",
        time_suffix: "",
      },
      events: {
        loading_title: "Loading important dates...",
        loading_subtitle: "Please wait a few seconds.",
        empty_title: "No important dates",
        empty_description: "The teacher has not added any important dates yet.",
        types: {
          clase: "Class",
          examen: "Exam",
          evento: "Event",
          reunion: "Meeting",
        },
      },
      questions: {
        title: "General Questions",

        description:
          "Ask the teacher questions and participate in the discussion.",

        new_question: "New question",

        loading_title: "Loading questions...",
        loading_wait: "Please wait a few seconds.",

        empty_title: "There are no questions yet",

        empty_description:
          "Be the first to ask a question to the teacher or your classmates.",

        reply_one: "reply",
        reply_other: "replies",

        thread: {
          loading_title: "Loading conversation",
          loading_description: "Getting details and replies...",

          load_error_title: "Loading error",

          load_error: "Could not retrieve the question.",

          conversation_error:
            "An error occurred while loading the conversation.",

          reload_error: "Error updating replies.",

          question_not_found:
            "The requested question was not found or has been deleted.",

          retry: "Retry",
          close: "Close",
          close_modal: "Close modal",

          back: "Back to questions",
          back_short: "Back",

          title: "Question Thread",

          question_badge: "Question",

          reply_one: "Reply",
          reply_other: "Replies",

          no_replies_title: "There are no replies yet",

          no_replies_description:
            "Be the first to reply to this question or wait for the teacher's response.",

          teacher: "Teacher",
          student: "Student",
        },
        create: {
          title: "New question",
          subtitle: "Write your question so the teacher can answer it.",
          close: "Close modal",

          title_label: "Question title",
          title_placeholder:
            "E.g.: Question about the Present Perfect exercise",

          content_label: "Question details",
          content_placeholder: "Explain your question clearly...",

          cancel: "Cancel",
          publishing: "Publishing...",
          publish: "Post question",

          error_publish: "Error posting the question.",
          error_alert: "The question could not be posted.",
        },
      },
      sidebar: {
        menu: {
          my_classrooms: "My Classrooms",
          tasks: "Tasks",
          grades: "Grades",
          calendar: "Calendar",
          chat: "Chat",
          profile: "My Profile",
        },

        open_menu: "Open menu",
        close_menu: "Close menu",

        campus_virtual: "Virtual Campus",
        institute: "I.N.K. English Institute",
      },
      submission_detail: {
        title: "My Submission",
        close_window: "Close window",

        submitted_success: "Submission successfully recorded",
        submitted_at: "Submitted on {{date}}",

        grade: {
          title: "Grade",
          evaluated: "Grade evaluated by the teacher.",
          pending: "Pending review",
          pending_description:
            "The teacher has not assigned a score to this submission yet.",
        },

        feedback: {
          title: "Feedback",
          empty: "No teacher comments at the moment.",
        },

        student_comment: {
          title: "Your answer or comment",
        },

        attachment: {
          title: "Attached file",
          default_name: "Attached document",
          open_download: "Click to open or download",
        },

        close: "Close",
      },
      tasks2: {
        pending: {
          title: "Pending Tasks",
          count_label: "{{count}}",
          description: "Submit on time to keep your grades up.",

          search_placeholder: "Search task or subject...",
          refresh: "Refresh tasks",

          error_title: "Error loading tasks",
          error_fallback: "An unexpected error occurred.",
          retry: "Retry",

          no_tasks: "No tasks found",
          no_tasks_description: 'No task matches the term "{{search}}".',
          clear_search: "Clear search",

          empty_title: "No pending tasks!",
          empty_description:
            "You've already submitted all available activities or you haven't been assigned any new ones yet. Great job!",

          teacher: "Teacher",
          due_date: "Due date",
          due_time: "Due time",
          no_due_date: "No date",
          default_due_time: "23:59",
          go_to_task: "Go to task",

          status: {
            overdue: "Overdue",
            due_today: "Due today",
            due_tomorrow: "Due tomorrow",
          },
        },
      },
      grades: {
        title: "Your Grades",

        retry: "Retry",

        errors: {
          title: "Loading error",
          server: "Error connecting to the server.",
          load: "Error loading grades.",
          unexpected: "An unexpected error occurred.",
        },

        summary: {
          average: "Overall average",
          approved: "Passed",
          total: "Total graded",
        },

        empty: {
          title: "No grades yet",
          description:
            "You do not have any graded assessments yet. When your teachers grade your assignments, they will appear here.",
        },

        card: {
          classroom: "Classroom",
          teacher: "Teacher",
          graded_at: "Graded on",
          feedback: "Feedback",
          view_detail: "View details",
        },

        modal: {
          close: "Close modal",
          evaluation_detail: "Assessment details",
          general_info: "General information",

          classroom: "Classroom",
          teacher: "Teacher",
          submitted: "Submitted",
          graded: "Graded",

          final_grade: "Final Grade",
          student_response: "Your response",
          no_student_comment:
            "You did not add any comments to your submission.",

          submitted_file: "Submitted file",
          download: "Download",

          teacher_feedback: "Teacher feedback",
          no_teacher_feedback:
            "The teacher did not leave any additional feedback.",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma por defecto
  fallbackLng: "en", // Idioma de respaldo
  interpolation: {
    escapeValue: false, // React protege contra XSS de forma nativa
  },
});

export default i18n;
